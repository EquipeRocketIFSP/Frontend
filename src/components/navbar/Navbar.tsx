import React from "react";
import Container from "react-bootstrap/Container";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Storages from "./../../Storages";
import { Link, Navigate } from "react-router-dom";
import Contracts from "../../contracts/Contracts";

interface Props {
    showLoginModal: () => void,
}

interface State extends Contracts.Redirect { }

class Navbar extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);

        this.state = {
            redirect: null
        };
    }

    render(): React.ReactNode {
        const { showLoginModal } = this.props;
        const userData = Storages.userStorage.get();

        if (this.state.redirect)
            return <Navigate to={this.state.redirect} />;

        return (
            <BootstrapNavbar collapseOnSelect expand="lg" className="bg-light shadow sticky-top">
                <Container>
                    
                    {
                        userData ?
                            <Link className="navbar-brand" to="/painel">CertVet</Link> :
                            <Link className="navbar-brand" to="/">CertVet</Link>
                    }

                    <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />

                    <BootstrapNavbar.Collapse>

                        {
                            userData ?
                                (
                                    <Nav>
                                        <Link to="/painel/funcionarios" className="nav-link">Funcionarios</Link>
                                    </Nav>
                                ) : <></>
                        }

                    </BootstrapNavbar.Collapse>

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
        this.setState({ redirect: "/" });
    }
}

export default Navbar;