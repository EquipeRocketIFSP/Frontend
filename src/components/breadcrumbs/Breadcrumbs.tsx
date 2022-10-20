import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

import "./breadcrumbs.scss";

class Breadcrumbs extends React.Component<React.PropsWithChildren>{
    render(): React.ReactNode {
        return (
            <Breadcrumb className="breadcrumbs">
                {this.props.children}
            </Breadcrumb>
        );
    }
}

export default Breadcrumbs;