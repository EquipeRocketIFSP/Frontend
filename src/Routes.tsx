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
                    <Route path="/painel" element={<Views.Painel />} />

                    <Route path="/painel/funcionarios" element={<Views.Employees.Page />} />
                    <Route path="/painel/funcionarios/adicionar" element={<Views.Employees.Form />} />

                    <Route path="/painel/agenda" element={<Views.Schedule.Page />} />
                    <Route path="/painel/agenda/adicionar" element={<Views.Schedule.Form />} />
                </RouterRoutes>
            </BrowserRouter>
        );
    }
}

export default Routes;