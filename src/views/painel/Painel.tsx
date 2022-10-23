import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Link } from "react-router-dom";
import RestrictedLayout from "../RestrictedLayout";

import "./painel.scss";

class Painel extends React.Component {
    render(): React.ReactNode {
        return (
            <RestrictedLayout>
                <main id="painel">
                    <Container>
                        <h4>Acesso Rápido</h4>

                        <Row className="acesso-rapido">
                            <div className="col-lg-2 col-md-3 col-sm-3 col-6">
                                <Link to="/painel/funcionarios" className="shadow round d-flex flex-column align-items-center acesso-rapido-item">
                                    <i className="fa-solid fa-users"></i>
                                    Funcionarios
                                </Link>
                            </div>
                        </Row>
                    </Container>
                </main>
            </RestrictedLayout>
        );
    }
}

export default Painel;