import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Link } from "react-router-dom";
import Layouts from "../../layouts/Layouts";

import "./painel.scss";

class Painel extends React.Component {
    render(): React.ReactNode {
        return (
            <Layouts.RestrictedLayout>
                <main id="painel">
                    <Container>
                        <h4>Acesso Rápido</h4>

                        <Row className="acesso-rapido">
                            <div className="col-lg-3 col-md-3 col-sm-3 col-6">
                                <Link to="/painel/funcionarios/adicionar" className="shadow round d-flex flex-column align-items-center acesso-rapido-item">
                                    <i className="fa-solid fa-user-plus"></i>
                                    Adicionar Funcionarios
                                </Link>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 col-6">
                                <Link to="/painel/agenda/adicionar" className="shadow round d-flex flex-column align-items-center acesso-rapido-item">
                                    <i className="fa-solid fa-calendar-plus"></i>
                                    Criar Agendamento
                                </Link>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-3 col-6">
                                <Link to="/painel/animais/adicionar" className="shadow round d-flex flex-column align-items-center acesso-rapido-item">
                                    <i className="fa-solid fa-dog"></i>
                                    Adicionar Animal
                                </Link>
                            </div>

                            {/*<div className="col-lg-3 col-md-3 col-sm-3 col-6">
                                <Link to="/painel/prontuarios/adicionar" className="shadow round d-flex flex-column align-items-center acesso-rapido-item">
                                    <i className="fa-regular fa-clipboard"></i>
                                    Criar Prontuário
                                </Link>
                            </div>*/}
                        </Row>
                    </Container>
                </main>
            </Layouts.RestrictedLayout>
        );
    }
}

export default Painel;