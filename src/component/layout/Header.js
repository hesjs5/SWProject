import { Container, Nav, Navbar } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { customAuthAxios } from "../../common/CustomAxiosUtils";
import { myLogin, myLogout } from "../../modules/actions";
import axios from "axios";
import { baseURL } from "../../common/Constant";

export default function Header() {
  const isLoggedInState = useSelector((state) => state.isLoggedIn);
  const roleState = useSelector((state) => state.role);
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken !== null && accessToken.length > 0) {
      customAuthAxios
        .post(
          `/reissue`,
          {},
          {
            headers: {
              "Refresh-Token": localStorage.getItem("refreshToken"),
            },
          },
        )
        .then((response) => {
          if (response.status !== 211) {
            localStorage.setItem(
              "accessToken",
              "Bearer ".concat(response.data.accessToken),
            );
            localStorage.setItem("refreshToken", response.data.refreshToken);
          }
          return response.data;
        })
        .then(async (res) => {
          await axios
            .get(`${baseURL}/token`, {
              headers: {
                Authorization: localStorage.getItem("accessToken"),
              },
            })
            .then((response) => response.data)
            .then((data) => {
              setLogin(data.memberID, data.role);
            })
            .catch((error) => {
              console.log("token response error = ", error);
              alert(error.response.data.message);
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              dispatch(myLogout());
              navigate("/boards");
            });
        })
        .catch((error) => {
          console.log("reissue response error = ", error);
          alert(error.response.data.message);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(myLogout());
          navigate("/boards");
        });
    }
  }, []); // 처음 한번만 실행 됨

  const setLogin = (memberID, role) => {
    dispatch(
      myLogin({
        isLoggedIn: true,
        memberID: memberID,
        role: role,
      }),
    );
  };

  const navigate = useNavigate();
  const setLogout = async () => {
    await axios
      .post(
        `${baseURL}/user/logout`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("logout 200 status");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(myLogout());
          navigate("/boards");
        }
        return response.data;
      })
      .catch((error) => {
        console.log("setLogout response error = ", error);
      });
  };

  const isNotLoggedIn = () => {
    return !isLoggedInState;
  };

  const notLoggedInComponent = () => {
    return (
      <Nav>
        <Nav.Link as={Link} to="/signup">
          Sign up
        </Nav.Link>
        <Nav.Link as={Link} to="/login">
          Log in
        </Nav.Link>
      </Nav>
    );
  };

  const isAdmin = () => {
    return roleState === "ADMIN";
  };

  const adminComponent = () => {
    return (
      <Nav>
        <Nav.Link disabled>Admin</Nav.Link>
        <Nav.Link onClick={setLogout}>Sign out</Nav.Link>
      </Nav>
    );
  };

  const loggedInComponent = () => {
    return (
      <Nav>
        <Nav.Link disabled>User</Nav.Link>
        <Nav.Link onClick={setLogout}>Sign out</Nav.Link>
      </Nav>
    );
  };

  const LoginComponent = () => {
    if (isNotLoggedIn()) {
      return notLoggedInComponent();
    }

    if (isAdmin()) {
      return adminComponent();
    }

    return loggedInComponent();
  };

  return (
    <div className="pb-5">
      <Navbar bg="dark" data-bs-theme="dark" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/boards">
            <img
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <LoginComponent />
        </Container>
      </Navbar>
    </div>
  );
}
