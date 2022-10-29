import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import Components from "../../../components/Components";
import Contracts from "../../../contracts/Contracts";
import Helpers from "../../../helpers/Helpers";
import Container from "react-bootstrap/Container";
import Layouts from "../../../layouts/Layouts";

interface State {
    address: Contracts.ViaCEPAddress,
    ufs: Contracts.IBGEUF[]
}

class FormTutor extends React.Component<any, State> {
    private layoutFormContext: Layouts.LayoutFormContext;

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
    }

    render(): React.ReactNode {
        const { ufs, address } = this.state;

        return (
            <Layouts.RestrictedFormLayout id="tutor-formulario" style={{ marginBottom: "20px" }} layoutFormContext={this.layoutFormContext} >
                <Container>

                    <Components.Breadcrumbs>
                        <li className="breadcrumb-item">
                            <Link to="/painel">Painel</Link>
                        </li>

                        <li className="breadcrumb-item">
                            <Link to="/painel/tutores">Tutores</Link>
                        </li>

                        <li className="breadcrumb-item active">Tutor</li>
                    </Components.Breadcrumbs>

                    <h1>Tutor</h1>

                    <Form onSubmit={this.onSubmit}>
                        <fieldset>
                            <legend>Dados Pessoais</legend>

                            <Row>
                                <Form.Group className="mb-3 col-lg-12">
                                    <Form.Label htmlFor="nome">Nome*</Form.Label>
                                    <Form.Control type="text" name="nome" id="nome" required />
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="cpf">CPF*</Form.Label>
                                    <Form.Control type="tel" name="cpf" id="cpf"
                                        onInput={(evt) => evt.currentTarget.value = Helpers.Masks.cpf(evt.currentTarget.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="rg">RG*</Form.Label>
                                    <Form.Control type="tel" name="rg" id="rg" required />
                                </Form.Group>
                            </Row>
                        </fieldset>

                        <fieldset>
                            <legend>Endereço</legend>

                            <Row>
                                <Form.Group className="mb-3 col-lg-2">
                                    <Form.Label htmlFor="cep">CEP*</Form.Label>
                                    <Form.Control type="tel" name="cep" id="cep"
                                        onInput={this.onInputCep} required />
                                </Form.Group>

                                <Form.Group className="mb-3 col">
                                    <Form.Label htmlFor="logradouro">Logradouro*</Form.Label>
                                    <Form.Control type="text" name="logradouro" id="logradouro" defaultValue={address.logradouro} required />
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-2">
                                    <Form.Label htmlFor="numero">Número*</Form.Label>
                                    <Form.Control type="tel" name="numero" id="numero"
                                        onInput={(evt) => evt.currentTarget.value = Helpers.Masks.number(evt.currentTarget.value)} required />
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group className="mb-3 col-lg-5">
                                    <Form.Label htmlFor="bairro">Bairro*</Form.Label>
                                    <Form.Control type="text" name="bairro" id="bairro" defaultValue={address.bairro} required />
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-5">
                                    <Form.Label htmlFor="cidade">Cidade*</Form.Label>
                                    <Form.Control type="text" name="cidade" id="cidade" defaultValue={address.localidade} required />
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-2">
                                    <Form.Label htmlFor="estado">Estado*</Form.Label>
                                    <Form.Select name="estado" id="estado" defaultValue={address.uf} required>
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
                                    <Form.Label htmlFor="celular">Celular*</Form.Label>
                                    <Form.Control type="tel" name="celular" id="celular"
                                        onInput={(evt) => evt.currentTarget.value = Helpers.Masks.celphone(evt.currentTarget.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="telefone">Telefone</Form.Label>
                                    <Form.Control type="tel" name="telefone" id="telefone"
                                        onInput={(evt) => evt.currentTarget.value = Helpers.Masks.phone(evt.currentTarget.value)} />
                                </Form.Group>
                            </Row>
                        </fieldset>

                        <fieldset>
                            <legend>Acesso</legend>

                            <Row>
                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="email">E-mail*</Form.Label>
                                    <Form.Control type="email" name="email" id="email" required />
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-6">
                                    <Form.Label htmlFor="senha">Senha*</Form.Label>
                                    <Form.Control type="password" name="senha" id="senha" required />
                                </Form.Group>
                            </Row>
                        </fieldset>

                        <div className="d-flex justify-content-between">
                            <Link className="btn btn-outline-secondary" to="/painel/tutores">Voltar</Link>
                            <Button variant="success" type="submit">Cadastrar</Button>
                        </div>
                    </Form>

                </Container>
            </Layouts.RestrictedFormLayout>
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

        this.layoutFormContext.state({ formState: "sent", redirect: null });

        setInterval(() => {
            this.layoutFormContext.state({ formState: "idle", redirect: "/painel/tutores" });
        }, 3000);

        /* const {setFormData, setRegistrationStage} = this.props;

                    setFormData(new FormData(evt.currentTarget));
                    setRegistrationStage("send"); */
    }
}

export default FormTutor;