import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/esm/Alert";
import {Link, Navigate} from "react-router-dom";

import Components from "../../../components/Components";
import Contracts from "../../../contracts/Contracts";
import Helpers from "../../../helpers/Helpers";
import Layouts from "../../../layouts/Layouts";
import Axios from "axios";
import Storages from "../../../Storages";
import env from "../../../env";

interface State {
    animais: Contracts.ListingData[],
    tutores: Contracts.ListingData[],
}

class FormAgendamento extends React.Component <any, State> {
    private layoutFormContext: Layouts.LayoutFormContext;
    private readonly breadcrumbs: Contracts.Breadcrumbs[];

    constructor(props: any) {
        super(props);

        this.state = {
            tutores: [],
            animais: []
        };

        this.layoutFormContext = Layouts.RestrictedFormLayout.createLayoutFormContext();
        this.breadcrumbs = [
            {name: "Painel", pathname: "/painel"},
            {name: "Agenda", pathname: "/painel/agenda"},
            {name: "Agendamento", pathname: ""}
        ];
    }

    render(): React.ReactNode {
        const {tutores, animais} = this.state;

        return (
            <Layouts.RestrictedFormLayout
                id="funcionario-formulario"
                style={{marginBottom: "20px"}}
                layoutFormContext={this.layoutFormContext}
                breadcrumbs={this.breadcrumbs}
                title="Agendamento"
                apiResource="agendamento"
                redirectResource="/painel/agenda"
            >
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
                            {/*<Button variant="outline-primary"><i className="fa-solid fa-eye"></i></Button>*/}

                            <Link className="btn btn-outline-primary" to="/painel/animais/adicionar"
                                  onClick={() => Storages.referrerStorage.set(window.location.pathname)}>
                                <i className="fa-solid fa-plus"></i>
                            </Link>
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
}

export default FormAgendamento;