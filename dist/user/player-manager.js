"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = require("./player");
var PlayerManager = /** @class */ (function () {
    function PlayerManager(_map) {
        this._map = _map;
        this._storage = {};
        this._tempData = {};
    }
    PlayerManager.prototype.setPlayerLocation = function (id, location) {
        var player = this.getPlayer(id);
        if (player) {
            this._map.addPlayerToLocation(location, player);
            player.setCurrentLocation(location);
        }
    };
    PlayerManager.prototype.getUser = function (id) {
        return this._storage[id] ? this._storage[id] : undefined;
    };
    PlayerManager.prototype.createTempData = function (id, name, nickname) {
        this._tempData[id] = { name: name, nickname: nickname };
    };
    PlayerManager.prototype.setTempRace = function (id, race) {
        this._tempData[id].race = race;
    };
    PlayerManager.prototype.setTempRole = function (id, role) {
        this._tempData[id].role = role;
    };
    PlayerManager.prototype.createPlayerFromTempData = function (id) {
        var _a = this._tempData[id], name = _a.name, nickname = _a.nickname, race = _a.race, role = _a.role;
        if (!name || !nickname || !race || !role) {
            return;
        }
        var player = new player_1.Player(id, name, nickname, race, role, this.getBaseStats(race, role));
        player.addGold(this.getBaseGold(race));
        var startLocation = this._map.getGuildLocation(race);
        if (startLocation) {
            this._map.addPlayerToLocation(startLocation, player);
        }
        this._storage[id] = player;
        delete this._tempData[id];
    };
    PlayerManager.prototype.getBaseStats = function (race, role) {
        var stats;
        switch (race) {
            case player_1.RACE.Wolf:
                stats = {
                    strength: 5,
                    vitality: 5,
                    intelligence: 3,
                    spirit: 3
                };
            case player_1.RACE.Rabbit:
                stats = {
                    strength: 3,
                    vitality: 5,
                    intelligence: 4,
                    spirit: 4
                };
            case player_1.RACE.Rat:
                stats = {
                    strength: 4,
                    vitality: 4,
                    intelligence: 5,
                    spirit: 3
                };
            case player_1.RACE.Bear:
            default:
                stats = {
                    strength: 2,
                    vitality: 6,
                    intelligence: 3,
                    spirit: 5
                };
        }
        switch (role) {
            case player_1.ROLE.Warrior:
                stats.strength += 1;
                break;
            case player_1.ROLE.Hunter:
                stats.vitality += 1;
                break;
            case player_1.ROLE.Scout:
                stats.intelligence += 1;
                break;
            case player_1.ROLE.Mage:
                stats.spirit += 1;
                break;
        }
        return stats;
    };
    PlayerManager.prototype.getBaseGold = function (race) {
        switch (race) {
            case player_1.RACE.Wolf:
                return 4;
            case player_1.RACE.Rabbit:
                return 8;
            case player_1.RACE.Rat:
                return 6;
            case player_1.RACE.Bear:
                return 3;
        }
    };
    return PlayerManager;
}());
exports.PlayerManager = PlayerManager;
