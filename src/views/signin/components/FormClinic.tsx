import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

import Components from "../../../components/Components";
import Contracts from "../../../contracts/Contracts";
import Helpers from "../../../helpers/Helpers";
import {RegistrationStage} from "../SignIn";
import Container from "react-bootstrap/Container";

interface Props {
    fadeIn: boolean,
    setFormData: (formData: FormData) => void,
    setRegistrationStage: (registrationStage: RegistrationStage) => void
}

interface State {
    address: Contracts.ViaCEPAddress,
    ufs: Contracts.IBGEUF[]
}

class FormClinic extends React.Component<Props, State> {
    constructor(props: Props) {
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
    }

    render(): React.ReactNode {
        const {address, ufs} = this.state;

        return (
            <Container className={this.props.fadeIn ? "fade show" : "fade"}>
                <Components.Breadcrumbs>
                    <li className="breadcrumb-item">
                        <Link to="/">Página Inicial</Link>
                    </li>

                    <li className="breadcrumb-item active">Cadastrar Clínica</li>
                </Components.Breadcrumbs>


                <h1>Cadastrar Clínica</h1>

                <Form onSubmit={this.onSubmit}>
                    <fieldset>
                        <legend>Empresa</legend>

                        <Row>
                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="clinica-nome-fantasia">Nome Fantasia*</Form.Label>
                                <Form.Control type="text" name="clinica-nome-fantasia" id="clinica-nome-fantasia"
                                              autoFocus required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="clinica-razao-social">Razão Social*</Form.Label>
                                <Form.Control type="text" name="clinica-razao-social" id="clinica-razao-social"
                                              required/>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="clinica-cnpj">CNPJ*</Form.Label>
                                <Form.Control type="tel" name="clinica-cnpj" id="clinica-cnpj"
                                              onInput={Helpers.Masks.cnpj}
                                              onBlur={Helpers.Masks.onBlurCnpj}
                                              required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="clinica-cnae">CNAE*</Form.Label>
                                <Form.Control type="tel" name="clinica-cnae" id="clinica-cnae"
                                              onInput={Helpers.Masks.cnae}
                                              required/>
                            </Form.Group>
                        </Row>
                    </fieldset>

                    <fieldset>
                        <legend>Endereço</legend>

                        <Row>
                            <Form.Group className="mb-3 col-lg-2">
                                <Form.Label htmlFor="clinica-cep">CEP*</Form.Label>
                                <Form.Control type="tel" name="clinica-cep" id="clinica-cep"
                                              onInput={this.onInputCep}
                                              onBlur={Helpers.Masks.onBlurCep}
                                              required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col">
                                <Form.Label htmlFor="clinica-logradouro">Logradouro*</Form.Label>
                                <Form.Control type="text" name="clinica-logradouro" id="clinica-logradouro"
                                              defaultValue={address.logradouro} required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-2">
                                <Form.Label htmlFor="clinica-numero">Número*</Form.Label>
                                <Form.Control type="tel" name="clinica-numero" id="clinica-numero"
                                              onInput={Helpers.Masks.number}
                                              required/>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="mb-3 col-lg-5">
                                <Form.Label htmlFor="clinica-bairro">Bairro*</Form.Label>
                                <Form.Control type="text" name="clinica-bairro" id="clinica-bairro"
                                              defaultValue={address.bairro} required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-5">
                                <Form.Label htmlFor="clinica-cidade">Cidade*</Form.Label>
                                <Form.Control type="text" name="clinica-cidade" id="clinica-cidade"
                                              defaultValue={address.localidade} required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-2">
                                <Form.Label htmlFor="clinica-estado">Estado*</Form.Label>
                                <Form.Select name="clinica-estado" id="clinica-estado" required>
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
                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="clinica-celular">Celular*</Form.Label>
                                <Form.Control type="tel" name="clinica-celular" id="clinica-celular"
                                              onInput={Helpers.Masks.celphone}
                                              onBlur={Helpers.Masks.onBlurCelphone}
                                              required/>
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="clinica-telefone">Telefone</Form.Label>
                                <Form.Control type="tel" name="clinica-telefone" id="clinica-telefone"
                                              onInput={Helpers.Masks.phone}
                                              onBlur={Helpers.Masks.onBlurPhone}
                                />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="mb-3 col-lg-12">
                                <Form.Label htmlFor="clinica-email">E-mail*</Form.Label>
                                <Form.Control type="email" name="clinica-email" id="clinica-email" required/>
                            </Form.Group>
                        </Row>
                    </fieldset>

                    <div className="d-flex justify-content-between">
                        <Link className="btn btn-outline-secondary" to="/">Voltar</Link>
                        <Button type="submit">Continuar</Button>
                    </div>
                </Form>

            </Container>
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
            this.setState({address: await Helpers.Address.loadAddress(evt.currentTarget.value)});
    }

    private onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const {setFormData, setRegistrationStage} = this.props;

        setFormData(new FormData(evt.currentTarget));
        setRegistrationStage("owner");
    }
}

export default FormClinic;