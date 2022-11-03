import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Axios, { AxiosError } from "axios";

import Components from "../../../components/Components";
import Contracts from "../../../contracts/Contracts";
import Helpers from "../../../helpers/Helpers";
import Container from "react-bootstrap/Container";
import Layouts from "../../../layouts/Layouts";
import Storages from "../../../Storages";
import env from "../../../env";

interface State {
    tutors: Contracts.Tutor[]
}

class FormAnimal extends React.Component<any, State> {
    private layoutFormContext: Layouts.LayoutFormContext;

    constructor(props: any) {
        super(props);

        this.state = {
            tutors: []
        };

        this.layoutFormContext = Layouts.RestrictedFormLayout.createLayoutFormContext();
    }

    render(): React.ReactNode {
        const { tutors } = this.state;

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

                                        {tutors.map(({ nome }) => <option value="1">{nome}</option>)}
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

    componentDidMount(): void {
        this.loadTutors();
    }

    private loadTutors = async (): Promise<void> => {
        try {
            const { data: tutors } = await Axios.get(`${env.API}/cadastro-tutor`, { headers: { "Authorization": `Bearer ${Storages.userStorage.get()?.token}` } });

            this.setState({ tutors });
        } catch (error) {
            console.error(error);
        }
    }

    private onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        let data: Contracts.DynamicObject<string> = {};

        new FormData(evt.currentTarget).forEach((value, key) => data[key] = value.toString());

        try {
            await Axios.post(`${env.API}/cadastro-animal`, data, {
                headers: { "Authorization": `Bearer ${Storages.userStorage.get()?.token}` }
            });

            this.layoutFormContext.state({ formState: "sent", redirect: null, errorMessage: null });

            setInterval(() => {
                this.layoutFormContext.state({ formState: "idle", redirect: "/painel/animais", errorMessage: null });
            }, 3000);
        } catch (error) {
            const status = (error as AxiosError).response?.status;

            switch (status) {
                case 401:
                    this.layoutFormContext.state({ formState: "error", redirect: null, errorMessage: "Usuário não autenticado." });
                    break;

                default:
                    this.layoutFormContext.state({ formState: "error", redirect: null, errorMessage: "Não foi possivel cadastrar esse animal. Por favor tente mais tarde." });
                    break;
            }
        }
    }
}

export default FormAnimal;