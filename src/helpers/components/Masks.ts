class Masks {
    static phone = (value: string, usesCelphone: boolean = false) => {
        value = value.replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2");

        if (usesCelphone)
            value = value.replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3");

        value = value.replace(/(-\d{4})\d+?$/, "$1");

        return value;
    }

    static celphone = (value: string) => {
        return value.replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{4})\d+?$/, "$1");
    }

    static cep = (value: string) => value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{3})\d+?$/, "$1");

    static number = (value: string) => value.replace(/\D/gmi, "");

    static price = (value: string) => value.replace(/\D/g, "")
        .replace(/(\d+)(\d{2})/, "$1,$2")
        .replace(/(\d+)(\d{3})/gmi, "$1.$2")
        .replace(/(\d+)(\d{3})/gmi, "$1.$2")
        .replace(/(\d+)(\d{3})/gmi, "$1.$2")
        .replace(/(\d+)(\d{3})/gmi, "$1.$2");

    static cpf = (value: string) => value.replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");

    static cnpj = (value: string) => value.replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");

    static crmv = (value: string) => value
        .replace(/[^a-z0-9\-]+/gmi, "")
        .replace(/(\D{2})(\D)/, "$1")
        .replace(/(\D{2})(\d)/, "$1-$2")
        .replace(/([a-z0-9\-]{8})([a-z0-9\-])/, "$1")
        .toUpperCase();

    static cnae = (value: string) => value
        .replace(/\D/g, "")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d)(\d)/, "$1/$2")
        .replace(/(\/\d{2})(\d)/, "$1");
}

export default Masks;