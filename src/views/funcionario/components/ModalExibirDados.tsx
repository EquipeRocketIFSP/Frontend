import React from "react";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
import Contracts from "../../../contracts/Contracts";
import axios from "axios";
import env from "../../../env";
import Storages from "../../../Storages";

interface Props {
    id: number,
    fecharModal: () => void
}

interface State {
    data: Contracts.Funcionario | null
}

class ModalExibirDados extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            data: null
        };
    }

    render() {
        const {data} = this.state;

        return (
            <Modal show onHide={this.props.fecharModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Funcionário</Modal.Title>
                </Modal.Header>

                {
                    data ? (
                        <Modal.Body>
                            <label className="col-12"><b>Nome:</b> {data.nome}</label>
                            <label className="col-12"><b>E-mail:</b> {data.email}</label>
                            {data.crmv ? <label className="col-12"><b>CRMV:</b> {data.crmv}</label> : <></>}
                            <label className="col-12"><b>Logradouro:</b> {data.logradouro}</label>
                            <label className="col-12"><b>Número:</b> {data.numero}</label>
                            <label className="col-12"><b>CEP:</b> {data.cep}</label>
                            <label className="col-12"><b>Bairro:</b> {data.bairro}</label>
                            <label className="col-12"><b>Cidade:</b> {data.cidade}</label>
                            <label className="col-12"><b>Estado:</b> {data.estado}</label>
                            <label className="col-12"><b>CPF:</b> {data.cpf}</label>
                            <label className="col-12"><b>RG:</b> {data.rg}</label>
                            <label className="col-12"><b>Celular:</b> {data.celular}</label>
                            {data.telefone ? <label className="col-12"><b>Telefone:</b> {data.telefone}</label> : <></>}
                        </Modal.Body>
                    ) : <></>
                }

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.fecharModal}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    componentDidMount() {
        this.carregarDados();
    }

    private carregarDados = async () => {
        try {
            const {data} = await axios.get<Contracts.Funcionario>(`${env.API}/funcionario/${this.props.id}`,
                {headers: {"Authorization": `Bearer ${Storages.userStorage.get()?.token}`}}
            );

            this.setState({data});
        } catch (e) {
            console.error(e);
        }
    }
}

export default ModalExibirDados;