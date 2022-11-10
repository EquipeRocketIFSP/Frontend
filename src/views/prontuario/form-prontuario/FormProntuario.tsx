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

interface State {
    tutores: Contracts.ListingData[],
    animais: Contracts.ListingData[],
    veterinarios: Contracts.ListingData[]
}

interface PostData {
    "veterinario": "1",
    "animal": "1",
    "tutor": "1",
    "prescricoes": [{ "medicacao": "string" }],
    "medicamentos": [{
        "nomeMedicamento": {
            "quantidade": 1,
            "medida": "ml"
        }
    }],
    "dataAtendimento": "2022-11-08T01:00:02.826638901",
    "tipo-cirurgia": "CASTRACAO",
    "asa": "ASA1",
    "diagnostico": "string",
    "observacoes": "string",
    "categoria-paciente": "",
    "procedimentos": [{
        "tipoProcedimento": "IMUNIZACAO",
        "tipo": "PRESCRITIVO",
        "descricao": "string"
    }]
}

class FormProntuario extends React.Component<any, State> {
    private readonly layoutFormContext: Layouts.LayoutFormContext;

    constructor(props: any) {
        super(props);

        this.state = {
            tutores: [],
            animais: [],
            veterinarios: []
        };

        this.layoutFormContext = Layouts.RestrictedFormLayout.createLayoutFormContext();
    }

