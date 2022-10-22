import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Axios from "axios";

import env from "./../../env";
import Contracts from "../../contracts/Contracts";
import Storages from "../../Storages";
import { Navigate } from "react-router-dom";

interface Props {
    hideLoginModal: () => void,
}

interface State extends Contracts.Redirect {
    errorMessage: null | string,
    submitButtonStatus: "Idle" | "Loading"
}

class Login extends React.Component<Props, State> {
    private formRef: React.RefObject<HTMLFormElement>;

    constructor(props: Props) {
        super(props);

        this.state = {
            errorMessage: null,
            submitButtonStatus: "Idle",
            redirect: null
        };

        this.formRef = React.createRef<HTMLFormElement>();
    }

    render(): React.ReactNode {
        const { hideLoginModal } = this.props;
        const { errorMessage, submitButtonStatus, redirect } = this.state;

        if (redirect)
            return <Navigate to={redirect} />;

        return (
            <Modal show onHide={hideLoginModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Acessar Conta</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {
                        errorMessage ?
                            (
                                <Alert variant="danger">
                                    {errorMessage}
                                </Alert>
                            ) : <></>
                    }

                    <Form ref={this.formRef} onSubmit={this.onSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">E-mail</Form.Label>
                            <Form.Control type="email" name="email" id="email" autoFocus required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="password">Senha</Form.Label>
                            <Form.Control type="password" name="password" id="password" required />
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={hideLoginModal}>
                                Cancelar
                            </Button>

                            <Button variant="primary" type="submit" className={submitButtonStatus == "Loading" ? "disabled" : ""}>
                                {submitButtonStatus == "Idle" ? "Entrar" : (<i className="fa-solid fa-spinner loading"></i>)}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }

    private onSubmit = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
        evt.preventDefault();

        this.setState({ submitButtonStatus: "Loading" });

        let formData: Contracts.DynamicObject<string> = {};

        new FormData(evt.currentTarget).forEach((value, key) => {
            formData[key] = value.toString();
        });

        try {
            const { data } = await Axios.post<Contracts.UserData>(`${env.API}/auth`, formData);

            Storages.userStorage.set(data);

            this.setState({ redirect: "/painel" });
        } catch (error) {
            console.error(error);

            this.setState({ errorMessage: "Não foi possivel acessar o sistema. Por favor tente mais tarde." });
        }

        this.setState({ submitButtonStatus: "Idle" });
    }
}

export default Login;