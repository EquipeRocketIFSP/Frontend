class LocalStorage<I> {

    private storageName: string;
    private debug: boolean;

    constructor(storageName: string, debug = false) {
        this.storageName = storageName;
        this.debug = debug;
    }

    public set = (value: I): void => localStorage.setItem(this.storageName, JSON.stringify(value));

    public get = (): I | null => {
        const value = localStorage.getItem(this.storageName);

        if (this.debug)
            console.debug(value);

        if (!value)
            return null;

        try {
            return JSON.parse(value);
        } catch (error) {

            if (this.debug)
                console.debug("Não foi possível converter para JSON", error);

            return null;
        }
    }

    public truncate = (): void => localStorage.removeItem(this.storageName);
}

export default LocalStorage;