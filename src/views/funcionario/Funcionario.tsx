import React from "react";
import Container from "react-bootstrap/esm/Container";

import Components from "../../components/Components";
import Layouts from "../../layouts/Layouts";
import env from "../../env";
import Contracts from "../../contracts/Contracts";
import ModalExibirDados from "./components/ModalExibirDados";

interface State {
    recurso: number | null
}

class Funcionario extends React.Component <any, State> {
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
                <main id="funcionarios">
                    <Container>
                        <Components.SearchBar setSearch={this.setSearch} toggleTrash={this.toggleTrash}/>

                        <Components.Listing url={`${env.API}/funcionario`}
                                            exibirModalDados={(id: number) => this.setState({recurso: id})}/>
                    </Container>
                </main>

                {recurso ? <ModalExibirDados id={recurso} fecharModal={() => this.setState({recurso: null})}/> : <></>}
            </Layouts.RestrictedLayout>
        );
    }

    private setSearch = (search: string | null): void => {

    }

    private toggleTrash = (): void => {

    }
}

export default Funcionario;