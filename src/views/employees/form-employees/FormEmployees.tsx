import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Axios, { AxiosError } from "axios";

import Components from "../../../components/Components";
import Contracts from "../../../contracts/Contracts";
import Helpers from "../../../helpers/Helpers";
import Container from "react-bootstrap/Container";
import Layouts from "../../../layouts/Layouts";
import env from "../../../env";
import Storages from "../../../Storages";

interface State {
    address: Contracts.ViaCEPAddress,
    ufs: Contracts.IBGEUF[]
}

class FormEmployees extends React.Component<any, State>{
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
        const { address, ufs } = this.state;

        return (
            <Layouts.RestrictedFormLayout id="funcionario-formulario" style={{ marginBottom: "20px" }} layoutFormContext={this.layoutFormContext}>
                <Container>

                    <Components.Breadcrumbs>
                        <li className="breadcrumb-item">
                            <Link to="/painel">Painel</Link>
                        </li>

                        <li className="breadcrumb-item">
                            <Link to="/painel/funcionarios">Funcionarios</Link>
                        </li>

                        <li className="breadcrumb-item active">Cadastrar Funcionário</li>
                    </Components.Breadcrumbs>

                    <h1>Cadastrar Funcionário</h1>

                    <Form onSubmit={this.onSubmit}>
                        <fieldset>
                            <legend>Dados Pessoais</legend>

                            <Row>
                                <Form.Group className="mb-3 col-lg-10">
                                    <Form.Label htmlFor="nome">Nome*</Form.Label>
                                    <Form.Control type="text" name="nome" id="nome" required />
                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-2">
                                    <Form.Label htmlFor="crmv">CRMV</Form.Label>
                                    <Form.Control type="text" name="crmv" id="crmv" />
                                    <Form.Text className="text-muted">
                                        Somente para veterinários.
                                    </Form.Text>
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
                                    <Form.Select name="estado" id="estado" required>
                                        <option value="">Selecione</option>

                                        {ufs.map((uf) => <option value={uf.sigla} key={uf.id} selected={address.uf == uf.sigla}>{uf.sigla}</option>)}
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
                            <Link className="btn btn-outline-secondary" to="/painel/funcionarios">Voltar</Link>
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

    private onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        let data: Contracts.DynamicObject<string> = {};

        new FormData(evt.currentTarget).forEach((value, key) => data[key] = value.toString());

        try {
            await Axios.post(`${env.API}/cadastro-funcionario`, data, {
                headers: { "Authorization": `Bearer ${Storages.userStorage.get()?.token}` }
            });

            this.layoutFormContext.state({ formState: "sent", redirect: null, errorMessage: null });

            setInterval(() => {
                this.layoutFormContext.state({ formState: "idle", redirect: "/painel/funcionarios", errorMessage: null });
            }, 3000);
        } catch (error) {
            const status = (error as AxiosError).response?.status;

            switch (status) {
                case 401:
                    this.layoutFormContext.state({ formState: "error", redirect: null, errorMessage: "Usuário não autenticado." });
                    break;

                default:
                    this.layoutFormContext.state({ formState: "error", redirect: null, errorMessage: "Não foi possivel cadastrar esse funcionário. Por favor tente mais tarde." });
                    break;
            }
        }
    }
}

export default FormEmployees;