import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Axios from "axios";
import Select, {MultiValue} from "react-select";

import Contracts from "../../../contracts/Contracts";
import Helpers from "../../../helpers/Helpers";
import Layouts from "../../../layouts/Layouts";
import Storages from "../../../Storages";
import env from "../../../env";

interface State {
    tutores: Contracts.Tutor[],
    tutoresSelecionados: number[]
}

class FormAnimal extends React.Component<any, State> {
    private layoutFormContext: Layouts.LayoutFormContext;
    private readonly breadcrumbs: Contracts.Breadcrumbs[];

    constructor(props: any) {
        super(props);

        this.state = {
            tutores: [],
            tutoresSelecionados: []
        };

        this.layoutFormContext = Layouts.RestrictedFormLayout.createLayoutFormContext();
        this.breadcrumbs = [
            {name: "Painel", pathname: "/painel"},
            {name: "Animais", pathname: "/painel/animais"},
            {name: "Animal", pathname: ""}
        ];
    }

    render(): React.ReactNode {
        const referrer = Storages.referrerStorage.get();
        const tutores = this.state.tutores.map(({id, nome}) => {
            return {value: id, label: nome};
        });

        return (
            <Layouts.RestrictedFormLayout
                id="animal-formulario"
                style={{marginBottom: "20px"}}
                layoutFormContext={this.layoutFormContext}
                breadcrumbs={this.breadcrumbs}
                beforeSubmit={this.beforeSubmit}
                title="Animal"
                apiResource="animal"
                redirectResource={referrer ?? "/painel/animais"}
            >
                <fieldset>
                    <legend>Dados do animal</legend>

                    <Row>
                        <Form.Group className="mb-3 col-lg-9">
                            <Form.Label htmlFor="nome">Nome*</Form.Label>
                            <Form.Control type="text" name="nome" id="nome" required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-1">
                            <Form.Label htmlFor="idade">Idade*</Form.Label>
                            <Form.Control type="text" name="idade" id="idade"
                                          onInput={Helpers.Masks.number}
                                          required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-2">
                            <Form.Label htmlFor="sexo">Sexo*</Form.Label>
                            <Form.Select name="sexo" id="sexo" required>
                                <option value="">Selecione</option>
                                <option value="MASCULINO">Macho</option>
                                <option value="FEMININO">Fêmea</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group className="mb-3 col-lg-4">
                            <Form.Label htmlFor="raca">Raça*</Form.Label>
                            <Form.Control type="text" name="raca" id="raca" required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-4">
                            <Form.Label htmlFor="especie">Espécie*</Form.Label>
                            <Form.Control type="text" name="especie" id="especie" required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-4">
                            <Form.Label htmlFor="pelagem">Pelagem*</Form.Label>
                            <Form.Control type="text" name="pelagem" id="pelagem" required/>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group className="mb-3 col-lg-12">
                            <Form.Label htmlFor="formaIdentificacao">Forma de identificação</Form.Label>
                            <Form.Control type="text" name="formaIdentificacao" id="formaIdentificacao"/>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group className="mb-3 col-lg-12">
                            <Form.Label htmlFor="tutores">Tutor*</Form.Label>
                            <Select name="tutores" id="tutores" options={tutores}
                                    onChange={this.onChangeTutores} isMulti required/>
                        </Form.Group>
                    </Row>
                </fieldset>

                <fieldset>
                    <legend>Parentes</legend>

                    <Row>
                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label htmlFor="pai">Pai</Form.Label>
                            <Form.Control type="text" name="pai" id="pai" readOnly/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label htmlFor="mae">Mãe</Form.Label>
                            <Form.Control type="text" name="mae" id="mae" readOnly/>
                        </Form.Group>
                    </Row>
                </fieldset>

                <input type="hidden" name="clinica" value="1"/>
            </Layouts.RestrictedFormLayout>
        );
    }

    componentDidMount(): void {
        this.loadTutors();
    }

    private loadTutors = async (): Promise<void> => {
        try {
            const {data: tutores} = await Axios.get(`${env.API}/tutor`, {headers: {"Authorization": `Bearer ${Storages.userStorage.get()?.token}`}});

            this.setState({tutores});
        } catch (error) {
            console.error(error);
        }
    }

    private beforeSubmit = async (data: Contracts.DynamicObject<any>) => {
        data["tutores"] = this.state.tutoresSelecionados;

        //TODO: Remover null dos campos mae e pai na versão final.
        data["mae"] = null;
        data["pai"] = null;
    }

    private onChangeTutores = (data: MultiValue<{ value: number, label: string }>) => {
        const tutoresSelecionados = data.map(({value}) => {
            return value;
        });

        this.setState({tutoresSelecionados});
    }
}

export default FormAnimal;