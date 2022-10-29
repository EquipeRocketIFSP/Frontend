import React from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { Navigate } from "react-router-dom";

import Layouts from "../../layouts/Layouts";
import Contracts from "../../contracts/Contracts";

import FormClinic from "./components/FormClinic";
import FormOwner from "./components/FormOwner";
import FormTechnician from "./components/FormTechnician";

import "./signin.scss";

type RegistrationStage = "clinic" | "owner" | "technician" | "send";

interface State extends Contracts.Redirect {
    registrationStage: RegistrationStage,
    formStage: "idle" | "loading" | "sent" | "error",
    clinicForm: FormData,
    ownerForm: FormData,
    technicianForm: FormData,
}

class SignIn extends React.Component<any, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            registrationStage: "clinic",
            formStage: "idle",
            redirect: null,
            clinicForm: new FormData(),
            ownerForm: new FormData(),
            technicianForm: new FormData(),
        };
    }

    render(): React.ReactNode {
        const { registrationStage, formStage, redirect } = this.state;

        if (redirect)
            return <Navigate to={redirect} />;

        return (
            <Layouts.Layout>
                <Container>
                    <main id="cadastro-inicial">
                        {
                            formStage == "sent" ?
                                (
                                    <>
                                        <Alert variant="success">Cadastro concluído com sucesso.</Alert>
                                    </>
                                ) :
                                (
                                    <>
                                        <FormClinic setRegistrationStage={this.setRegistrationStage} setFormData={this.setClinicFormData} fadeIn={registrationStage == "clinic"} />
                                        <FormOwner setRegistrationStage={this.setRegistrationStage} setFormData={this.setOwnerFormData} fadeIn={registrationStage == "owner"} />
                                        <FormTechnician setRegistrationStage={this.setRegistrationStage} setFormData={this.setTechnicianFormData} fadeIn={registrationStage == "technician"} />
                                    </>
                                )
                        }
                    </main>
                </Container>
            </Layouts.Layout>
        );
    }

    componentDidUpdate(): void {
        this.sendForm();
    }

    private setRegistrationStage = (registrationStage: RegistrationStage): void => this.setState({ registrationStage });

    private setClinicFormData = (formData: FormData): void => this.setState({ clinicForm: formData });
    private setOwnerFormData = (formData: FormData): void => this.setState({ ownerForm: formData });
    private setTechnicianFormData = (formData: FormData): void => this.setState({ technicianForm: formData });

    private sendForm = async (): Promise<void> => {
        const { clinicForm, ownerForm, technicianForm, registrationStage, formStage } = this.state;

        if (registrationStage != "send" || formStage == "sent")
            return;

        let data: Contracts.DynamicObject<string> = {};

        clinicForm.forEach((value, key) => {
            data[key] = value.toString();
        });

        ownerForm.forEach((value, key) => {
            data[key] = value.toString();
        });

        technicianForm.forEach((value, key) => {
            data[key] = value.toString();
        });

        this.setState({ formStage: "sent" });

        setTimeout(() => this.setState({ redirect: "/" }), 3000);
    }
}

export default SignIn;
export type { RegistrationStage };