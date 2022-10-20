import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import Components from "../../../components/Components";
import Layout from "../../Layout";
import Masks from "../../../helpers/Masks";
import Contracts from "../../../contracts/Contracts";
import Address from "../../../helpers/Address";

interface State {
    address: Contracts.ViaCEPAddress,
    ufs: Contracts.IBGEUF[]
}

class FormClinica extends React.Component<any, State> {
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
    }

    render(): React.ReactNode {
        const { address, ufs } = this.state;

        return (
            <Layout>
                <Container>
                    <Components.Breadcrumbs>
                        <li className="breadcrumb-item">
                            <Link to="/">Página Inicial</Link>
                        </li>

                        <li className="breadcrumb-item active">Cadastrar Clínica</li>
                    </Components.Breadcrumbs>

                    <main id="cadastro-inicial">
                        <h1>Cadastrar Clínica</h1>

                        <Form>
                            <fieldset>
                                <legend>Empresa</legend>

                                <Row>
                                    <Form.Group className="mb-3 col-lg-6">
                                        <Form.Label htmlFor="nome-fantasia">Nome Fantasia*</Form.Label>
                                        <Form.Control type="text" name="nome-fantasia" id="nome-fantasia" autoFocus required />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-6">
                                        <Form.Label htmlFor="razao-social">Razão Social*</Form.Label>
                                        <Form.Control type="text" name="razao-social" id="razao-social" autoFocus required />
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group className="mb-3 col-lg-6">
                                        <Form.Label htmlFor="cnpj">CNPJ*</Form.Label>
                                        <Form.Control type="tel" name="cnpj" id="cnpj"
                                            onInput={(evt) => evt.currentTarget.value = Masks.cnpj(evt.currentTarget.value)} autoFocus required />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-6">
                                        <Form.Label htmlFor="cnae">CNAE*</Form.Label>
                                        <Form.Control type="tel" name="cnae" id="cnae" autoFocus required />
                                    </Form.Group>
                                </Row>
                            </fieldset>

                            <fieldset>
                                <legend>Endereço</legend>

                                <Row>
                                    <Form.Group className="mb-3 col-lg-2">
                                        <Form.Label htmlFor="cep">CEP*</Form.Label>
                                        <Form.Control type="tel" name="cep" id="cep"
                                            onInput={this.onInputCep} autoFocus required />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col">
                                        <Form.Label htmlFor="logradouro">Logradouro*</Form.Label>
                                        <Form.Control type="text" name="logradouro" id="logradouro" defaultValue={address.logradouro} autoFocus required />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-2">
                                        <Form.Label htmlFor="numero">Número*</Form.Label>
                                        <Form.Control type="tel" name="numero" id="numero"
                                            onInput={(evt) => evt.currentTarget.value = Masks.number(evt.currentTarget.value)} autoFocus required />
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group className="mb-3 col-lg-5">
                                        <Form.Label htmlFor="bairro">Bairro*</Form.Label>
                                        <Form.Control type="text" name="bairro" id="bairro" defaultValue={address.bairro} autoFocus required />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-5">
                                        <Form.Label htmlFor="cidade">Cidade*</Form.Label>
                                        <Form.Control type="text" name="cidade" id="cidade" defaultValue={address.localidade} autoFocus required />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-2">
                                        <Form.Label htmlFor="estado">Estado*</Form.Label>
                                        <Form.Select name="estado" id="estado" defaultValue={address.uf} autoFocus required>
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
                                        <Form.Label htmlFor="celular">Celular*</Form.Label>
                                        <Form.Control type="tel" name="celular" id="celular"
                                            onInput={(evt) => evt.currentTarget.value = Masks.celphone(evt.currentTarget.value)} autoFocus required />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-6">
                                        <Form.Label htmlFor="telefone">Telefone</Form.Label>
                                        <Form.Control type="tel" name="telefone" id="telefone"
                                            onInput={(evt) => evt.currentTarget.value = Masks.phone(evt.currentTarget.value)} autoFocus />
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group className="mb-3 col-lg-12">
                                        <Form.Label htmlFor="email">E-mail*</Form.Label>
                                        <Form.Control type="email" name="email" id="email" autoFocus required />
                                    </Form.Group>
                                </Row>
                            </fieldset>

                            <div className="d-flex justify-content-between">
                                <Link className="btn btn-outline-secondary" to="/">Voltar</Link>
                                <Button>Continuar</Button>
                            </div>
                        </Form>
                    </main>
                </Container>
            </Layout>
        );
    }

    componentDidMount(): void {
        this.loadUfs();
    }

    private loadUfs = async () => {
        this.setState({ ufs: await Address.loadUfs() });
    }

    private onInputCep = async (evt: React.FormEvent<HTMLInputElement>) => {
        evt.currentTarget.value = Masks.cep(evt.currentTarget.value);

        if (evt.currentTarget.value.replace(/\D/gmi, "").length == 8)
            this.setState({ address: await Address.loadAddress(evt.currentTarget.value) });
    }
}

export default FormClinica;