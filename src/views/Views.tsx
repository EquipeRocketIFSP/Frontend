import HomeView from "./home/Home";
import SignInView from "./cadastro-inicial/SignIn";

namespace Views {
    export const Home = HomeView;
    export const SignIn = SignInView;

    export type Home = HomeView;
    export type SignIn = SignInView;
}

export default Views;