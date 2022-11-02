import NavbarComponent from "./navbar/Navbar";
import FullbannerComponent from "./fullbanner/Fullbanner";
import LoginComponent from "./login/Login";
import BreadcrumbsComponent from "./breadcrumbs/Breadcrumbs";
import SearchBarComponent from "./search-bar/SerachBar";
import ListingComponent from "./listing/Listing";

namespace Components {
    export const Navbar = NavbarComponent;
    export const Fullbanner = FullbannerComponent;
    export const Login = LoginComponent;
    export const Breadcrumbs = BreadcrumbsComponent;
    export const SearchBar = SearchBarComponent;
    export const Listing = ListingComponent;

    export type Navbar = NavbarComponent;
    export type Fullbanner = FullbannerComponent;
    export type Login = LoginComponent;
    export type Breadcrumbs = BreadcrumbsComponent;
    export type SearchBar = SearchBarComponent;
    export type Listing = ListingComponent;
}

export default Components;