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

class FormTechnician extends React.Component<Props, State> {
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

                    <li className="breadcrumb-item">
                        <a href="" onClick={(evt) => {
                            evt.preventDefault();
                            this.props.setRegistrationStage("owner");
                        }}>Cadastrar Dono</a>
                    </li>

                    <li className="breadcrumb-item active">Cadastrar Responsável Técnico</li>
                </Components.Breadcrumbs>

                <h1>Cadastrar Responsável Técnico</h1>

                <Form onSubmit={this.onSubmit}>
                    <fieldset>
                        <legend>Dados Pessoais</legend>

                        <Row>
                            <Form.Group className="mb-3 col-lg-10">
                                <Form.Label htmlFor="tecnico-nome">Nome*</Form.Label>
                                <Form.Control type="text" name="tecnico-nome" id="tecnico-nome" required />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-2">
                                <Form.Label htmlFor="tecnico-crmv">CRMV*</Form.Label>
                                <Form.Control type="text" name="tecnico-crmv" id="tecnico-crmv" required />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="tecnico-cpf">CPF*</Form.Label>
                                <Form.Control type="tel" name="tecnico-cpf" id="tecnico-cpf"
                                    onInput={(evt) => evt.currentTarget.value = Helpers.Masks.cpf(evt.currentTarget.value)} required />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="tecnico-rg">RG*</Form.Label>
                                <Form.Control type="tel" name="tecnico-rg" id="tecnico-rg" required />
                            </Form.Group>
                        </Row>
                    </fieldset>

                    <fieldset>
                        <legend>Endereço</legend>

                        <Row>
                            <Form.Group className="mb-3 col-lg-2">
                                <Form.Label htmlFor="tecnico-cep">CEP*</Form.Label>
                                <Form.Control type="tel" name="tecnico-cep" id="tecnico-cep"
                                    onInput={this.onInputCep} required />
                            </Form.Group>

                            <Form.Group className="mb-3 col">
                                <Form.Label htmlFor="tecnico-logradouro">Logradouro*</Form.Label>
                                <Form.Control type="text" name="tecnico-logradouro" id="tecnico-logradouro" defaultValue={address.logradouro} required />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-2">
                                <Form.Label htmlFor="tecnico-numero">Número*</Form.Label>
                                <Form.Control type="tel" name="tecnico-numero" id="tecnico-numero"
                                    onInput={(evt) => evt.currentTarget.value = Helpers.Masks.number(evt.currentTarget.value)} required />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="mb-3 col-lg-5">
                                <Form.Label htmlFor="tecnico-bairro">Bairro*</Form.Label>
                                <Form.Control type="text" name="tecnico-bairro" id="tecnico-bairro" defaultValue={address.bairro} required />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-5">
                                <Form.Label htmlFor="tecnico-cidade">Cidade*</Form.Label>
                                <Form.Control type="text" name="tecnico-cidade" id="tecnico-cidade" defaultValue={address.localidade} required />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-2">
                                <Form.Label htmlFor="tecnico-estado">Estado*</Form.Label>
                                <Form.Select name="tecnico-estado" id="tecnico-estado" defaultValue={address.uf} required>
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
                                <Form.Label htmlFor="tecnico-celular">Celular*</Form.Label>
                                <Form.Control type="tel" name="tecnico-celular" id="tecnico-celular"
                                    onInput={(evt) => evt.currentTarget.value = Helpers.Masks.celphone(evt.currentTarget.value)} required />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6">
                                <Form.Label htmlFor="tecnico-telefone">Telefone</Form.Label>
                                <Form.Control type="tel" name="tecnico-telefone" id="tecnico-telefone"
                                    onInput={(evt) => evt.currentTarget.value = Helpers.Masks.phone(evt.currentTarget.value)} />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="mb-3 col-lg-12">
                                <Form.Label htmlFor="tecnico-email">E-mail*</Form.Label>
                                <Form.Control type="email" name="tecnico-email" id="tecnico-email" required />
                            </Form.Group>
                        </Row>
                    </fieldset>

                    <div className="d-flex justify-content-between">
                        <Button variant="outline-secondary" onClick={() => this.props.setRegistrationStage("owner")}>Voltar</Button>
                        <Button variant="success" type="submit">Finalizar</Button>
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
        setRegistrationStage("send");
    }
}

export default FormTechnician;