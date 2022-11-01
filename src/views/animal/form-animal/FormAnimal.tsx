import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import Components from "../../../components/Components";
import Contracts from "../../../contracts/Contracts";
import Helpers from "../../../helpers/Helpers";
import Container from "react-bootstrap/Container";
import Layouts from "../../../layouts/Layouts";

class FormAnimal extends React.Component {
    private layoutFormContext: Layouts.LayoutFormContext;

    constructor(props: any) {
        super(props);

        this.layoutFormContext = Layouts.RestrictedFormLayout.createLayoutFormContext();
    }

    render(): React.ReactNode {
        return (
            <Layouts.RestrictedFormLayout id="animal-formulario" style={{ marginBottom: "20px" }} layoutFormContext={this.layoutFormContext} >
                <Container>

                    <Components.Breadcrumbs>
                        <li className="breadcrumb-item">
                            <Link to="/painel">Painel</Link>
                        </li>

                        <li className="breadcrumb-item">
                            <Link to="/painel/animais">Animais</Link>
                        </li>

                        <li className="breadcrumb-item active">Animal</li>
                    </Components.Breadcrumbs>

                    <h1>Animal</h1>

                    <Form onSubmit={this.onSubmit}>
                        <fieldset>
                            <legend>Dados do animal</legend>

                            <Row>
                                <Form.Group className="mb-3 col-lg-9">
                                    <Form.Label htmlFor="nome">Nome*</Form.Label>
                                    <Form.Control type="text" name="nome" id="nome" required />
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-1">
                                    <Form.Label htmlFor="idade">Idade*</Form.Label>
                                    <Form.Control type="text" name="idade" id="idade"
                                        onInput={(evt) => evt.currentTarget.value = Helpers.Masks.number(evt.currentTarget.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-2">
                                    <Form.Label htmlFor="sexo">Sexo*</Form.Label>
                                    <Form.Select name="sexo" id="sexo" required>
                                        <option value="">Selecione</option>
                                        <option value="Macho">Macho</option>
                                        <option value="Fêmea">Fêmea</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group className="mb-3 col-lg-4">
                                    <Form.Label htmlFor="raca">Raça*</Form.Label>
                                    <Form.Control type="text" name="raca" id="raca" required />
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-4">
                                    <Form.Label htmlFor="especie">Espécie*</Form.Label>
                                    <Form.Control type="text" name="especie" id="especie" required />
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-4">
                                    <Form.Label htmlFor="pelagem">Pelagem*</Form.Label>
                                    <Form.Control type="text" name="pelagem" id="pelagem" required />
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group className="mb-3 col-lg-12">
                                    <Form.Label htmlFor="tutor">Tutor*</Form.Label>
                                    <Form.Select name="tutor" id="tutor" required>
                                        <option value="">Selecione</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                        </fieldset>

                        <fieldset>
                            <legend>Parentes</legend>

                            <Row>
                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="pai">Pai</Form.Label>
                                    <Form.Control type="text" name="pai" id="pai" readOnly />
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="mae">Mãe</Form.Label>
                                    <Form.Control type="text" name="mae" id="mae" readOnly />
                                </Form.Group>
                            </Row>
                        </fieldset>

                        <div className="d-flex justify-content-between">
                            <Link className="btn btn-outline-secondary" to="/painel/tutores">Voltar</Link>
                            <Button variant="success" type="submit">Cadastrar</Button>
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
            this.layoutFormContext.state({ formState: "idle", redirect: "/painel/animais" });
        }, 3000); */

        /* const {setFormData, setRegistrationStage} = this.props;

                    setFormData(new FormData(evt.currentTarget));
                    setRegistrationStage("send"); */
    }
}

export default FormAnimal;