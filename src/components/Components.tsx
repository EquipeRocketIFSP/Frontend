import NavbarComponent from "./navbar/Navbar";
import FullbannerComponent from "./fullbanner/Fullbanner";

namespace Components {
    export const Navbar = NavbarComponent;
    export const Fullbanner = FullbannerComponent;

    export type Navbar = NavbarComponent;
    export type Fullbanner = FullbannerComponent;
}

export default Components;