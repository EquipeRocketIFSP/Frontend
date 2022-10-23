import React from "react";

import Components from "../components/Components";
import Layout from "./Layout";
import Storages from "../Storages";
import { Navigate } from "react-router-dom";

class RestrictedLayout extends React.Component<React.PropsWithChildren> {
    render(): React.ReactNode {
        const userData = Storages.userStorage.get();

        if (!userData?.token.length)
            return <Navigate to="/" />;

        return (
            <Layout>
                {this.props.children}
            </Layout>
        );
    }
}

export default RestrictedLayout;