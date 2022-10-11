import Contracts from "./contracts/Contracts";
import LocalStorage from "./helpers/LocalStorage";

namespace Storages {
    export const userStorage = new LocalStorage<Contracts.UserData>("UserData")
}

export default Storages;