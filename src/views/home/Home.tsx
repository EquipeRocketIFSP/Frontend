import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import Components from "../../components/Components";
import Layout from "../Layout";

import fullbanner from "./../../fullbanner.jpg";

import "./home.scss";

class Home extends React.Component {
    render(): React.ReactNode {
        return (
            <Layout>
                <main id="home">
                    <Components.Fullbanner src={fullbanner} alt="Fullbanner">
                        <h2 style={{ textAlign: "center" }}>What is Lorem Ipsum?</h2>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>

                        <Button>Criar Conta</Button>
                    </Components.Fullbanner>

                    <Container>

                        <section className="features">
                            <Card>
                                <Card.Body>
                                    <Card.Title>What is Lorem Ipsum?</Card.Title>
                                    <Card.Text>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Body>
                                    <Card.Title>What is Lorem Ipsum?</Card.Title>
                                    <Card.Text>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Body>
                                    <Card.Title>What is Lorem Ipsum?</Card.Title>
                                    <Card.Text>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
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