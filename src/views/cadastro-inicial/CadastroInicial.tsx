import React from "react";
import Container from "react-bootstrap/Container";

import FormClinic from "./components/FormClinic";
import FormOwner from "./components/FormOwner";

import "./cadastro-inicial.scss";
import Layout from "../Layout";
import FormTechnician from "./components/FormTechnician";

type RegistrationStage = "clinic" | "owner" | "technician";

interface State {
    registrationStage: RegistrationStage
}

class CadastroInicial extends React.Component<any, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            registrationStage: "clinic"
        };
    }

    render(): React.ReactNode {
        const { registrationStage } = this.state;

        return (
            <Layout>
                <Container>
                    <main id="cadastro-inicial">
                        <FormClinic setRegistrationStage={this.setRegistrationStage} fadeIn={registrationStage == "clinic"} />
                        <FormOwner setRegistrationStage={this.setRegistrationStage} fadeIn={registrationStage == "owner"} />
                        <FormTechnician setRegistrationStage={this.setRegistrationStage} fadeIn={registrationStage == "technician"} />
                    </main>
                </Container>
            </Layout>
        );
    }

    private setRegistrationStage = (registrationStage: RegistrationStage): void => this.setState({ registrationStage });
}

export default CadastroInicial;
export type { RegistrationStage };