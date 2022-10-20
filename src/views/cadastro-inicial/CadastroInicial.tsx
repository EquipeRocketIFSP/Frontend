import React from "react";
import FormClinica from "./components/FormClinica";

import "./cadastro-inicial.scss";

interface State { }

class CadastroInicial extends React.Component<any, State> {
    constructor(props: any) {
        super(props);

        this.state = {
        };
    }

    render(): React.ReactNode {
        return (
            <>
                <FormClinica />
            </>
        );
    }
}

export default CadastroInicial;