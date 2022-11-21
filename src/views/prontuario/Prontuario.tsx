import React from "react";
import Layouts from "../../layouts/Layouts";
import Container from "react-bootstrap/Container";
import Components from "../../components/Components";
import env from "../../env";

class Prontuario extends React.Component<any, any> {
    render(): React.ReactNode {
        return (
            <Layouts.RestrictedLayout>
                <main id="prontuario">
                    <Container>
                        <Components.SearchBar setSearch={()=>{}} toggleTrash={()=>{}}/>

                        <Components.Listing url={`${env.API}/cadastro-prontuario`} />
                    </Container>
                </main>
            </Layouts.RestrictedLayout>
        );
    }
}

export default Prontuario;