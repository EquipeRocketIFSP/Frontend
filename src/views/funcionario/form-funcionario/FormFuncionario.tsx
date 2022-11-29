import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import Contracts from "../../../contracts/Contracts";
import Helpers from "../../../helpers/Helpers";
import Layouts from "../../../layouts/Layouts";

interface State {
    endereco: Contracts.ViaCEPAddress,
    ufs: Contracts.IBGEUF[],
    mostrarCrmv: boolean
}

class FormFuncionario extends React.Component<any, State> {
    private layoutFormContext: Layouts.LayoutFormContext;
    private readonly breadcrumbs: Contracts.Breadcrumbs[];

    constructor(props: any) {
        super(props);

        this.state = {
            ufs: [],
            endereco: {
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
            },
            mostrarCrmv: false,
        };

        this.layoutFormContext = Layouts.RestrictedFormLayout.createLayoutFormContext();
        this.breadcrumbs = [
            {name: "Painel", pathname: "/painel"},
            {name: "Funcionarios", pathname: "/painel/funcionarios"},
            {name: "Cadastrar Funcionário", pathname: ""}
        ];
    }

    render(): React.ReactNode {
        const {endereco, ufs, mostrarCrmv} = this.state;

        return (
            <Layouts.RestrictedFormLayout
                id="funcionario-formulario"
                style={{marginBottom: "20px"}}
                layoutFormContext={this.layoutFormContext}
                breadcrumbs={this.breadcrumbs}
                beforeSubmit={this.beforeSubmit}
                title="Cadastrar Funcionário"
                apiResource="funcionario"
                redirectResource="/painel/funcionarios"
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
                                          onInput={Helpers.Masks.cpf}
                                          onBlur={Helpers.Masks.onBlurCpf}
                                          required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label htmlFor="rg">RG*</Form.Label>
                            <Form.Control type="tel" name="rg" id="rg" required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-12">
                            <Form.Check type="checkbox" label="É veterinário"
                                        onInput={() => this.setState({mostrarCrmv: !mostrarCrmv})}/>
                        </Form.Group>

                        {
                            mostrarCrmv ?
                                (
                                    <Form.Group className="mb-3 col-lg-12">
                                        <Form.Label htmlFor="crmv">CRMV</Form.Label>
                                        <Form.Control type="text" name="crmv" id="crmv"
                                                      onInput={Helpers.Masks.crmv}/>
                                    </Form.Group>
                                ) : <></>
                        }
                    </Row>
                </fieldset>

                <fieldset>
                    <legend>Endereço</legend>

                    <Row>
                        <Form.Group className="mb-3 col-lg-2">
                            <Form.Label htmlFor="cep">CEP*</Form.Label>
                            <Form.Control type="tel" name="cep" id="cep"
                                          onInput={this.onInputCep}
                                          onBlur={Helpers.Masks.onBlurCep}
                                          required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col">
                            <Form.Label htmlFor="logradouro">Logradouro*</Form.Label>
                            <Form.Control type="text" name="logradouro" id="logradouro"
                                          defaultValue={endereco.logradouro} required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-2">
                            <Form.Label htmlFor="numero">Número*</Form.Label>
                            <Form.Control type="tel" name="numero" id="numero"
                                          onInput={Helpers.Masks.number}
                                          required/>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group className="mb-3 col-lg-5">
                            <Form.Label htmlFor="bairro">Bairro*</Form.Label>
                            <Form.Control type="text" name="bairro" id="bairro" defaultValue={endereco.bairro}
                                          required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-5">
                            <Form.Label htmlFor="cidade">Cidade*</Form.Label>
                            <Form.Control type="text" name="cidade" id="cidade"
                                          defaultValue={endereco.localidade} required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-2">
                            <Form.Label htmlFor="estado">Estado*</Form.Label>
                            <Form.Select name="estado" id="estado" required>
                                <option value="">Selecione</option>

                                {ufs.map((uf) => <option value={uf.sigla} key={uf.id}
                                                         selected={endereco.uf == uf.sigla}>{uf.sigla}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                </fieldset>

                <fieldset>
                    <legend>Contato</legend>

                    <Row>
                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label htmlFor="celular">Celular*</Form.Label>
                            <Form.Control type="tel" name="celular" id="celular"
                                          onInput={Helpers.Masks.celphone}
                                          onBlur={Helpers.Masks.onBlurCelphone}
                                          required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label htmlFor="telefone">Telefone</Form.Label>
                            <Form.Control type="tel" name="telefone" id="telefone"
                                          onInput={(evt) => Helpers.Masks.phone(evt)}
                                          onBlur={Helpers.Masks.onBlurPhone}
                            />
                        </Form.Group>
                    </Row>
                </fieldset>

                <fieldset>
                    <legend>Acesso</legend>

                    <Row>
                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label htmlFor="email">E-mail*</Form.Label>
                            <Form.Control type="email" name="email" id="email" required/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6">
                            <Form.Label htmlFor="senha">Senha*</Form.Label>
                            <Form.Control type="password" name="senha" id="senha" required/>
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
        Helpers.Masks.cep(evt);

        if (evt.currentTarget.value.replace(/\D/gmi, "").length == 8)
            this.setState({endereco: await Helpers.Address.loadAddress(evt.currentTarget.value)});
    }

    private beforeSubmit = (data: Contracts.DynamicObject<any>) => {
        if (!data["crmv"])
            data["crmv"] = "";
    }
}

export default FormFuncionario;