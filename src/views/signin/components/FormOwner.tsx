import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import Components from "../../../components/Components";
import Contracts from "../../../contracts/Contracts";
import Helpers from "../../../helpers/Helpers";
import { RegistrationStage } from "../SignIn";
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
            <Container className={this.props.fadeIn ? "fade show" : "fade"}>
                <Components.Breadcrumbs>
                    <li className="breadcrumb-item">
                        <Link to="/">Página Inicial</Link>
                    </li>

                    <li className="breadcrumb-item">
                        <a href="" onClick={(evt) => {
                            evt.preventDefault();
                            this.props.setRegistrationStage("clinic");
                        }}>Cadastrar Clinica</a>
                    </li>

                    <li className="breadcrumb-item active">Cadastrar Dono</li>
                </Components.Breadcrumbs>

                <h1>Cadastrar Dono</h1>

                <Form onSubmit={this.onSubmit}>
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
                                <Form.Select name="dono-estado" id="dono-estado" required>
                                    <option value="">Selecione</option>

                                    {ufs.map((uf) => <option value={uf.sigla} key={uf.id} selected={uf.sigla == address.uf}>{uf.sigla}</option>)}
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
                    </fieldset>

                    <fieldset>
                        <legend>Acesso</legend>

                        <Row>
                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="dono-email">E-mail*</Form.Label>
                                <Form.Control type="email" name="dono-email" id="dono-email" required />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="dono-senha">Senha*</Form.Label>
                                <Form.Control type="password" name="dono-senha" id="dono-senha" required />
                            </Form.Group>
                        </Row>
                    </fieldset>

                    <div className="d-flex justify-content-between">
                        <Button variant="outline-secondary" onClick={() => this.props.setRegistrationStage("clinic")}>Voltar</Button>
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
        this.setState({ ufs: await Helpers.Address.loadUfs() });
    }

    private onInputCep = async (evt: React.FormEvent<HTMLInputElement>) => {
        evt.currentTarget.value = Helpers.Masks.cep(evt.currentTarget.value);

        if (evt.currentTarget.value.replace(/\D/gmi, "").length == 8)
            this.setState({ address: await Helpers.Address.loadAddress(evt.currentTarget.value) });
    }

    private onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const { setFormData, setRegistrationStage } = this.props;

        setFormData(new FormData(evt.currentTarget));
        setRegistrationStage("technician");
    }
}

export default FormOwner;