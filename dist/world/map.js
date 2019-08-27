"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var location_1 = require("./location");
var localization_1 = require("../localization/localization");
var player_1 = require("../user/player");
var LocationCollection = /** @class */ (function () {
    function LocationCollection(_filter) {
        this._filter = _filter;
        this._iterator = 0;
        this._collection = {};
    }
    LocationCollection.prototype.add = function (location, key) {
        if (location.type === this._filter) {
            this._collection[key ? key : this._iterator++] = location;
        }
    };
    LocationCollection.prototype.get = function (key) {
        if (key && this._collection[key]) {
            return this._collection[key];
        }
        else {
            var list = [];
            for (var key_1 in this._collection) {
                list.push(this._collection[key_1]);
            }
            if (list.length > 0) {
                return list[Math.floor(Math.random() * list.length)];
            }
        }
        return undefined;
    };
    return LocationCollection;
}());
var Map = /** @class */ (function () {
    function Map() {
        this._locations = [];
        this._guildCollection = new LocationCollection(location_1.LOCATION.Guild);
        this._dungeonCollection = new LocationCollection(location_1.LOCATION.Dungeon);
        this._villageCollection = new LocationCollection(location_1.LOCATION.Village);
        this._sanctuaryCollection = new LocationCollection(location_1.LOCATION.Sanctuary);
        this.init();
    }
    Map.prototype.addPlayerToLocation = function (location, player) {
        location.addPlayer(player);
    };
    Map.prototype.removePlayerFromLocation = function (location, player) {
        location.removePlayer(player);
    };
    Map.prototype.getCastleLocation = function () {
        return this._castleLocation;
    };
    Map.prototype.getGuildLocation = function (race) {
        return this._guildCollection.get(race);
    };
    Map.prototype.getRandomDungeonLocation = function () {
        return this._dungeonCollection.get();
    };
    Map.prototype.getRandomVillageLocation = function () {
        return this._villageCollection.get();
    };
    Map.prototype.getRandomSanctuaryLocation = function () {
        return this._sanctuaryCollection.get();
    };
    Map.prototype.init = function () {
        var types = [
            { type: location_1.LOCATION.Dungeon, titleLoc: localization_1.LOC_ID.DungeonTitle1 },
            { type: location_1.LOCATION.Dungeon, titleLoc: localization_1.LOC_ID.DungeonTitle2 },
            { type: location_1.LOCATION.Dungeon, titleLoc: localization_1.LOC_ID.DungeonTitle3 },
            { type: location_1.LOCATION.Dungeon, titleLoc: localization_1.LOC_ID.DungeonTitle4 },
            { type: location_1.LOCATION.Dungeon, titleLoc: localization_1.LOC_ID.DungeonTitle5 },
            { type: location_1.LOCATION.Dungeon, titleLoc: localization_1.LOC_ID.DungeonTitle6 },
            { type: location_1.LOCATION.Village, titleLoc: localization_1.LOC_ID.VillageTitle1 },
            { type: location_1.LOCATION.Village, titleLoc: localization_1.LOC_ID.VillageTitle2 },
            { type: location_1.LOCATION.Village, titleLoc: localization_1.LOC_ID.VillageTitle3 },
            { type: location_1.LOCATION.Village, titleLoc: localization_1.LOC_ID.VillageTitle4 },
            { type: location_1.LOCATION.Village, titleLoc: localization_1.LOC_ID.VillageTitle5 },
            { type: location_1.LOCATION.Village, titleLoc: localization_1.LOC_ID.VillageTitle6 },
            { type: location_1.LOCATION.Sanctuary, titleLoc: localization_1.LOC_ID.SanctuaryTitle1 },
            { type: location_1.LOCATION.Sanctuary, titleLoc: localization_1.LOC_ID.SanctuaryTitle2 },
            { type: location_1.LOCATION.Sanctuary, titleLoc: localization_1.LOC_ID.SanctuaryTitle3 },
            { type: location_1.LOCATION.Sanctuary, titleLoc: localization_1.LOC_ID.SanctuaryTitle4 },
            { type: location_1.LOCATION.Sanctuary, titleLoc: localization_1.LOC_ID.SanctuaryTitle5 },
            { type: location_1.LOCATION.Sanctuary, titleLoc: localization_1.LOC_ID.SanctuaryTitle6 }
        ];
        types.sort(function (a, b) {
            return Math.random() > .5 ? 1 : -1;
        });
        /*0*/ this._locations.push(new location_1.Location(localization_1.LOC_ID.CastleTitle, location_1.LOCATION.Castle));
        /*1-16*/ for (var i = 0; i < 16; i++) {
            this._locations.push(this.getNextLocation(types));
        }
        /*17*/ this._locations.push(new location_1.Location(localization_1.LOC_ID.GuildWolfTitle, location_1.LOCATION.Guild));
        /*18*/ this._locations.push(new location_1.Location(localization_1.LOC_ID.GuildBearTitle, location_1.LOCATION.Guild));
        /*19*/ this._locations.push(new location_1.Location(localization_1.LOC_ID.GuildRatTitle, location_1.LOCATION.Guild));
        /*20*/ this._locations.push(new location_1.Location(localization_1.LOC_ID.GuildRabbitTitle, location_1.LOCATION.Guild));
        this.connectLocations(this._locations[0], this._locations[1], 1, location_1.GROUNDS.Swamp);
        this.connectLocations(this._locations[0], this._locations[2], 2, location_1.GROUNDS.Mountain);
        this.connectLocations(this._locations[0], this._locations[3], 2, location_1.GROUNDS.Swamp);
        this.connectLocations(this._locations[0], this._locations[4], 2, location_1.GROUNDS.Mountain);
        this.connectLocations(this._locations[0], this._locations[5], 2, location_1.GROUNDS.Mountain);
        this.connectLocations(this._locations[0], this._locations[6], 2, location_1.GROUNDS.Swamp);
        this.connectLocations(this._locations[1], this._locations[6], 2, location_1.GROUNDS.Swamp);
        this.connectLocations(this._locations[1], this._locations[15], 3, location_1.GROUNDS.Forest);
        this.connectLocations(this._locations[1], this._locations[16], 3);
        this.connectLocations(this._locations[2], this._locations[1], 2, location_1.GROUNDS.Mountain);
        this.connectLocations(this._locations[2], this._locations[3], 3, location_1.GROUNDS.Swamp);
        this.connectLocations(this._locations[2], this._locations[7], 2, location_1.GROUNDS.Swamp);
        this.connectLocations(this._locations[2], this._locations[8], 2, location_1.GROUNDS.Forest);
        this.connectLocations(this._locations[2], this._locations[9], 3, location_1.GROUNDS.Forest);
        this.connectLocations(this._locations[2], this._locations[16], 3, location_1.GROUNDS.Swamp);
        this.connectLocations(this._locations[3], this._locations[4]);
        this.connectLocations(this._locations[3], this._locations[8], 2, location_1.GROUNDS.Forest);
        this.connectLocations(this._locations[3], this._locations[9]);
        this.connectLocations(this._locations[3], this._locations[10], 2, location_1.GROUNDS.Forest);
        this.connectLocations(this._locations[4], this._locations[5], 3, location_1.GROUNDS.Mountain);
        this.connectLocations(this._locations[4], this._locations[10], 2, location_1.GROUNDS.Swamp);
        this.connectLocations(this._locations[4], this._locations[11], 2, location_1.GROUNDS.Swamp);
        this.connectLocations(this._locations[4], this._locations[12]);
        this.connectLocations(this._locations[5], this._locations[6], 3, location_1.GROUNDS.Forest);
        this.connectLocations(this._locations[5], this._locations[12], 2, location_1.GROUNDS.Forest);
        this.connectLocations(this._locations[5], this._locations[13], 2, location_1.GROUNDS.Forest);
        this.connectLocations(this._locations[6], this._locations[13], 3, location_1.GROUNDS.Forest);
        this.connectLocations(this._locations[6], this._locations[14], 2, location_1.GROUNDS.Swamp);
        this.connectLocations(this._locations[6], this._locations[15], 2, location_1.GROUNDS.Swamp);
        this.connectLocations(this._locations[6], this._locations[16], 3, location_1.GROUNDS.Forest);
        this.connectLocations(this._locations[7], this._locations[1], 3, location_1.GROUNDS.Swamp);
        this.connectLocations(this._locations[7], this._locations[8], 4, location_1.GROUNDS.Forest);
        this.connectLocations(this._locations[7], this._locations[16], 2, location_1.GROUNDS.Swamp);
        this.connectLocations(this._locations[8], this._locations[9], 3);
        this.connectLocations(this._locations[9], this._locations[10], 2, location_1.GROUNDS.Forest);
        this.connectLocations(this._locations[10], this._locations[11], 2, location_1.GROUNDS.Swamp);
        this.connectLocations(this._locations[11], this._locations[12]);
        this.connectLocations(this._locations[13], this._locations[14], 3);
        this.connectLocations(this._locations[14], this._locations[15], 2, location_1.GROUNDS.Swamp);
        this.connectLocations(this._locations[15], this._locations[16]);
        this.connectLocations(this._locations[17], this._locations[7]);
        this.connectLocations(this._locations[17], this._locations[16]);
        this.connectLocations(this._locations[18], this._locations[8]);
        this.connectLocations(this._locations[18], this._locations[9]);
        this.connectLocations(this._locations[19], this._locations[11]);
        this.connectLocations(this._locations[19], this._locations[12]);
        this.connectLocations(this._locations[20], this._locations[13]);
        this.connectLocations(this._locations[20], this._locations[14]);
    };
    Map.prototype.collectLocation = function (location) {
        switch (location.type) {
            case location_1.LOCATION.Castle:
                this._castleLocation = location;
                break;
            case location_1.LOCATION.Guild:
                var key = location.locId === localization_1.LOC_ID.GuildWolfTitle ? player_1.RACE.Wolf :
                    location.locId === localization_1.LOC_ID.GuildRabbitTitle ? player_1.RACE.Rabbit :
                        location.locId === localization_1.LOC_ID.GuildRatTitle ? player_1.RACE.Rat :
                            player_1.RACE.Bear;
                this._guildCollection.add(location, key);
                break;
            case location_1.LOCATION.Dungeon:
                this._dungeonCollection.add(location);
                break;
            case location_1.LOCATION.Village:
                this._villageCollection.add(location);
                break;
            case location_1.LOCATION.Sanctuary:
                this._sanctuaryCollection.add(location);
                break;
        }
        return location;
    };
    Map.prototype.connectLocations = function (loc1, loc2, difficult, ground) {
        if (difficult === void 0) { difficult = 2; }
        if (ground === void 0) { ground = location_1.GROUNDS.Field; }
        loc1.addPath({ target: loc2, difficult: difficult, ground: ground });
        loc2.addPath({ target: loc1, difficult: difficult, ground: ground });
    };
    Map.prototype.getNextLocation = function (types) {
        var config = types.pop();
        return new location_1.Location(config.titleLoc, config.type);
    };
    return Map;
}());
exports.Map = Map;
