import React from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { Navigate } from "react-router-dom";
import Axios from "axios";

import Layouts from "../../layouts/Layouts";
import Contracts from "../../contracts/Contracts";

import FormClinic from "./components/FormClinic";
import FormOwner from "./components/FormOwner";
import FormTechnician, { DefaultFormDataTechnician } from "./components/FormTechnician";
import env from "../../env";

import "./signin.scss";

type RegistrationStage = "clinic" | "owner" | "technician" | "send";

interface State extends Contracts.Redirect {
    registrationStage: RegistrationStage,
    formStage: "idle" | "loading" | "sent" | "error",
    clinicForm: FormData,
    ownerForm: FormData,
    technicianForm: FormData,
    defaultTechnicianFormData: DefaultFormDataTechnician | null
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
            defaultTechnicianFormData: null
        };
    }

    render(): React.ReactNode {
        const { registrationStage, formStage, redirect, defaultTechnicianFormData } = this.state;

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
                                        {formStage == "error" ? <Alert variant="danger">Não foi possivel concluir o cadastro. Tente novamente mais tarde.</Alert> : <></>}

                                        <FormClinic
                                            setRegistrationStage={this.setRegistrationStage}
                                            setFormData={this.setClinicFormData}
                                            fadeIn={registrationStage == "clinic"}
                                        />

                                        <FormOwner
                                            setRegistrationStage={this.setRegistrationStage}
                                            setFormData={this.setOwnerFormData}
                                            fadeIn={registrationStage == "owner"}
                                        />

                                        <FormTechnician
                                            setRegistrationStage={this.setRegistrationStage}
                                            setFormData={this.setTechnicianFormData}
                                            fadeIn={registrationStage == "technician"}
                                            defaultTechnicianFormData={defaultTechnicianFormData}
                                        />
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
        window.scrollTo({ top: 0, left: 0 });
    }

    private setRegistrationStage = (registrationStage: RegistrationStage): void => this.setState({ registrationStage });

    private setClinicFormData = (formData: FormData): void => this.setState({ clinicForm: formData });
    private setOwnerFormData = (formData: FormData, defaultTechnicianFormData: DefaultFormDataTechnician | null): void => this.setState({ ownerForm: formData, defaultTechnicianFormData });
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

        try {
            await Axios.post(`${env.API}/cadastro/clinica`, data);

            this.setState({ formStage: "sent" });
            setTimeout(() => this.setState({ redirect: "/" }), 3000);
        }

        catch (error) {
            this.setState({ formStage: "error", registrationStage: "technician" });
            window.scrollTo(0, 0);
        }
    }
}

export default SignIn;
export type { RegistrationStage };