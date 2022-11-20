import React from "react";
import Container from "react-bootstrap/esm/Container";
import Components from "../../components/Components";
import Layouts from "../../layouts/Layouts";
import env from "../../env";
import ListItemAgendamento from "./components/ListItemAgendamento";

class Agendamento extends React.Component {
    render(): React.ReactNode {
        return (
            <Layouts.RestrictedLayout>
                <main id="agendamento">
                    <Container>
                        <Components.SearchBar setSearch={this.setSearch} toggleTrash={this.toggleTrash} />

                        <Components.Listing url={`${env.API}/agendamento`} listItem={ListItemAgendamento} />
                    </Container>
                </main>
            </Layouts.RestrictedLayout>
        );
    }

    private setSearch = (search: string | null): void => {

    }

    private loadItems = async (page: number): Promise<void> => {

    }

    private toggleTrash = (): void => {

    }
}

export default Agendamento;