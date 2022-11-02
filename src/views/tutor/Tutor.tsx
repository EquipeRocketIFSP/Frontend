import React from "react";
import Container from "react-bootstrap/esm/Container";
import Components from "../../components/Components";
import env from "../../env";
import Layouts from "../../layouts/Layouts";
import ListItemTutor from "./components/ListItemTutor";

class Tutor extends React.Component {
    render(): React.ReactNode {
        return (
            <Layouts.RestrictedLayout>
                <main id="tutores">
                    <Container>
                        <Components.SearchBar setSearch={this.setSearch} toggleTrash={this.toggleTrash} />

                        <Components.Listing url={`${env.API}/cadastro-tutor`} listItem={ListItemTutor} />
                    </Container>
                </main>
            </Layouts.RestrictedLayout>
        );
    }

    private setSearch = (search: string | null): void => {

    }

    private toggleTrash = (): void => {

    }
}

export default Tutor;