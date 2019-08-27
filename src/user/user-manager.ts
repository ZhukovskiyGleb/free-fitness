import {User} from "./user";

export class UserManager {
    private readonly _users: {[key: number]: User} = {};

    constructor() {

    }

    public getUser(id: number): User | undefined {
        return this._users[id] ? this._users[id] : undefined;
    }

}