"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserManager = /** @class */ (function () {
    function UserManager() {
        this._users = {};
    }
    UserManager.prototype.getUser = function (id) {
        return this._users[id] ? this._users[id] : undefined;
    };
    return UserManager;
}());
exports.UserManager = UserManager;
