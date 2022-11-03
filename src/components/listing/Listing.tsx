import React, { ReactNode } from "react";
import Axios from "axios";

import Storages from "../../Storages";
import Alert from "react-bootstrap/esm/Alert";

interface Props {
    url: string,
    listItem: React.ClassType<any, any, any>
}

interface State {
    list: any[],
    stage: "idle" | "loading" | "loaded"
}

class Listing extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);

        this.state = {
            list: [],
            stage: "idle"
        };
    }

    render(): ReactNode {
        const { listItem } = this.props;
        const { list, stage } = this.state;

        return (
            <section>
                {!list.length && stage == "loaded" ? <Alert variant="info" style={{ textAlign: "center" }}>Nenhum item cadastrado.</Alert> : <></>}

                {
                    stage == "loading" ? (
                        <div className="d-flex justify-content-center">
                            <i style={{ fontSize: "40px" }} className="fa-solid fa-spinner loading"></i>
                        </div>
                    ) : <></>
                }

                {list.map((item, key) => React.createElement(listItem, { ...item, key }))}
            </section>
        );
    }

    componentDidMount(): void {
        this.loadItems(1);
    }

    private loadItems = async (page: number): Promise<void> => {
        try {
            this.setState({ stage: "loading" });

            const { data: list } = await Axios.get(`${this.props.url}?page=${page}`, { headers: { "Authorization": `Bearer ${Storages.userStorage.get()?.token}` } });

            this.setState({ list, stage: "loaded" });
        } catch (error) {
            console.error(error);
        }
    }
}

export default Listing;