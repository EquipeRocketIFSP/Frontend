import NavbarComponent from "./navbar/Navbar";
import FullbannerComponent from "./fullbanner/Fullbanner";
import LoginComponent from "./login/Login";

namespace Components {
    export const Navbar = NavbarComponent;
    export const Fullbanner = FullbannerComponent;
    export const Login = LoginComponent;

    export type Navbar = NavbarComponent;
    export type Fullbanner = FullbannerComponent;
    export type Login = LoginComponent;
}

export default Components;