"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GROUNDS;
(function (GROUNDS) {
    GROUNDS[GROUNDS["Field"] = 0] = "Field";
    GROUNDS[GROUNDS["Forest"] = 1] = "Forest";
    GROUNDS[GROUNDS["Mountain"] = 2] = "Mountain";
    GROUNDS[GROUNDS["Swamp"] = 3] = "Swamp";
})(GROUNDS = exports.GROUNDS || (exports.GROUNDS = {}));
var LOCATION;
(function (LOCATION) {
    LOCATION[LOCATION["Castle"] = 0] = "Castle";
    LOCATION[LOCATION["Guild"] = 1] = "Guild";
    LOCATION[LOCATION["Village"] = 2] = "Village";
    LOCATION[LOCATION["Dungeon"] = 3] = "Dungeon";
    LOCATION[LOCATION["Sanctuary"] = 4] = "Sanctuary";
})(LOCATION = exports.LOCATION || (exports.LOCATION = {}));
var Location = /** @class */ (function () {
    function Location(_locId, _type) {
        this._locId = _locId;
        this._type = _type;
        this._ways = [];
        this._players = [];
    }
    Location.prototype.addPlayer = function (player) {
        if (this._players.indexOf(player) < 0) {
            this._players.push(player);
        }
    };
    Location.prototype.removePlayer = function (player) {
        var index = this._players.indexOf(player);
        if (index >= 0) {
            this._players.splice(index, 1);
        }
    };
    Location.prototype.addPath = function (path) {
        this._ways.push(path);
    };
    Location.prototype.getWays = function () {
        return this._ways.slice();
    };
    Object.defineProperty(Location.prototype, "locId", {
        get: function () {
            return this._locId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Location.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    return Location;
}());
exports.Location = Location;
