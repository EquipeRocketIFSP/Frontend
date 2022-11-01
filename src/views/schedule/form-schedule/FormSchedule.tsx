import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/esm/Alert";
import { Link, Navigate } from "react-router-dom";

import Components from "../../../components/Components";
import Contracts from "../../../contracts/Contracts";
import Helpers from "../../../helpers/Helpers";
import Container from "react-bootstrap/Container";
import Layouts from "../../../layouts/Layouts";

class FormSchedule extends React.Component {
    private layoutFormContext = Layouts.RestrictedFormLayout.createLayoutFormContext();

    render(): React.ReactNode {
        return (
            <Layouts.RestrictedFormLayout id="funcionario-formulario" style={{ marginBottom: "20px" }} layoutFormContext={this.layoutFormContext} >
                <Container>

                    <Components.Breadcrumbs>
                        <li className="breadcrumb-item">
                            <Link to="/painel">Painel</Link>
                        </li>

                        <li className="breadcrumb-item">
                            <Link to="/painel/agenda">Agenda</Link>
                        </li>

                        <li className="breadcrumb-item active">Agendamento</li>
                    </Components.Breadcrumbs>

                    <h1>Agendamento</h1>

                    <Form onSubmit={this.onSubmit}>
                        <fieldset>
                            <Row>
                                <Form.Group className="mb-3 col-lg-10">
                                    <Form.Label htmlFor="animal">Animal*</Form.Label>
                                    <Form.Select name="animal" id="animal" required>
                                        <option value="">Selecione</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-2 d-flex align-items-end justify-content-evenly">
                                    <Button variant="outline-primary"><i className="fa-solid fa-eye"></i></Button>
                                    <Button variant="outline-primary"><i className="fa-solid fa-plus"></i></Button>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="data-consulta">Data da consulta*</Form.Label>
                                    <Form.Control type="datetime-local" name="data-consulta" id="data-consulta" required />
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="tipo-consulta">Tipo da consulta*</Form.Label>
                                    <Form.Select name="tipo-consulta" id="tipo-consulta" required>
                                        <option value="">Selecione</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                        </fieldset>

                        <div className="d-flex justify-content-between">
                            <Link className="btn btn-outline-secondary" to="/painel/agenda">Voltar</Link>
                            <Button variant="success" type="submit">Agendar</Button>
                        </div>
                    </Form>

                </Container>
            </Layouts.RestrictedFormLayout>
        );
    }

    private onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        /* this.layoutFormContext.state({ formState: "sent", redirect: null });

        setInterval(() => {
            this.layoutFormContext.state({ formState: "idle", redirect: "/painel/agenda" });
        }, 3000); */

        /* const {setFormData, setRegistrationStage} = this.props;

                    setFormData(new FormData(evt.currentTarget));
                    setRegistrationStage("send"); */
    }
}

export default FormSchedule;