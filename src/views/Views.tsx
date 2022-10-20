import HomeView from "./home/Home";
import CadastroInicialView from "./cadastro-inicial/CadastroInicial";

namespace Views {
    export const Home = HomeView;
    export const CadastroInicial = CadastroInicialView;

    export type Home = HomeView;
    export type CadastroInicial = CadastroInicialView;
}

export default Views;