import React, { ReactNode } from "react";
import Axios from "axios";

import Storages from "../../Storages";

interface Props {
    url: string,
    listItem: React.ClassType<any, any, any>
}

interface State {
    list: any[]
}

class Listing extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);

        this.state = {
            list: [],
        };
    }

    render(): ReactNode {
        const { listItem } = this.props;
        const { list } = this.state;

        return (
            <section>
                {list.map((item, key) => React.createElement(listItem, { ...item, key }))}
            </section>
        );
    }

    componentDidMount(): void {
        this.loadItems(1);
    }

    private loadItems = async (page: number): Promise<void> => {
        try {
            const { data: list } = await Axios.get(`${this.props.url}?page=${page}`, { headers: { "Authorization": `Bearer ${Storages.userStorage.get()?.token}` } });

            this.setState({ list });
        } catch (error) {
            console.error(error);
        }
    }
}

export default Listing;