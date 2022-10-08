import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface Props {
    hideLoginModal: () => void,
}

class Login extends React.Component<Props> {
    render(): React.ReactNode {
        const { hideLoginModal } = this.props;

        return (
            <Modal show onHide={hideLoginModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Acessar Conta</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={this.onSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">E-mail</Form.Label>
                            <Form.Control type="email" name="email" id="email" autoFocus />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="password">Senha</Form.Label>
                            <Form.Control type="password" name="password" id="password" />
                        </Form.Group>
                    </Form>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={hideLoginModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary">
                        Entrar
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    private onSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
        evt.preventDefault();
    }
}

export default Login;