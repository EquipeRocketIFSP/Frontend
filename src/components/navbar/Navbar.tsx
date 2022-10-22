import React from "react";
import Container from "react-bootstrap/Container";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

import Storages from "./../../Storages";
import { Link } from "react-router-dom";

interface Props {
    showLoginModal: () => void,
}

class Navbar extends React.Component<Props>{
    render(): React.ReactNode {
        const { showLoginModal } = this.props;
        const userData = Storages.userStorage.get();

        return (
            <BootstrapNavbar collapseOnSelect expand="lg" className="bg-light shadow sticky-top">
                <Container>
                    <BootstrapNavbar.Brand href="/">CertVet</BootstrapNavbar.Brand>
                    <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
                    <BootstrapNavbar.Collapse className="justify-content-end">

                        {
                            userData ?
                                (
                                    <Nav>
                                        <Nav.Link onClick={this.logout}>Sair</Nav.Link>
                                    </Nav>
                                ) :
                                (
                                    <Nav>
                                        <Nav.Link onClick={showLoginModal}>Acessar Conta</Nav.Link>
                                        <Link to="/cadastro-inicial" className="btn btn-primary">Criar Conta</Link>
                                    </Nav>
                                )
                        }

                    </BootstrapNavbar.Collapse>
                </Container>
            </BootstrapNavbar>
        );
    }

    private logout = (): void => {
        Storages.userStorage.truncate();
        window.location.assign("/");
    }
}

export default Navbar;