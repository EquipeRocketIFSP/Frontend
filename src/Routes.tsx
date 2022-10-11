import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Views from "./views/Views";

class Routes extends React.Component {
    render(): React.ReactNode {
        return (
            //@ts-ignore
            <BrowserRouter>
                <Route exact path="/" component={Views.Home} />
                <Route exact path="/painel-demo-poc" component={Views.Painel} />
            </BrowserRouter>
        );
    }
}

export default Routes;