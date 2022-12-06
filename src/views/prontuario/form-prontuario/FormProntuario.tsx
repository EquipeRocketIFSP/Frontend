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
    tutoresDesabilitar: boolean
}

class FormProntuario extends React.Component<any, State> {
    private readonly layoutFormContext: Layouts.LayoutFormContext;
    private readonly userData: Contracts.UserData | null;
    private readonly breadcrumbs: Contracts.Breadcrumbs[];

    constructor(props: any) {
        super(props);

        this.state = {
            tutores: [],
            animais: [],
            tutoresDesabilitar: true
        };

        this.layoutFormContext = Layouts.RestrictedFormLayout.createLayoutFormContext();
        this.userData = Storages.userStorage.get();
        this.breadcrumbs = [
            {name: "Painel", pathname: "/painel"},
            {name: "Prontuários", pathname: "/painel/prontuarios"},
            {name: "Prontuário", pathname: ""}
        ];
    }

    render(): React.ReactNode {
        const {tutores, animais, tutoresDesabilitar} = this.state;

        return (
            <Layouts.RestrictedFormLayout
                id="prontuario-formulario"
                style={{marginBottom: "20px"}}
                layoutFormContext={this.layoutFormContext}
                breadcrumbs={this.breadcrumbs}
                title="Prontuário"
                apiResource="prontuario"
                redirectResource="/painel/prontuarios"
            >
                <fieldset>
                    <Row>
                        <Form.Group className="mb-3 col-lg-12">
                            <Form.Label>Veterinário*</Form.Label>
                            <Form.Control type="text" defaultValue={this.userData?.nome ?? ""} style={{opacity: 0.5}}
                                          readOnly/>

                            <input type="hidden" value={this.userData?.id} name="veterinario"/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label htmlFor="animal">Animal*</Form.Label>

                            <Form.Select name="animal" id="animal" onInput={this.onChangeAnimais} required>
                                <option value="" disabled={!tutoresDesabilitar}>Selecione</option>

                                {animais.map(({id, nome}) => <option value={id}>{nome}</option>)}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label htmlFor="tutor">Tutor*</Form.Label>

                            <Form.Select name="tutor" id="tutor" disabled={tutoresDesabilitar} required>
                                <option value="">Selecione</option>

                                {tutores.map(({id, nome}) => <option value={id}>{nome}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                </fieldset>

                <fieldset>
                    <Row>
                        <Form.Group className="mb-3 col-lg-12">
                            <Form.Label htmlFor="medicamento">Medicamento</Form.Label>
                            <Form.Control type="text" name="medicamento" id="medicamento"/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-4">
                            <Form.Label htmlFor="apresentacaoMedicamento">Apresentação do medicamento</Form.Label>
                            <Form.Control type="text" name="apresentacaoMedicamento" id="apresentacaoMedicamento"/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-4">
                            <Form.Label htmlFor="quantidade">Quantidade</Form.Label>
                            <Form.Control type="tel" name="quantidade" id="quantidade"
                                          onInput={Helpers.Masks.number}/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-4">
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
                            <Form.Label htmlFor="asa">Categoria do Paciente</Form.Label>
                            <Form.Select name="asa" id="asa">
                                <option value="">Selecione</option>
                                <option value="Asa 1">Asa 1</option>
                                <option value="Asa 2">Asa 2</option>
                                <option value="Asa 3">Asa 3</option>
                                <option value="Asa 4">Asa 4</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                </fieldset>

                <fieldset>
                    <Row>
                        <Form.Group className="mb-3 col-lg-12">
                            <Form.Label htmlFor="diagnostico">Diagnóstico</Form.Label>
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

    private onChangeAnimais = (evt: React.FormEvent<HTMLSelectElement>) => {
        const {value} = evt.currentTarget;

        this.carregarTutores(parseInt(value));
    }

    private carregarTutores = async (id: number) => {
        try {
            this.setState({tutoresDesabilitar: true});

            const {data} = await Axios.get<Contracts.ListingData[]>(`${env.API}/animal/${id}/tutores`, {
                headers: {"Authorization": `Bearer ${Storages.userStorage.get()?.token}`}
            });

            this.setState({tutores: data, tutoresDesabilitar: false});
        } catch (error) {
            console.error(error);
        }
    }
}

export default FormProntuario;