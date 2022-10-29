import React from "react";
import { Navigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Alert from "react-bootstrap/esm/Alert";

import RestrictedLayout from "./RestrictedLayout";
import Contracts from "../../contracts/Contracts";

type FormState = "idle" | "sent";

interface Props extends React.PropsWithChildren {
    style?: React.CSSProperties,
    id?: string,
    className?: string,
    layoutFormContext: LayoutFormContext
}

interface PublicState extends Contracts.Redirect {
    formState: FormState
}

interface State extends PublicState {

}

export interface LayoutFormContext {
    state: (state: PublicState) => void
}

class RestrictedFormLayout extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            formState: "idle",
            redirect: null
        };
    }

    render(): React.ReactNode {
        const { id, className, style, children } = this.props;
        const { redirect, formState } = this.state;

        if (redirect)
            return <Navigate to={redirect} />;

        if (formState == "sent") {
            return (
                <RestrictedLayout>
                    <main id={id} className={className} style={style}>
                        <Container>
                            <Alert variant="success">Dados cadastrados com sucesso.</Alert>
                        </Container>
                    </main>
                </RestrictedLayout>
            );
        }

        return (
            <RestrictedLayout>
                <main id={id} className={className} style={style}>
                    {children}
                </main>
            </RestrictedLayout>
        );
    }

    componentDidMount(): void {
        this.props.layoutFormContext.state = this.setPublicState;
    }

    private setPublicState = (state: PublicState): void => this.setState(state);

    public static createLayoutFormContext = (): LayoutFormContext => ({ state: (state: State) => null });
}

export default RestrictedFormLayout;