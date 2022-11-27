import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import Contracts from "../../../contracts/Contracts";
import Helpers from "../../../helpers/Helpers";
import Layouts from "../../../layouts/Layouts";

interface State {
    address: Contracts.ViaCEPAddress,
    ufs: Contracts.IBGEUF[]
}

class FormTutor extends React.Component<any, State> {
    private layoutFormContext: Layouts.LayoutFormContext;
    private readonly breadcrumbs: Contracts.Breadcrumbs[];

    constructor(props: any) {
        super(props);

        this.state = {
            ufs: [],
            address: {
                bairro: "",
                cep: "",
                complemento: "",
                ddd: "",
                gia: "",
                ibge: "",
                localidade: "",
                logradouro: "",
                siafi: "",
                uf: ""
            }
        };

        this.layoutFormContext = Layouts.RestrictedFormLayout.createLayoutFormContext();
        this.breadcrumbs = [
            {name: "Painel", pathname: "/painel"},
            {name: "Tutores", pathname: "/painel/tutores"},
            {name: "Tutor", pathname: ""}
        ];
    }

    render(): React.ReactNode {
        const {ufs, address} = this.state;

        return (
            <Layouts.RestrictedFormLayout
                id="tutor-formulario"
                style={{marginBottom: "20px"}}
                layoutFormContext={this.layoutFormContext}
                breadcrumbs={this.breadcrumbs}
                title="Tutor"
                apiResource="tutor"
                redirectResource={"/painel/tutores"}
            >
                <fieldset>
                    <legend>Dados Pessoais</legend>

                    <Row>
                        <Form.Group className="mb-3 col-lg-12">
                            <Form.Label htmlFor="nome">Nome*</Form.Label>
                            <Form.Control type="text" name="nome" id="nome" required/>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label htmlFor="cpf">CPF*</Form.Label>
                            <Form.Control type="tel" name="cpf" id="cpf"
                                          onInput={(evt) => evt.currentTarget.value = Helpers.Masks.cpf(evt.currentTarget.value)}
                                          required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label htmlFor="rg">RG*</Form.Label>
                            <Form.Control type="tel" name="rg" id="rg" required/>
                        </Form.Group>
                    </Row>
                </fieldset>

                <fieldset>
                    <legend>Endereço</legend>

                    <Row>
                        <Form.Group className="mb-3 col-lg-2">
                            <Form.Label htmlFor="cep">CEP*</Form.Label>
                            <Form.Control type="tel" name="cep" id="cep"
                                          onInput={this.onInputCep} required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col">
                            <Form.Label htmlFor="logradouro">Logradouro*</Form.Label>
                            <Form.Control type="text" name="logradouro" id="logradouro"
                                          defaultValue={address.logradouro} required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-2">
                            <Form.Label htmlFor="numero">Número*</Form.Label>
                            <Form.Control type="tel" name="numero" id="numero"
                                          onInput={(evt) => evt.currentTarget.value = Helpers.Masks.number(evt.currentTarget.value)}
                                          required/>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group className="mb-3 col-lg-5">
                            <Form.Label htmlFor="bairro">Bairro*</Form.Label>
                            <Form.Control type="text" name="bairro" id="bairro" defaultValue={address.bairro}
                                          required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-5">
                            <Form.Label htmlFor="cidade">Cidade*</Form.Label>
                            <Form.Control type="text" name="cidade" id="cidade"
                                          defaultValue={address.localidade} required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-2">
                            <Form.Label htmlFor="estado">Estado*</Form.Label>
                            <Form.Select name="estado" id="estado" defaultValue={address.uf} required>
                                <option value="">Selecione</option>

                                {ufs.map((uf) => <option value={uf.sigla} key={uf.id}
                                                         selected={uf.sigla == address.uf}>{uf.sigla}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                </fieldset>

                <fieldset>
                    <legend>Contato</legend>

                    <Row>
                        <Form.Group className="mb-3 col-lg-12">
                            <Form.Label htmlFor="email">E-mail*</Form.Label>
                            <Form.Control type="email" name="email" id="email" required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label htmlFor="celular">Celular*</Form.Label>
                            <Form.Control type="tel" name="celular" id="celular"
                                          onInput={(evt) => evt.currentTarget.value = Helpers.Masks.celphone(evt.currentTarget.value)}
                                          required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label htmlFor="telefone">Telefone</Form.Label>
                            <Form.Control type="tel" name="telefone" id="telefone"
                                          onInput={(evt) => evt.currentTarget.value = Helpers.Masks.phone(evt.currentTarget.value)}/>
                        </Form.Group>
                    </Row>
                </fieldset>

                <input type="hidden" name="clinica" value="1"/>

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
}

export default FormTutor;