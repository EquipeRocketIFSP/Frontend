import React from "react";
import Container from "react-bootstrap/Container";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

import "bootstrap/dist/css/bootstrap.min.css";

class Navbar extends React.Component {
    render(): React.ReactNode {
        return (
            <BootstrapNavbar collapseOnSelect expand="lg" className="shadow">
                <Container>
                    <BootstrapNavbar.Brand href="#home">React-Bootstrap</BootstrapNavbar.Brand>
                    <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
                    <BootstrapNavbar.Collapse className="justify-content-end">

                        <Nav>
                            <Nav.Link>Acessar Conta</Nav.Link>
                            <Button>Criar Conta</Button>
                        </Nav>

                    </BootstrapNavbar.Collapse>
                </Container>
            </BootstrapNavbar>
        );
    }
}

export default Navbar;