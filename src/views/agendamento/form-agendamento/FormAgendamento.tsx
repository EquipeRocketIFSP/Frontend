import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/esm/Alert";
import {Link, Navigate} from "react-router-dom";

import Components from "../../../components/Components";
import Contracts from "../../../contracts/Contracts";
import Helpers from "../../../helpers/Helpers";
import Container from "react-bootstrap/Container";
import Layouts from "../../../layouts/Layouts";
import Axios, {AxiosError} from "axios";
import Storages from "../../../Storages";
import env from "../../../env";

interface State {
    animais: Contracts.ListingData[],
    tutores: Contracts.ListingData[],
}

class FormAgendamento extends React.Component <any, State> {
    private layoutFormContext: Layouts.LayoutFormContext;

    constructor(props: any) {
        super(props);

        this.state = {
            tutores: [],
            animais: []
        };

        this.layoutFormContext = Layouts.RestrictedFormLayout.createLayoutFormContext();
    }

    render(): React.ReactNode {
        const {tutores, animais} = this.state;

        return (
            <Layouts.RestrictedFormLayout id="funcionario-formulario" style={{marginBottom: "20px"}}
                                          layoutFormContext={this.layoutFormContext}>
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

                                        {animais.map(({id, nome}) => <option value={id}>{nome}</option>)}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-2 d-flex align-items-end justify-content-evenly">
                                    <Button variant="outline-primary"><i className="fa-solid fa-eye"></i></Button>
                                    <Button variant="outline-primary"><i className="fa-solid fa-plus"></i></Button>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="dataConsulta">Data da consulta*</Form.Label>
                                    <Form.Control type="datetime-local" name="dataConsulta" id="dataConsulta"
                                                  required/>
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="tipoConsulta">Tipo da consulta*</Form.Label>

                                    <Form.Control type="text" name="tipoConsulta" id="tipoConsulta" required/>
                                </Form.Group>
                            </Row>
                        </fieldset>

                        <input type="hidden" name="clinica" value="1"/>

                        <div className="d-flex justify-content-between">
                            <Link className="btn btn-outline-secondary" to="/painel/agenda">Voltar</Link>
                            <Button variant="success" type="submit">Agendar</Button>
                        </div>
                    </Form>

                </Container>
            </Layouts.RestrictedFormLayout>
        );
    }

    componentDidMount() {
        this.carregarAnimais();
    }

    private carregarAnimais = async () => {
        try {
            const {data} = await Axios.get<Contracts.ListingData[]>(`${env.API}/animal`, {
                headers: {"Authorization": `Bearer ${Storages.userStorage.get()?.token}`}
            });

            this.setState({animais: data});
        } catch (error) {
            console.error(error);
        }
    }

    private carregarTutores = async () => {
        try {
            const {data} = await Axios.get<Contracts.ListingData[]>(`${env.API}/tutor`, {
                headers: {"Authorization": `Bearer ${Storages.userStorage.get()?.token}`}
            });

            console.log(data);

            this.setState({tutores: data});
        } catch (error) {
            console.error(error);
        }
    }

    private onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        let data: Contracts.DynamicObject<string> = {};

        new FormData(evt.currentTarget).forEach((value, key) => data[key] = value.toString());

        try {
            await Axios.post(`${env.API}/agendamento`, data, {
                headers: {"Authorization": `Bearer ${Storages.userStorage.get()?.token}`}
            });

            this.layoutFormContext.state({formState: "sent", redirect: null, errorMessage: null});

            setInterval(() => {
                this.layoutFormContext.state({formState: "idle", redirect: "/painel/agenda", errorMessage: null});
            }, 2000);
        } catch (error) {
            const status = (error as AxiosError).response?.status;

            switch (status) {
                case 401:
                    this.layoutFormContext.state({
                        formState: "error",
                        redirect: null,
                        errorMessage: "Usuário não autenticado."
                    });
                    break;

                default:
                    this.layoutFormContext.state({
                        formState: "error",
                        redirect: null,
                        errorMessage: "Não foi possivel realizar esse agendamento. Por favor tente mais tarde."
                    });
                    break;
            }
        }
    }
}

export default FormAgendamento;