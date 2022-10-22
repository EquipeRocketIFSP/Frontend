import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import Views from "./views/Views";

class Routes extends React.Component {
    render(): React.ReactNode {
        return (
            <BrowserRouter>
                <RouterRoutes>
                    <Route path="/" element={<Views.Home />} />
                    <Route path="/cadastro-inicial" element={<Views.SignIn />} />
                </RouterRoutes>
            </BrowserRouter>
        );
    }
}

export default Routes;