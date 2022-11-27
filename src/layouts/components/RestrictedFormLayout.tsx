import React from "react";
import {Link, Navigate} from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Alert from "react-bootstrap/esm/Alert";

import RestrictedLayout from "./RestrictedLayout";
import Contracts from "../../contracts/Contracts";
import DynamicObject = Contracts.DynamicObject;
import Components from "../../components/Components";
import Form from "react-bootstrap/Form";
import Axios, {AxiosError} from "axios";
import env from "../../env";
import Storages from "../../Storages";
import Button from "react-bootstrap/Button";

type FormState = "idle" | "loading" | "error" | "sent";

interface Props extends React.PropsWithChildren {
    title: string,
    apiResource: string,
    redirectResource: string,
    layoutFormContext: LayoutFormContext,
    breadcrumbs: Contracts.Breadcrumbs[],
    style?: React.CSSProperties,
    id?: string,
    className?: string,
    beforeSubmit?: (data: DynamicObject<any>) => void,
}

interface PublicState extends Contracts.Redirect {
    formState: FormState,
    errorMessage: string | null
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
            redirect: null,
            errorMessage: null
        };
    }

    render(): React.ReactNode {
        const {id, className, style, children, breadcrumbs, title, redirectResource} = this.props;
        const {redirect, formState, errorMessage} = this.state;

        if (redirect)
            return <Navigate to={redirect}/>;

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

                    {
                        formState == "error" && errorMessage ?
                            <Container><Alert variant="danger">{errorMessage}</Alert></Container> : <></>
                    }

                    <Container>
                        <Components.Breadcrumbs>
                            {
                                breadcrumbs.map(({name, pathname}) => {
                                    if (!pathname.length)
                                        return <li className="breadcrumb-item active">{name}</li>;

                                    return (
                                        <li className="breadcrumb-item">
                                            <Link to={pathname}>{name}</Link>
                                        </li>
                                    );
                                })
                            }
                        </Components.Breadcrumbs>

                        <h1>{title}</h1>

                        <Form onSubmit={this.onSubmit}>
                            {children}

                            <div className="d-flex justify-content-between">
                                <Link className="btn btn-outline-secondary" to={redirectResource}>Voltar</Link>
                                <Button variant="success" type="submit">Finalizar</Button>
                            </div>
                        </Form>
                    </Container>
                </main>
            </RestrictedLayout>
        );
    }

    componentDidMount(): void {
        this.props.layoutFormContext.state = this.setPublicState;
    }

    private onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const {beforeSubmit, apiResource, redirectResource} = this.props;
        let data: Contracts.DynamicObject<any> = {};

        new FormData(evt.currentTarget).forEach((value, key) => data[key] = value.toString());

        if (beforeSubmit)
            beforeSubmit(data);

        try {
            await Axios.post(`${env.API}/${apiResource}`, data, {
                headers: {"Authorization": `Bearer ${Storages.userStorage.get()?.token}`}
            });

            this.setState({formState: "sent", redirect: null, errorMessage: null});
            Storages.referrerStorage.truncate();

            setInterval(() => {
                this.setState({formState: "idle", redirect: redirectResource, errorMessage: null});
            }, 3000);
        } catch (error) {
            const status = (error as AxiosError).response?.status;

            switch (status) {
                case 401:
                    this.setState({
                        formState: "error",
                        redirect: null,
                        errorMessage: "Usuário não autenticado."
                    });
                    break;

                default:
                    this.setState({
                        formState: "error",
                        redirect: null,
                        errorMessage: "Não foi possivel concluir esse cadastro. Por favor tente mais tarde."
                    });
                    break;
            }
        }
    }

    private setPublicState = (state: PublicState): void => this.setState(state);

    public static createLayoutFormContext = (): LayoutFormContext => ({state: (state: State) => null});
}

export default RestrictedFormLayout;