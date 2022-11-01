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

    export interface Employees {
        "funcionario-nome": string,
        "funcionario-crmv": string,
        "funcionario-cpf": string,
        "funcionario-rg": string,
        "funcionario-cep": string,
        "funcionario-logradouro": string,
        "funcionario-numero": string,
        "funcionario-bairro": string,
        "funcionario-cidade": string,
        "funcionario-estado": string,
        "funcionario-celular": string,
        "funcionario-telefone": string,
        "funcionario-email": string,
        "funcionario-senha": string,
    }
}

export default Contracts;