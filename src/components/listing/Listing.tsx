import React, {ReactNode} from "react";
import Axios from "axios";

import Storages from "../../Storages";
import Alert from "react-bootstrap/esm/Alert";
import Button from "react-bootstrap/esm/Button";

interface Props {
    url: string,
    listItem: React.ClassType<any, any, any>
}

interface State {
    list: any[],
    stage: "idle" | "loading" | "loaded" | "error"
}

class Listing extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            list: [],
            stage: "idle"
        };
    }

    render(): ReactNode {
        const {listItem} = this.props;
        const {list, stage} = this.state;

        return (
            <section>
                {
                    !list.length && stage == "loaded" ?
                        <Alert variant="info" style={{textAlign: "center"}}>Nenhum item cadastrado.</Alert> : <></>
                }

                {
                    stage == "error" ? (
                        <Alert variant="danger" className="d-flex flex-column align-items-center">
                            Não foi possivel recuperar os dados. Tente novamente mais tarde.

                            <Button variant="outline-danger" onClick={() => this.loadItems(1)}>
                                <i className="fa-solid fa-repeat"></i>
                            </Button>
                        </Alert>
                    ) : <></>
                }

                {
                    stage == "loading" ? (
                        <div className="d-flex justify-content-center">
                            <i style={{fontSize: "40px"}} className="fa-solid fa-spinner loading"></i>
                        </div>
                    ) : <></>
                }

                {list.map((item, key) => React.createElement(listItem, {...item, key}))}
            </section>
        );
    }

    componentDidMount(): void {
        this.loadItems(1);
    }

    private loadItems = async (page: number): Promise<void> => {
        try {
            this.setState({stage: "loading"});

            const {data: list} = await Axios.get(`${this.props.url}?page=${page}`, {headers: {"Authorization": `Bearer ${Storages.userStorage.get()?.token}`}});

            this.setState({list, stage: "loaded"});
        } catch (error) {
            this.setState({stage: "error"});
        }
    }
}

export default Listing;