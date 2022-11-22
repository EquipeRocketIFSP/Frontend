import React from "react";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import {Link} from "react-router-dom";

import Contracts from "../../../contracts/Contracts";

interface Props extends Contracts.ListingDataAgendamento {
    exibirModalDados?: (id: number) => void
}

class ListItemAgendamento extends React.Component<Props> {
    render(): React.ReactNode {
        const {id, tipoConsulta, dataConsulta, exibirModalDados} = this.props;

        return (
            <Row className="shadow rounded mb-3 align-items-center">
                <Row className="col-md-10" style={{cursor: "pointer"}}
                     onClick={() => exibirModalDados ? exibirModalDados(id) : null}>
                    <div className="col-md-2">{id}</div>
                    <div className="col-md-8">{tipoConsulta}</div>
                    <div className="col-md-2">{new Date(dataConsulta).toLocaleString("pt")}</div>
                </Row>

                <div className="col-md-2" style={{opacity:"0",pointerEvents:"none"}}>
                    <Link to="editar/" className="btn">
                        <i className="fa-regular fa-pen-to-square"></i>
                    </Link>

                    <Button variant="">
                        <i className="fa-regular fa-trash"></i>
                    </Button>
                </div>
            </Row>
        );
    }
}

export default ListItemAgendamento;