import React from "react";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import { Link } from "react-router-dom";

import Contracts from "../../../contracts/Contracts";

interface Props extends Contracts.Tutor { }

class ListItemTutor extends React.Component<Props> {
    render(): React.ReactNode {
        const {nome}=this.props;

        return (
            <Row className="shadow rounded mb-3 align-items-center">
                <Row className="col-md-10">
                    <div className="col-md-2">1</div>
                    <div className="col-md-10">{nome}</div>
                </Row>

                <div className="col-md-2">
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

export default ListItemTutor;