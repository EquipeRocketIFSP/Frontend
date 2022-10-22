import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import Components from "../../../components/Components";
import Contracts from "../../../contracts/Contracts";
import Helpers from "../../../helpers/Helpers";
import { RegistrationStage } from "../CadastroInicial";
import Container from "react-bootstrap/Container";

interface Props {
    fadeIn: boolean,
    setRegistrationStage: (registrationStage: RegistrationStage) => void
}

interface State {
    address: Contracts.ViaCEPAddress,
    ufs: Contracts.IBGEUF[]
}

class FormOwner extends React.Component<Props, State> {
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
        const { address, ufs } = this.state;

        return (
            <Container className={this.props.fadeIn ? "fade show" : "fade hide"}>
                <Components.Breadcrumbs>
                    <li className="breadcrumb-item">
                        <Link to="/">Página Inicial</Link>
                    </li>

                    <li className="breadcrumb-item">
                        <a href="#" onClick={() => this.props.setRegistrationStage("clinic")}>Cadastrar Clinica</a>
                    </li>

                    <li className="breadcrumb-item active">Cadastrar Dono</li>
                </Components.Breadcrumbs>

                <h1>Cadastrar Dono</h1>

                <Form>
                    <fieldset>
                        <legend>Dados Pessoais</legend>

                        <Row>
                            <Form.Group className="mb-3 col-lg-12">
                                <Form.Label htmlFor="dono-nome-fantasia">Nome*</Form.Label>
                                <Form.Control type="text" name="dono-nome-fantasia" id="dono-nome-fantasia" required />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="dono-cpf">CPF*</Form.Label>
                                <Form.Control type="tel" name="dono-cpf" id="dono-cpf"
                                    onInput={(evt) => evt.currentTarget.value = Helpers.Masks.cpf(evt.currentTarget.value)} required />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="dono-rg">RG*</Form.Label>
                                <Form.Control type="tel" name="dono-rg" id="dono-rg" required />
                            </Form.Group>
                        </Row>
                    </fieldset>

                    <fieldset>
                        <legend>Endereço</legend>

                        <Row>
                            <Form.Group className="mb-3 col-lg-2">
                                <Form.Label htmlFor="dono-cep">CEP*</Form.Label>
                                <Form.Control type="tel" name="dono-cep" id="dono-cep"
                                    onInput={this.onInputCep} required />
                            </Form.Group>

                            <Form.Group className="mb-3 col">
                                <Form.Label htmlFor="dono-logradouro">Logradouro*</Form.Label>
                                <Form.Control type="text" name="dono-logradouro" id="dono-logradouro" defaultValue={address.logradouro} required />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-2">
                                <Form.Label htmlFor="dono-numero">Número*</Form.Label>
                                <Form.Control type="tel" name="dono-numero" id="dono-numero"
                                    onInput={(evt) => evt.currentTarget.value = Helpers.Masks.number(evt.currentTarget.value)} required />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="mb-3 col-lg-5">
                                <Form.Label htmlFor="dono-bairro">Bairro*</Form.Label>
                                <Form.Control type="text" name="dono-bairro" id="dono-bairro" defaultValue={address.bairro} required />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-5">
                                <Form.Label htmlFor="dono-cidade">Cidade*</Form.Label>
                                <Form.Control type="text" name="dono-cidade" id="dono-cidade" defaultValue={address.localidade} required />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-2">
                                <Form.Label htmlFor="dono-estado">Estado*</Form.Label>
                                <Form.Select name="dono-estado" id="dono-estado" defaultValue={address.uf} required>
                                    <option value="">Selecione</option>

                                    {ufs.map((uf) => <option value={uf.sigla} key={uf.id}>{uf.sigla}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                    </fieldset>

                    <fieldset>
                        <legend>Contato</legend>

                        <Row>
                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="dono-celular">Celular*</Form.Label>
                                <Form.Control type="tel" name="dono-celular" id="dono-celular"
                                    onInput={(evt) => evt.currentTarget.value = Helpers.Masks.celphone(evt.currentTarget.value)} required />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="dono-telefone">Telefone</Form.Label>
                                <Form.Control type="tel" name="dono-telefone" id="dono-telefone"
                                    onInput={(evt) => evt.currentTarget.value = Helpers.Masks.phone(evt.currentTarget.value)} />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="mb-3 col-lg-12">
                                <Form.Label htmlFor="dono-email">E-mail*</Form.Label>
                                <Form.Control type="email" name="dono-email" id="dono-email" required />
                            </Form.Group>
                        </Row>
                    </fieldset>

                    <div className="d-flex justify-content-between">
                        <Button variant="outline-secondary" onClick={() => this.props.setRegistrationStage("clinic")}>Voltar</Button>
                        <Button onClick={() => this.props.setRegistrationStage("technician")}>Continuar</Button>
                    </div>
                </Form>

            </Container>
        );
    }

    componentDidMount(): void {
        this.loadUfs();
    }

    private loadUfs = async () => {
        this.setState({ ufs: await Helpers.Address.loadUfs() });
    }

    private onInputCep = async (evt: React.FormEvent<HTMLInputElement>) => {
        evt.currentTarget.value = Helpers.Masks.cep(evt.currentTarget.value);

        if (evt.currentTarget.value.replace(/\D/gmi, "").length == 8)
            this.setState({ address: await Helpers.Address.loadAddress(evt.currentTarget.value) });
    }
}

export default FormOwner;