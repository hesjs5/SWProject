import { Container, Nav, Navbar } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { customAuthAxios } from "../../common/CustomAxiosUtils";
import { myLogin, myLogout } from "../../modules/actions";

export default function Header() {
  const isLoggedInState = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null && token.length > 0) {
      customAuthAxios
        .get(`/token`)
        .then((response) => response.data)
        .then((data) => {
          console.log("response data = ", data);
          if (data.validate === false) {
            setLogout();
            return;
          }

          setLogin(data.memberID, data.role);
        })
        .catch((error) => {
          console.log(error);
          setLogout();
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
  const setLogout = () => {
    localStorage.removeItem("token");
    dispatch(myLogout());
    navigate("/boards");
  };

  const LoginComponent = () => {
    if (isLoggedInState) {
      return (
        <Nav>
          <Nav.Link as={Link} to="/myPage">
            My page
          </Nav.Link>
          <Nav.Link onClick={setLogout}>Sign out</Nav.Link>
        </Nav>
      );
    }

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

  return (
    <div className="pb-5">
      <Navbar bg="dark" data-bs-theme="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#home">
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
