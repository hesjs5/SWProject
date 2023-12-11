import { Container, Nav, Navbar } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myLogin, myLogout } from "../../App";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const isLoggedInState = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null && token.length > 0) {
      axios
        .get("http://localhost:8080/token", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log("response = ", response);
          if (response.data.validate === true) {
            setLogin(token, response.data.username);
          }
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    }
  }, []); // 처음 한번만 실행 됨

  const setLogin = (token, memberName) => {
    dispatch(
      myLogin({
        token: token,
        isLoggedIn: true,
        memberName: memberName,
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
          <Nav.Link href="/myPage">My page</Nav.Link>
          <Nav.Link onClick={setLogout}>Sign out</Nav.Link>
        </Nav>
      );
    }

    return (
      <Nav>
        <Nav.Link href="/signup">Sign up</Nav.Link>
        <Nav.Link href="/login">Log in</Nav.Link>
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
