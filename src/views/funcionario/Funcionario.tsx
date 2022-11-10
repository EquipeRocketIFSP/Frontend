import React from "react";
import Container from "react-bootstrap/esm/Container";

import Components from "../../components/Components";
import Layouts from "../../layouts/Layouts";
import env from "../../env";
import Contracts from "../../contracts/Contracts";
import ListItemEmployee from "./components/ListItemEmployee";

class Funcionario extends React.Component {
    render(): React.ReactNode {
        return (
            <Layouts.RestrictedLayout>
                <main id="funcionarios">
                    <Container>
                        <Components.SearchBar setSearch={this.setSearch} toggleTrash={this.toggleTrash} />

                        <Components.Listing url={`${env.API}/cadastro-funcionario`} listItem={ListItemEmployee} />
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

export default Funcionario;