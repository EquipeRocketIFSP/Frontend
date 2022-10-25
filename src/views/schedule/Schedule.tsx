import React from "react";
import Container from "react-bootstrap/esm/Container";
import Components from "../../components/Components";
import RestrictedLayout from "../RestrictedLayout";

class Schedule extends React.Component {
    render(): React.ReactNode {
        return (
            <RestrictedLayout>
                <main id="funcionarios">
                    <Container>
                        <Components.SearchBar setSearch={this.setSearch} toggleTrash={this.toggleTrash} loadItems={this.loadItems} />
                    </Container>
                </main>
            </RestrictedLayout>
        );
    }

    private setSearch = (search: string | null): void => {

    }

    private loadItems = async (page: number): Promise<void> => {

    }

    private toggleTrash = (): void => {

    }
}

export default Schedule;