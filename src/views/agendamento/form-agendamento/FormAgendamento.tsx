import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/esm/Alert";
import {Link} from "react-router-dom";
import Axios from "axios";
import DatePicker from "react-datepicker";

import Contracts from "../../../contracts/Contracts";
import Layouts from "../../../layouts/Layouts";
import Storages from "../../../Storages";
import env from "../../../env";

import "react-datepicker/dist/react-datepicker.css";

interface State {
    animais: Contracts.ListingData[],
    datasConsultas: Date[],
    dataConsulta: Date,
}

class FormAgendamento extends React.Component <any, State> {
    private layoutFormContext: Layouts.LayoutFormContext;
    private readonly breadcrumbs: Contracts.Breadcrumbs[];

    constructor(props: any) {
        super(props);

        this.state = {
            animais: [],
            datasConsultas: [],
            dataConsulta: new Date()
        };

        this.layoutFormContext = Layouts.RestrictedFormLayout.createLayoutFormContext();
        this.breadcrumbs = [
            {name: "Painel", pathname: "/painel"},
            {name: "Agenda", pathname: "/painel/agenda"},
            {name: "Agendamento", pathname: ""}
        ];
    }

    render(): React.ReactNode {
        const {datasConsultas, animais, dataConsulta} = this.state;
        const hoje = new Date();

        return (
            <Layouts.RestrictedFormLayout
                id="funcionario-formulario"
                style={{marginBottom: "20px"}}
                layoutFormContext={this.layoutFormContext}
                breadcrumbs={this.breadcrumbs}
                title="Agendamento"
                apiResource="agendamento"
                redirectResource="/painel/agenda"
                beforeSubmit={this.beforeSubmit}
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

                    <Form.Group className="mb-3 col-lg-12">
                        <Form.Label htmlFor="tipoConsulta">Tipo da consulta*</Form.Label>

                        <Form.Control type="text" name="tipoConsulta" id="tipoConsulta" required/>
                    </Form.Group>

                    <Row>
                        <Form.Group className="mb-3 col-lg-12">
                            <Form.Label htmlFor="dataConsulta">Data da consulta*</Form.Label>

                            <Row>
                                <div className="mb-3 col-lg-6">
                                    <div className="d-flex justify-content-center">
                                        <DatePicker
                                            selected={dataConsulta}
                                            onChange={(dataConsulta) => this.setState({dataConsulta: dataConsulta ?? new Date()})}
                                            minDate={hoje}
                                            name="dataConsulta"
                                            id="dataConsulta"
                                            highlightDates={datasConsultas}
                                            showPopperArrow
                                            showTimeSelect
                                            inline
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-3 col-lg-6">
                                    <ul className="d-flex flex-column align-items-center" style={{padding: 0}}>
                                        <h5 style={{textAlign:"center"}}>Horas marcadas no dia {dataConsulta.toLocaleDateString()}</h5>

                                        {
                                            datasConsultas.map((data) => {
                                                if (dataConsulta.toLocaleDateString() != data.toLocaleDateString())
                                                    return <></>;

                                                return <li className="d-flex">{data.toLocaleTimeString()}</li>
                                            })
                                        }
                                    </ul>
                                </div>

                            </Row>
                        </Form.Group>
                    </Row>
                </fieldset>

                <input type="hidden" name="clinica" value="1"/>
            </Layouts.RestrictedFormLayout>
        );
    }

    componentDidMount() {
        this.carregarAnimais();
        this.carregarConsultasMarcadas();
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

    private carregarConsultasMarcadas = async () => {
        try {
            const {data} = await Axios.get<string[]>(`${env.API}/agendamento?consultas-marcadas=true`, {
                headers: {"Authorization": `Bearer ${Storages.userStorage.get()?.token}`}
            });

            this.setState({datasConsultas: data.map((string) => new Date(string))});
        } catch (error) {
            console.error(error);
        }
    }

    private beforeSubmit = (data: Contracts.DynamicObject<any>) => {
        const {dataConsulta} = {...this.state};
        dataConsulta.setHours(dataConsulta.getHours() - 3);

        data["dataConsulta"] = dataConsulta.toJSON();
    }
}

export default FormAgendamento;