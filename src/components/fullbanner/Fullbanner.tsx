import React from "react";

import "./fullbanner.scss";

interface Props extends React.PropsWithChildren {
    src: string,
    alt: string
}

class Fullbanner extends React.Component<Props>{
    render(): React.ReactNode {
        const { src, alt, children } = this.props;

        return (
            <div className="fullbanner">
                <img src={src} alt={alt} loading="lazy" />

                <div className="description d-flex justify-content-center align-items-center flex-column">
                    {children}
                </div>
            </div>
        );
    }
}

export default Fullbanner;