import React from "react";
import Container from "react-bootstrap/esm/Container";
import Components from "../../components/Components";
import Layouts from "../../layouts/Layouts";
import env from "../../env";
import ListItemAgendamento from "./components/ListItemAgendamento";
import ModalExibirDados from "../agendamento/components/ModalExibirDados";

interface State {
    recurso: number | null
}

class Agendamento extends React.Component<any, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            recurso: null
        };
    }

    render(): React.ReactNode {
        const {recurso} = this.state;

        return (
            <Layouts.RestrictedLayout>
                <main id="agendamento">
                    <Container>
                        <Components.SearchBar setSearch={this.setSearch} toggleTrash={this.toggleTrash}/>

                        <Components.Listing url={`${env.API}/agendamento`} listItem={ListItemAgendamento}
                                            exibirModalDados={(id: number) => this.setState({recurso: id})}/>
                    </Container>
                </main>

                {recurso ? <ModalExibirDados id={recurso} fecharModal={() => this.setState({recurso: null})}/> : <></>}
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