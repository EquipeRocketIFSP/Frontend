import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import Components from "../../components/Components";
import Layout from "../Layout";

import fullbanner from "./../../fullbanner.jpg";

import "./home.scss";
import { Link } from "react-router-dom";

class Home extends React.Component {
    render(): React.ReactNode {
        return (
            <Layout>
                <main id="home">
                    <Components.Fullbanner src={fullbanner} alt="Fullbanner">
                        <h1 style={{ textAlign: "center" }}>Gerencie sua clínica veterinária</h1>
                        <p>
                            Gerencie suas consultas, procedimentos veterinários e medicamentos controlados.<br />
                            Gere prontuários e documentos assinados digitalmente.<br />
                            Crie sua conta e traga o seu certificado digital.
                        </p>

                        <Link to="/cadastro-inicial" className="btn btn-primary" style={{ width: "220px" }}>Crie sua Conta</Link>
                    </Components.Fullbanner>

                    <Container>

                        <section className="features">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Assinatura Digital</Card.Title>
                                    <Card.Text>
                                        O CertVet assina os documentos com uma assinatura digital de forma que
                                        permita a fiscalização e rastreabilidade das alterações feitas.
                                        Traga seu certificado digital.
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Body>
                                    <Card.Title>Gerenciamento de Consultas</Card.Title>
                                    <Card.Text>
                                        O CertVet faz o gerenciamento de consultas, exames e cirugias de seus pacientes.
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Body>
                                    <Card.Title>Mapeamento Genealógico</Card.Title>
                                    <Card.Text>
                                        O CertVet auxilia no mapeamento de consultas dos parentes de seus pacinetes.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </section>

                    </Container>
                </main>
            </Layout>
        );
    }
}

export default Home;