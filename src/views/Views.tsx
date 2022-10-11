import HomeView from "./home/Home";
import PainelView from "./painel/Painel";

namespace Views {
    export const Home = HomeView;
    export const Painel = PainelView;

    export type Home = HomeView;
    export type Painel = PainelView;
}

export default Views;