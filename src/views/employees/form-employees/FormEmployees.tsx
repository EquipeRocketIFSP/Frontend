import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/esm/Alert";
import { Link, Navigate } from "react-router-dom";

import Components from "../../../components/Components";
import Contracts from "../../../contracts/Contracts";
import Helpers from "../../../helpers/Helpers";
import Container from "react-bootstrap/Container";
import RestrictedLayout from "../../RestrictedLayout";

interface State extends Contracts.Redirect {
    formState: "idle" | "sent",
    address: Contracts.ViaCEPAddress,
    ufs: Contracts.IBGEUF[]
}

class FormEmployees extends React.Component<any, State>{
    constructor(props: any) {
        super(props);

        this.state = {
            formState: "idle",
            redirect: null,
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
        const { redirect, formState, address, ufs } = this.state;

        if (redirect)
            return <Navigate to={redirect} />;

        if (formState == "sent") {
            return (
                <RestrictedLayout>
                    <main id="funcionario-formulario" style={{ marginBottom: "20px" }}>
                        <Container>
                            <Alert variant="success">Funcionário cadastrado com sucesso.</Alert>
                        </Container>
                    </main>
                </RestrictedLayout>
            );
        }

        return (
            <RestrictedLayout>
                <main id="funcionario-formulario" style={{ marginBottom: "20px" }}>
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
                                        <Form.Label htmlFor="funcionario-nome">Nome*</Form.Label>
                                        <Form.Control type="text" name="funcionario-nome" id="funcionario-nome" required />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-2">
                                        <Form.Label htmlFor="funcionario-crmv">CRMV</Form.Label>
                                        <Form.Control type="text" name="funcionario-crmv" id="funcionario-crmv" />
                                        <Form.Text className="text-muted">
                                            Somente para veterinários.
                                        </Form.Text>
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group className="mb-3 col-lg-6">
                                        <Form.Label htmlFor="funcionario-cpf">CPF*</Form.Label>
                                        <Form.Control type="tel" name="funcionario-cpf" id="funcionario-cpf"
                                            onInput={(evt) => evt.currentTarget.value = Helpers.Masks.cpf(evt.currentTarget.value)} required />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-6">
                                        <Form.Label htmlFor="funcionario-rg">RG*</Form.Label>
                                        <Form.Control type="tel" name="funcionario-rg" id="funcionario-rg" required />
                                    </Form.Group>
                                </Row>
                            </fieldset>

                            <fieldset>
                                <legend>Endereço</legend>

                                <Row>
                                    <Form.Group className="mb-3 col-lg-2">
                                        <Form.Label htmlFor="funcionario-cep">CEP*</Form.Label>
                                        <Form.Control type="tel" name="funcionario-cep" id="funcionario-cep"
                                            onInput={this.onInputCep} required />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col">
                                        <Form.Label htmlFor="funcionario-logradouro">Logradouro*</Form.Label>
                                        <Form.Control type="text" name="funcionario-logradouro" id="funcionario-logradouro" defaultValue={address.logradouro} required />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-2">
                                        <Form.Label htmlFor="funcionario-numero">Número*</Form.Label>
                                        <Form.Control type="tel" name="funcionario-numero" id="funcionario-numero"
                                            onInput={(evt) => evt.currentTarget.value = Helpers.Masks.number(evt.currentTarget.value)} required />
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group className="mb-3 col-lg-5">
                                        <Form.Label htmlFor="funcionario-bairro">Bairro*</Form.Label>
                                        <Form.Control type="text" name="funcionario-bairro" id="funcionario-bairro" defaultValue={address.bairro} required />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-5">
                                        <Form.Label htmlFor="funcionario-cidade">Cidade*</Form.Label>
                                        <Form.Control type="text" name="funcionario-cidade" id="funcionario-cidade" defaultValue={address.localidade} required />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-2">
                                        <Form.Label htmlFor="funcionario-estado">Estado*</Form.Label>
                                        <Form.Select name="funcionario-estado" id="funcionario-estado" defaultValue={address.uf} required>
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
                                        <Form.Label htmlFor="funcionario-celular">Celular*</Form.Label>
                                        <Form.Control type="tel" name="funcionario-celular" id="funcionario-celular"
                                            onInput={(evt) => evt.currentTarget.value = Helpers.Masks.celphone(evt.currentTarget.value)} required />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-6">
                                        <Form.Label htmlFor="funcionario-telefone">Telefone</Form.Label>
                                        <Form.Control type="tel" name="funcionario-telefone" id="funcionario-telefone"
                                            onInput={(evt) => evt.currentTarget.value = Helpers.Masks.phone(evt.currentTarget.value)} />
                                    </Form.Group>
                                </Row>
                            </fieldset>

                            <fieldset>
                                <legend>Acesso</legend>

                                <Row>
                                    <Form.Group className="mb-3 col-lg-6">
                                        <Form.Label htmlFor="funcionario-email">E-mail*</Form.Label>
                                        <Form.Control type="email" name="funcionario-email" id="funcionario-email" required />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-6">
                                        <Form.Label htmlFor="funcionario-senha">Senha*</Form.Label>
                                        <Form.Control type="password" name="funcionario-senha" id="funcionario-senha" required />
                                    </Form.Group>
                                </Row>
                            </fieldset>

                            <div className="d-flex justify-content-between">
                                <Link className="btn btn-outline-secondary" to="/painel/funcionarios">Voltar</Link>
                                <Button variant="success" type="submit">Cadastrar</Button>
                            </div>
                        </Form>

                    </Container>
                </main>
            </RestrictedLayout>
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

        this.setState({ formState: "sent" });

        setInterval(() => {
            this.setState({ formState: "idle", redirect: "/painel/funcionarios" });
        }, 3000);

        /* const {setFormData, setRegistrationStage} = this.props;

                    setFormData(new FormData(evt.currentTarget));
                    setRegistrationStage("send"); */
    }
}

export default FormEmployees;