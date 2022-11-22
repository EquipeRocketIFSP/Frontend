import React from "react";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
import Contracts from "../../../contracts/Contracts";
import axios from "axios";
import env from "../../../env";
import Storages from "../../../Storages";
import Enums from "../../../enums/Enums";
import Row from "react-bootstrap/Row";

interface Props {
    id: number,
    fecharModal: () => void
}

interface State {
    data: Contracts.Prontuario | null
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
                    <Modal.Title>Prontuário</Modal.Title>
                </Modal.Header>

                {
                    data ? (
                        <Modal.Body>
                            <label className="col-12"><b>Nome:</b> {data.animal.nome}</label>
                            <label className="col-12"><b>Idade:</b> {data.animal.idade}</label>
                            <label className="col-12"><b>Sexo:</b> {Enums.SexoAnimal[data.animal.sexo]}</label>
                            <label className="col-12"><b>Especie:</b> {data.animal.especie}</label>
                            <label className="col-12"><b>Raça:</b> {data.animal.raca}</label>
                            <label className="col-12"><b>Pelagem:</b> {data.animal.pelagem}</label>
                            <label className="col-12"><b>Veterinário:</b> {data.veterinario}</label>
                            <label className="col-12"><b>Diagnostico:</b> {data.diagnostico}</label>
                            <label className="col-12"><b>Observações:</b> {data.observacoes}</label>

                            <Row>
                                <label className="col-8"><b>Medicamento:</b> {data.medicamento}</label>
                                <label className="col-4">{data.quantidade} {data.medida}</label>
                            </Row>
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
            const {data} = await axios.get<Contracts.Prontuario>(`${env.API}/prontuario/${this.props.id}`,
                {headers: {"Authorization": `Bearer ${Storages.userStorage.get()?.token}`}}
            );

            this.setState({data});
        } catch (e) {
            console.error(e);
        }
    }
}

export default ModalExibirDados;