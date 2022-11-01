import React from "react";
import Container from "react-bootstrap/esm/Container";
import Axios from "axios";

import Components from "../../components/Components";
import Layouts from "../../layouts/Layouts";
import env from "../../env";
import Storages from "../../Storages";
import Contracts from "../../contracts/Contracts";

interface State {
    employees: Contracts.Employees[]
}

class Employees extends React.Component<any, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            employees: []
        };
    }

    render(): React.ReactNode {
        const { employees } = this.state;

        return (
            <Layouts.RestrictedLayout>
                <main id="funcionarios">
                    <Container>
                        <Components.SearchBar setSearch={this.setSearch} toggleTrash={this.toggleTrash} loadItems={this.loadItems} />

                        <section>
                           
                        </section>
                    </Container>
                </main>
            </Layouts.RestrictedLayout>
        );
    }

    componentDidMount(): void {
        this.loadItems(1);
    }

    private setSearch = (search: string | null): void => {

    }

    private loadItems = async (page: number): Promise<void> => {
        try {
            const { data } = await Axios.get(`${env.API}/cadastro-funcionario`, { headers: { "Authorization": `Bearer ${Storages.userStorage.get()?.token}` } });
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    private toggleTrash = (): void => {

    }
}

export default Employees;