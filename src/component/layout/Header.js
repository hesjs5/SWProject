import {Container, Nav, Navbar} from "react-bootstrap";
import {useContext} from "react";
import {LoginContext} from "../../App";

export default function Header() {

    const contextValue = useContext(LoginContext);

    const LoginComponent = () => {
        if (contextValue.isLoggedIn) {
            return (
                <Nav>
                    <Nav.Link href="/myPage">My page</Nav.Link>
                    <Nav.Link href="/signout">Sign out</Nav.Link>
                </Nav>
            );
        }

        return (
            <Nav>
                <Nav.Link href="/signup">Sign up</Nav.Link>
                <Nav.Link href="/login">Log in</Nav.Link>
            </Nav>
        );
    }

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