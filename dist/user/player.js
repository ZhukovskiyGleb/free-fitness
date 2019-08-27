"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RACE;
(function (RACE) {
    RACE[RACE["Wolf"] = 0] = "Wolf";
    RACE[RACE["Rabbit"] = 1] = "Rabbit";
    RACE[RACE["Rat"] = 2] = "Rat";
    RACE[RACE["Bear"] = 3] = "Bear";
})(RACE = exports.RACE || (exports.RACE = {}));
var ROLE;
(function (ROLE) {
    ROLE[ROLE["Warrior"] = 0] = "Warrior";
    ROLE[ROLE["Hunter"] = 1] = "Hunter";
    ROLE[ROLE["Scout"] = 2] = "Scout";
    ROLE[ROLE["Mage"] = 3] = "Mage";
})(ROLE = exports.ROLE || (exports.ROLE = {}));
var Player = /** @class */ (function () {
    function Player(_id, _name, _nickname, _race, _role, _stats) {
        this._id = _id;
        this._name = _name;
        this._nickname = _nickname;
        this._race = _race;
        this._role = _role;
        this._stats = _stats;
        this._gold = 0;
        this._health = 0;
        this._mana = 0;
        this._prestige = 0;
        this._health = this.strength;
        this._mana = this.spirit;
    }
    Player.prototype.addGold = function (value) {
        this._gold += value;
    };
    Player.prototype.setCurrentLocation = function (location) {
        this._currentLocation = location;
    };
    Player.prototype.setTargetLocation = function (location) {
        this._targetLocation = location;
    };
    Player.prototype.clearTargetLocation = function (location) {
        this._targetLocation = undefined;
    };
    Object.defineProperty(Player.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "nickname", {
        get: function () {
            return this._nickname;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "race", {
        get: function () {
            return this._race;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "role", {
        get: function () {
            return this._role;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "strength", {
        get: function () {
            return this._stats.strength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "vitality", {
        get: function () {
            return this._stats.vitality;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "intelligence", {
        get: function () {
            return this._stats.intelligence;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "spirit", {
        get: function () {
            return this._stats.spirit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "gold", {
        get: function () {
            return this._gold;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "health", {
        get: function () {
            return this._health;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "mana", {
        get: function () {
            return this._mana;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "prestige", {
        get: function () {
            return this._prestige;
        },
        enumerable: true,
        configurable: true
    });
    return Player;
}());
exports.Player = Player;
