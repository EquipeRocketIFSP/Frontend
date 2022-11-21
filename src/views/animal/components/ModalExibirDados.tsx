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
    data: Contracts.Animal | null
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
                    <Modal.Title>Animal</Modal.Title>
                </Modal.Header>

                {
                    data ? (
                        <Modal.Body>
                            <label className="col-12"><b>Nome:</b> {data.nome}</label>
                            <label className="col-12"><b>Idade:</b> {data.idade} anos</label>
                            {/*<label className="col-12"><b>Sexo:</b> {data.sexo}</label>*/}
                            <label className="col-12"><b>Especie:</b> {data.especie}</label>
                            <label className="col-12"><b>Raça:</b> {data.raca}</label>
                            <label className="col-12"><b>Pelagem:</b> {data.pelagem}</label>
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
            const {data} = await axios.get<Contracts.Animal>(`${env.API}/animal/${this.props.id}`,
                {headers: {"Authorization": `Bearer ${Storages.userStorage.get()?.token}`}}
            );

            this.setState({data});
        } catch (e) {
            console.error(e);
        }
    }
}

export default ModalExibirDados;