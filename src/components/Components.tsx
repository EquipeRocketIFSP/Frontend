import NavbarComponent from "./navbar/Navbar";
import FullbannerComponent from "./fullbanner/Fullbanner";
import LoginComponent from "./login/Login";
import BreadcrumbsComponent from "./breadcrumbs/Breadcrumbs";

namespace Components {
    export const Navbar = NavbarComponent;
    export const Fullbanner = FullbannerComponent;
    export const Login = LoginComponent;
    export const Breadcrumbs = BreadcrumbsComponent;

    export type Navbar = NavbarComponent;
    export type Fullbanner = FullbannerComponent;
    export type Login = LoginComponent;
    export type Breadcrumbs = BreadcrumbsComponent;
}

export default Components;