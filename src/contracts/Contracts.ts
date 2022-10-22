namespace Contracts {
    export interface DynamicObject<I> {
        [key: string]: I
    }

    export interface UserData {
        id: number,
        username: string
    }

    export interface Redirect {
        redirect: null | string
    }

    export interface ViaCEPAddress {
        cep: string,
        logradouro: string,
        complemento: string,
        bairro: string,
        localidade: string,
        uf: string,
        ibge: string,
        gia: string,
        ddd: string,
        siafi: string
    }

    export interface IBGEUF {
        id: number,
        sigla: string,
        nome: string,
        regiao: { id: number, sigla: string, nome: string }
    }
}

export default Contracts;