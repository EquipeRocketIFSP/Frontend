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
    animais: Contracts.ListingData[],
    tutores: Contracts.ListingData[],
}

class FormProntuario extends React.Component<any, State> {
    private readonly layoutFormContext: Layouts.LayoutFormContext;

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
                                        <option value="5">Veterinário</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="animal">Animal*</Form.Label>

                                    <Form.Select name="animal" id="animal" required>
                                        <option value="">Selecione</option>

                                        {animais.map(({id, nome}) => <option value={id}>{nome}</option>)}
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
                                    <Form.Label htmlFor="medida">Unidade</Form.Label>
                                    <Form.Control type="text" name="medida" id="medida"/>
                                </Form.Group>
                            </Row>
                        </fieldset>

                        <fieldset>
                            <Row>
                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="tipoCirugia">Tipo de cirurgia</Form.Label>
                                    <Form.Select name="tipoCirugia" id="tipoCirugia">
                                        <option value="">Selecione</option>
                                        <option value="Castração">Castração</option>
                                        <option value="Ortopedica">Ortopedica</option>
                                        <option value="Oftalmica">Oftalmica</option>
                                        <option value="Tecidos Moles">Tecidos Moles</option>
                                        <option value="Odontologica">Odontologica</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="asa">Asa</Form.Label>
                                    <Form.Select name="asa" id="asa">
                                        <option value="">Selecione</option>
                                        <option value="Asa 1">Asa 1</option>
                                        <option value="Asa 2">Asa 2</option>
                                        <option value="Asa 3">Asa 3</option>
                                        <option value="Asa 4">Asa 4</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>

                            {/*<Row>
                                <Form.Group className="mb-3 col-lg-12">
                                    <Form.Label htmlFor="asa">Categoria do Paciente</Form.Label>
                                    <Form.Control type="text" name="categoria-paciente"/>
                                </Form.Group>
                            </Row>*/}
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
                                <Form.Group className="mb-3 col-lg-12">
                                    <Form.Label htmlFor="tipoProcedimento">Tipo de procedimento</Form.Label>

                                    <Form.Select name="procedimento" id="tipoProcedimento">
                                        <option value="">Selecione</option>
                                        <option value="Imunização">Imunização</option>
                                        <option value="Exame">Exame</option>
                                        <option value="Medicação">Medicação</option>
                                    </Form.Select>
                                </Form.Group>

                                {/*<Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="tipo">Tipo</Form.Label>

                                    <Form.Select name="tipo" id="tipo">
                                        <option value="">Selecione</option>
                                        <option value="PRESCRITIVO">Prescritivo</option>
                                        <option value="CONCLUSIVO">Conclusivo</option>
                                    </Form.Select>
                                </Form.Group>*/}
                            </Row>

                            {/*<Row>
                                <Form.Group className="mb-3 col-lg-12">
                                    <Form.Label htmlFor="descricao">Descrição</Form.Label>
                                    <Form.Control as="textarea" name="descricao"/>
                                </Form.Group>
                            </Row>*/}
                        </fieldset>

                        <input type="hidden" name="clinica" value="1"/>

                        <div className="d-flex justify-content-between">
                            <Link className="btn btn-outline-secondary" to="/painel/funcionarios">Voltar</Link>
                            <Button variant="success" type="submit">Cadastrar</Button>
                        </div>
                    </Form>

                </Container>
            </Layouts.RestrictedFormLayout>
        );
    }

    componentDidMount() {
        this.carregarAnimais();
        //this.carregarTutores();
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
            console.log(data);

            await Axios.post(`${env.API}/prontuario`, data, {
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