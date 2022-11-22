import React from "react";
import Layouts from "../../layouts/Layouts";
import Container from "react-bootstrap/Container";
import Components from "../../components/Components";
import env from "../../env";
import ListItemProntuario from "./components/ListItemProntuario";
import ModalExibirDados from "../prontuario/components/ModalExibirDados";

interface State {
    recurso: number | null
}

class Prontuario extends React.Component<any, State> {
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
                <main id="prontuario">
                    <Container>
                        <Components.SearchBar setSearch={() => {
                        }} toggleTrash={() => {
                        }}/>

                        <Components.Listing url={`${env.API}/prontuario`} listItem={ListItemProntuario}
                                            exibirModalDados={(id) => this.setState({recurso: id})}/>
                    </Container>
                </main>

                {recurso ? <ModalExibirDados id={recurso} fecharModal={() => this.setState({recurso: null})}/> : <></>}
            </Layouts.RestrictedLayout>
        );
    }
}

export default Prontuario;