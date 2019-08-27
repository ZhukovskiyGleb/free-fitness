"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./user");
var UserManager = /** @class */ (function () {
    function UserManager() {
        this._users = {};
    }
    UserManager.prototype.getUser = function (id) {
        return this._users[id] ? this._users[id] : undefined;
    };
    UserManager.prototype.createUser = function (id, creationTime) {
        if (!this._users[id]) {
            return this._users[id] = new user_1.User(creationTime);
        }
        return undefined;
    };
    return UserManager;
}());
exports.UserManager = UserManager;
