import React from "react";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
//import { Redirect } from "react-router-dom";
import Contracts from "../../contracts/Contracts";
import LocalStorage from "../../helpers/LocalStorage";

import Layout from "../Layout";

import "./painel.scss";

class Painel extends React.Component {
    private storage: LocalStorage<Contracts.UserData>;

    constructor(props: any) {
        super(props);

        this.storage = new LocalStorage<Contracts.UserData>("UserData");

        if (!this.storage.get())
            window.location.assign("/");
    }

    render(): React.ReactNode {
        const userData = this.storage.get();

        if (!userData)
            return <></>;

        return (
            <Layout>
                <main id="painel">
                    <Container>
                        <Alert variant="success">
                            <Alert.Heading>Seja bem-vindo, {userData.username}</Alert.Heading>
                        </Alert>
                    </Container>
                </main>
            </Layout>
        );
    }
}

export default Painel;