    render(): React.ReactNode {
        const {tutores, animais, veterinarios} = this.state;

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
                                <Form.Group className="mb-3 col-lg-4">
                                    <Form.Label htmlFor="veterinario">Veterinário*</Form.Label>

                                    <Form.Select name="veterinario" id="veterinario" aria-readonly={true} required>
                                        <option value="">Selecione</option>

                                        {veterinarios.map(({id, nome}) => <option value={id}>{nome}</option>)}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-4">
                                    <Form.Label htmlFor="animal">Animal*</Form.Label>

                                    <Form.Select name="animal" id="animal" required>
                                        <option value="">Selecione</option>

                                        {animais.map(({id, nome}) => <option value={id}>{nome}</option>)}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-4">
                                    <Form.Label htmlFor="tutor">Tutor*</Form.Label>

                                    <Form.Select name="tutor" id="tutor" required>
                                        <option value="">Selecione</option>

                                        {tutores.map(({id, nome}) => <option value={id}>{nome}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                        </fieldset>

                        <fieldset>
                            <Row>
                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="nomeMedicamento">Medicamento</Form.Label>
                                    <Form.Control type="text" name="nomeMedicamento" id="nomeMedicamento"/>
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-3">
                                    <Form.Label htmlFor="quantidade">Quantidade</Form.Label>
                                    <Form.Control type="tel" name="quantidade" id="quantidade"
                                                  onInput={(evt) => evt.currentTarget.value = Helpers.Masks.number(evt.currentTarget.value)}/>
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-3">
                                    <Form.Label htmlFor="medida">Unidade</Form.Label>
                                    <Form.Control type="text" name="medida" id="medida"/>
                                </Form.Group>
                            </Row>
                        </fieldset>

                        <fieldset>
                            <Row>
                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="tipo-cirurgia">Tipo de cirurgia</Form.Label>
                                    <Form.Select name="tipo-cirurgia" id="tipo-cirurgia">
                                        <option value="">Selecione</option>
                                        <option value="CASATRACAO">Castração</option>
                                        <option value="ORTOPEDICA">Ortopedica</option>
                                        <option value="OFTALMICA">Oftalmica</option>
                                        <option value="TECIDOS_MOLES">Tecidos Moles</option>
                                        <option value="ODONTOLOGICA">Odontologica</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="asa">Asa</Form.Label>
                                    <Form.Select name="asa" id="asa">
                                        <option value="">Selecione</option>
                                        <option value="ASA1">Asa 1</option>
                                        <option value="ASA2">Asa 2</option>
                                        <option value="ASA3">Asa 3</option>
                                        <option value="ASA4">Asa 4</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group className="mb-3 col-lg-12">
                                    <Form.Label htmlFor="asa">Categoria do Paciente</Form.Label>
                                    <Form.Control type="text" name="categoria-paciente"/>
                                </Form.Group>
                            </Row>
                        </fieldset>

                        <fieldset>
                            <Row>
                                <Form.Group className="mb-3 col-lg-12">
                                    <Form.Label htmlFor="diagnostico">Diagnostico</Form.Label>
                                    <Form.Control as="textarea" name="diagnostico"/>
                                </Form.Group>
                            </Row>
                        </fieldset>

                        <fieldset>
                            <Row>
                                <Form.Group className="mb-3 col-lg-12">
                                    <Form.Label htmlFor="observacoes">Observações</Form.Label>
                                    <Form.Control as="textarea" name="observacoes"/>
                                </Form.Group>
                            </Row>
                        </fieldset>

                        <fieldset>
                            <Row>
                                <Form.Group className="mb-3 col-lg-12">
                                    <Form.Label htmlFor="exames">Exames</Form.Label>
                                    <Form.Control as="textarea" name="exames"/>
                                </Form.Group>
                            </Row>
                        </fieldset>

                        <fieldset>
                            <Row>
                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="tipoProcedimento">Tipo de procedimento</Form.Label>

                                    <Form.Select name="tipoProcedimento" id="tipoProcedimento">
                                        <option value="">Selecione</option>
                                        <option value="IMUNIZACAO">Imunização</option>
                                        <option value="EXAME">Exame</option>
                                        <option value="MEDICACAO">Medicação</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="tipo">Tipo</Form.Label>

                                    <Form.Select name="tipo" id="tipo">
                                        <option value="">Selecione</option>
                                        <option value="PRESCRITIVO">Prescritivo</option>
                                        <option value="CONCLUSIVO">Conclusivo</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group className="mb-3 col-lg-12">
                                    <Form.Label htmlFor="descricao">Descrição</Form.Label>
                                    <Form.Control as="textarea" name="descricao"/>
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
        this.carregarTutores();
        this.carregarAnimais();
        this.carregarVeterinarios();
    }

    private carregarTutores = async (): Promise<void> => {
        this.setState({tutores: [{id: 1, nome: "Tutor"}]});
    }

    private carregarAnimais = async (): Promise<void> => {
        this.setState({animais: [{id: 1, nome: "Animal"}]});
    }

    private carregarVeterinarios = async (): Promise<void> => {
        this.setState({veterinarios: [{id: 1, nome: "Veterinário"}]});
    }

    private onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const formData = new FormData(evt.currentTarget);
        const data: Contracts.DynamicObject<any> = {
            "veterinario": formData.get("veterinario")?.toString() ?? "",
            "animal": formData.get("animal")?.toString() ?? "",
            "tutor": formData.get("tutor")?.toString() ?? "",
            "prescricoes": [{
                "medicacao": ""
            }],
            "medicamentos": [{
                "nomeMedicamento": formData.get("nomeMedicamento")?.toString() ?? "",
                "quantidade": formData.get("quantidade")?.toString() ?? "",
                "medida": formData.get("medida")?.toString() ?? ""
            }],
            "tipo-cirurgia": formData.get("tipo-cirurgia")?.toString() ?? "",
            "asa": formData.get("asa")?.toString() ?? "",
            "diagnostico": formData.get("diagnostico")?.toString() ?? "",
            "observacoes": formData.get("observacoes")?.toString() ?? "",
            "categoria-paciente": formData.get("categoria-paciente")?.toString() ?? "",
            "procedimentos": [{
                "tipoProcedimento": formData.get("tipoProcedimento")?.toString() ?? "",
                "tipo": formData.get("tipo")?.toString() ?? "",
                "descricao": formData.get("descricao")?.toString() ?? ""
            }]
        };

        try {
            console.log(data);

            await Axios.post(`${env.API}/cadastro-funcionario`, data, {
                headers: {"Authorization": `Bearer ${Storages.userStorage.get()?.token}`}
            });

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

export default FormProntuario;