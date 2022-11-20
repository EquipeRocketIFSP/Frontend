import React from "react";
import Container from "react-bootstrap/esm/Container";

import Components from "../../components/Components";
import env from "../../env";
import Layouts from "../../layouts/Layouts";
import ListItemAnimal from "./components/ListItemAnimal";

class Animal extends React.Component {
    render(): React.ReactNode {
        return (
            <Layouts.RestrictedLayout>
                <main id="animais">
                    <Container>
                        <Components.SearchBar setSearch={this.setSearch} toggleTrash={this.toggleTrash} />

                        <Components.Listing url={`${env.API}/animal`} listItem={ListItemAnimal} />
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

export default Animal;