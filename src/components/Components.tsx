import NavbarComponent from "./navbar/Navbar";
import FullbannerComponent from "./fullbanner/Fullbanner";
import LoginComponent from "./login/Login";
import SigninComponent from "./signin/Signin";

namespace Components {
    export const Navbar = NavbarComponent;
    export const Fullbanner = FullbannerComponent;
    export const Login = LoginComponent;
    export const Signin = SigninComponent;

    export type Navbar = NavbarComponent;
    export type Fullbanner = FullbannerComponent;
    export type Login = LoginComponent;
    export type Signin = SigninComponent;
}

export default Components;