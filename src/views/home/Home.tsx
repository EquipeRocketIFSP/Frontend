import React from "react";
import Button from "react-bootstrap/Button";

import Components from "../../components/Components";
import Layout from "../Layout";

import fullbanner from "./../../fullbanner.jpg";

class Home extends React.Component {
    render(): React.ReactNode {
        return (
            <Layout>
                <main>
                    <Components.Fullbanner src={fullbanner} alt="Fullbanner">
                        <h2 style={{ textAlign: "center" }}>What is Lorem Ipsum?</h2>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>

                        <Button>Criar Conta</Button>
                    </Components.Fullbanner>
                </main>
            </Layout>
        );
    }
}

export default Home;