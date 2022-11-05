import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import Axios, {AxiosError} from "axios";

import Components from "../../../components/Components";
import Contracts from "../../../contracts/Contracts";
import Helpers from "../../../helpers/Helpers";
import Container from "react-bootstrap/Container";
import Layouts from "../../../layouts/Layouts";
import env from "../../../env";
import Storages from "../../../Storages";

class FormMedicalRecordVets extends React.Component<any> {
    private readonly layoutFormContext: Layouts.LayoutFormContext;

    constructor(props: any) {
        super(props);

        this.layoutFormContext = Layouts.RestrictedFormLayout.createLayoutFormContext();
    }

    render(): React.ReactNode {
        return (
            <Layouts.RestrictedFormLayout id="prontuario-formulario" style={{marginBottom: "20px"}}
                                          layoutFormContext={this.layoutFormContext}>
                <Container>

                    <Components.Breadcrumbs>
                        <li className="breadcrumb-item">
                            <Link to="/painel">Painel</Link>
                        </li>

                        <li className="breadcrumb-item">
                            <Link to="/painel/prontuarios">Prontuários</Link>
                        </li>

                        <li className="breadcrumb-item active">Prontuário</li>
                    </Components.Breadcrumbs>

                    <h1>Prontuário</h1>

                    <Form onSubmit={this.onSubmit}>
                        <fieldset>
                            <Row>
                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="veterinario">Veterinário*</Form.Label>

                                    <Form.Select name="veterinario" id="veterinario" aria-readonly={true} required>
                                        <option value="">Selecione</option>

                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="animal">Animal*</Form.Label>

                                    <Form.Select name="animal" id="animal" required>
                                        <option value="">Selecione</option>

                                    </Form.Select>
                                </Form.Group>
                            </Row>
                        </fieldset>

                        <fieldset>
                            <Row>
                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="medicamento">Medicamento</Form.Label>
                                    <Form.Control type="text" name="medicamento" id="medicamento"/>
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-3">
                                    <Form.Label htmlFor="quantidade">Quantidade</Form.Label>
                                    <Form.Control type="tel" name="quantidade" id="quantidade"
                                                  onInput={(evt) => evt.currentTarget.value = Helpers.Masks.number(evt.currentTarget.value)}/>
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-3">
                                    <Form.Label htmlFor="unidade">Unidade</Form.Label>
                                    <Form.Control type="text" name="unidade" id="unidade"/>
                                </Form.Group>
                            </Row>
                        </fieldset>

                        <fieldset>
                            <Row>
                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="tipo-cirugia">Tipo de cirurgia</Form.Label>
                                    <Form.Control type="text" name="tipo-cirugia" />
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="categoria-paciente">Categoria de paciente</Form.Label>
                                    <Form.Control type="text" name="categoria-paciente" />
                                </Form.Group>
                            </Row>
                        </fieldset>

                        <fieldset>
                            <Row>
                                <Form.Group className="mb-3 col-lg-12">
                                    <Form.Label htmlFor="exame">Exame</Form.Label>
                                    <Form.Control as="textarea" name="exame" />
                                </Form.Group>
                            </Row>
                        </fieldset>

                        <fieldset>
                            <Row>
                                <Form.Group className="mb-3 col-lg-12">
                                    <Form.Label htmlFor="procedimentos">Procedimentos</Form.Label>
                                    <Form.Control as="textarea" name="procedimentos" />
                                </Form.Group>
                            </Row>
                        </fieldset>

                        <div className="d-flex justify-content-between">
                            <Link className="btn btn-outline-secondary" to="/painel/funcionarios">Voltar</Link>
                            <Button variant="success" type="submit">Cadastrar</Button>
                        </div>
                    </Form>

                </Container>
            </Layouts.RestrictedFormLayout>
        );
    }

    componentDidMount(): void {
        this.loadUfs();
    }

    private loadUfs = async () => {
        this.setState({ufs: await Helpers.Address.loadUfs()});
    }

    private onInputCep = async (evt: React.FormEvent<HTMLInputElement>) => {
        evt.currentTarget.value = Helpers.Masks.cep(evt.currentTarget.value);

        if (evt.currentTarget.value.replace(/\D/gmi, "").length == 8)
            this.setState({address: await Helpers.Address.loadAddress(evt.currentTarget.value)});
    }

    private onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        let data: Contracts.DynamicObject<string> = {};

        new FormData(evt.currentTarget).forEach((value, key) => data[key] = value.toString());

        try {
            console.log(data);

            /*await Axios.post(`${env.API}/cadastro-funcionario`, data, {
                headers: {"Authorization": `Bearer ${Storages.userStorage.get()?.token}`}
            });*/

            this.layoutFormContext.state({formState: "sent", redirect: null, errorMessage: null});

            setInterval(() => {
                this.layoutFormContext.state({formState: "idle", redirect: "/painel/prontuarios", errorMessage: null});
            }, 3000);
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
                        errorMessage: "Não foi possivel cadastrar esse prontuário. Por favor tente mais tarde."
                    });
                    break;
            }
        }
    }
}

export default FormMedicalRecordVets;