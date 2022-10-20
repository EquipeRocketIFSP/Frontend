import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Axios from "axios";
//import { Redirect } from "react-router-dom";

import Contracts from "../../contracts/Contracts";
import Storages from "../../Storages";

interface Props {
    hideSigninModal: () => void,
}

interface State {
    errorMessage: null | string,
    submitButtonStatus: "Idle" | "Loading",
    redirect: boolean
}

class Signin extends React.Component<Props, State> {
    private formRef: React.RefObject<HTMLFormElement>;

    constructor(props: Props) {
        super(props);

        this.state = {
            errorMessage: null,
            submitButtonStatus: "Idle",
            redirect: false
        };

        this.formRef = React.createRef<HTMLFormElement>();
    }

    render(): React.ReactNode {
        const { hideSigninModal } = this.props;
        const { errorMessage, submitButtonStatus, redirect } = this.state;

        return (
            <Modal show onHide={hideSigninModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Criar Conta</Modal.Title>
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

                    <Form ref={this.formRef}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">E-mail</Form.Label>
                            <Form.Control type="email" name="email" id="email" autoFocus required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="password">Senha</Form.Label>
                            <Form.Control type="password" name="password" id="password" required />
                        </Form.Group>
                    </Form>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={hideSigninModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit" onClick={this.onClickSubmit} className={submitButtonStatus == "Loading" ? "disabled" : ""}>
                        {submitButtonStatus == "Idle" ? "Entrar" : (<i className="fa-solid fa-spinner loading"></i>)}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    private onClickSubmit = async (): Promise<void> => {
        if (!this.formRef.current)
            return;

        this.setState({ submitButtonStatus: "Loading" });

        const formData = new FormData(this.formRef.current);

        try {
            await Axios.post("http://backend-poc.us-east-1.elasticbeanstalk.com:8080/login/create", { username: formData.get("email"), password: formData.get("password") });
            const { data } = await Axios.post<Contracts.UserData | string>("http://backend-poc.us-east-1.elasticbeanstalk.com:8080/login", { username: formData.get("email"), password: formData.get("password") });

            if (typeof data == "string") {
                this.setState({ errorMessage: "Senha e/ou e-mail invalidos.", submitButtonStatus: "Idle" });
                return;
            }

            const { id, username } = data;

            Storages.userStorage.set({ id, username });

            this.setState({ redirect: true });
            window.location.assign("/painel-demo-poc");
        } catch (error) {
            console.error(error);

            this.setState({ errorMessage: "Não foi possivel acessar o sistema. Por favor tente mais tarde." });
        }

        this.setState({ submitButtonStatus: "Idle" });
    }
}

export default Signin;