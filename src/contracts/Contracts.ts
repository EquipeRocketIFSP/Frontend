namespace Contracts {
    export interface DynamicObject<I> {
        [key: string]: I
    }

    export interface UserData {
        token: string,
        bearer: string
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

    export interface PersonPersonalData {
        id: number,
        nome: string,
        cpf: string,
        rg: string,
        cep: string,
        logradouro: string,
        numero: string,
        bairro: string,
        cidade: string,
        estado: string,
        celular: string,
        telefone: string,
    }

    export interface Employees extends PersonPersonalData {
        crmv: string,
        email: string,
        senha: string,
    }

    export interface Tutor extends PersonPersonalData {
    }

    export interface Animal {
        id: number,
        nome: string,
        idade: string,
        sexo: string,
        raca: string,
        especie: string,
        pelagem: string,
        tutor: string,
        pai: string | null,
        mae: string | null
    }

    export interface ListingData {
        id: number,
        nome: string
    }
}

export default Contracts;