import React from "react";

import Components from "../components/Components";

interface State {
    modals: {
        showLogin: boolean,
        showSignin: boolean
    }
}

class Layout extends React.Component<React.PropsWithChildren, State> {
    constructor(props: React.PropsWithChildren) {
        super(props);

        this.state = {
            modals: {
                showLogin: false,
                showSignin: false
            }
        };
    }

    render(): React.ReactNode {
        const { modals } = this.state;

        return (
            <>
                <Components.Navbar showLoginModal={this.showLoginModal} />

                {this.props.children}

                {modals.showLogin ? <Components.Login hideLoginModal={this.hideLoginModal} /> : <></>}
            </>
        );
    }

    private showLoginModal = (): void => {
        const { modals } = this.state;

        this.setState({ modals: { ...modals, showLogin: true } });
    }

    private hideLoginModal = (): void => {
        const { modals } = this.state;

        this.setState({ modals: { ...modals, showLogin: false } });
    }
}

export default Layout;