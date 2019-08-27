"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = require("./player");
var userManager = /** @class */ (function () {
    function userManager() {
        this._storage = {};
        this._tempData = {};
    }
    userManager.prototype.getUser = function (id) {
        return this._storage[id] ? this._storage[id] : undefined;
    };
    userManager.prototype.createTempData = function (id, name, nickname) {
        this._tempData[id] = { name: name, nickname: nickname };
    };
    userManager.prototype.setTempRace = function (id, race) {
        this._tempData[id].race = race;
    };
    userManager.prototype.setTempRole = function (id, role) {
        this._tempData[id].role = role;
    };
    userManager.prototype.createPlayerFromTempData = function (id) {
        var tempData = this._tempData[id];
        var player = new player_1.Player(id, tempData.name, tempData.nickname, tempData.race, tempData.role, this.getBaseStats(tempData.race, tempData.role), this.getBaseGold(tempData.race));
        this._storage[id] = player;
    };
    userManager.prototype.getBaseStats = function (race, role) {
        var stats;
        switch (race) {
            case player_1.Race.Wolf:
                stats = {
                    strength: 5,
                    vitality: 5,
                    intelligence: 3,
                    spirit: 3
                };
            case player_1.Race.Rabbit:
                stats = {
                    strength: 3,
                    vitality: 5,
                    intelligence: 4,
                    spirit: 4
                };
            case player_1.Race.Rat:
                stats = {
                    strength: 4,
                    vitality: 4,
                    intelligence: 5,
                    spirit: 3
                };
            case player_1.Race.Bear:
            default:
                stats = {
                    strength: 2,
                    vitality: 6,
                    intelligence: 3,
                    spirit: 5
                };
        }
        switch (role) {
            case player_1.Role.Warrior:
                stats.strength += 1;
                break;
            case player_1.Role.Hunter:
                stats.vitality += 1;
                break;
            case player_1.Role.Scout:
                stats.intelligence += 1;
                break;
            case player_1.Role.Mage:
                stats.spirit += 1;
                break;
        }
        return stats;
    };
    userManager.prototype.getBaseGold = function (race) {
        switch (race) {
            case player_1.Race.Wolf:
                return 4;
            case player_1.Race.Rabbit:
                return 8;
            case player_1.Race.Rat:
                return 6;
            case player_1.Race.Bear:
                return 3;
        }
    };
    return userManager;
}());
exports.userManager = userManager;
