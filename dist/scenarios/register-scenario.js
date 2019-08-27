"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var scenario_1 = require("./scenario");
var localization_1 = require("../localization/localization");
var player_1 = require("../user/player");
var game_scenario_1 = require("./game-scenario");
var RegisterScenario = /** @class */ (function (_super) {
    __extends(RegisterScenario, _super);
    function RegisterScenario() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.RACE_SELECT_STATE = 'RACE_SELECT_STATE';
        _this.ROLE_SELECT_STATE = 'ROLE_SELECT_STATE';
        _this.CREATE_DATA = 'CREATE';
        _this.START_DATA = 'START';
        _this.WOLF_DATA = 'WOLF';
        _this.RABBIT_DATA = 'RABBIT';
        _this.RAT_DATA = 'RAT';
        _this.BEAR_DATA = 'BEAR';
        _this.RANDOM_DATA = 'RANDOM';
        _this.WARRIOR_DATA = 'WARRIOR';
        _this.HUNTER_DATA = 'HUNTER';
        _this.SCOUT_DATA = 'SCOUT';
        _this.MAGE_DATA = 'MAGE';
        return _this;
    }
    RegisterScenario.prototype.init = function () {
        var _this = this;
        this.addAction(this.INIT_STATE, function (params) {
            var chatId = params.chatId, lang = params.lang;
            _this._bot.sendMessage(chatId, localization_1.Localization.loc(lang, localization_1.LOC_ID.RegisterGreeting), true, _this.getRaceGreetingKeyboard(lang));
            _this.setState(_this.RACE_SELECT_STATE);
            return false;
        });
        this.addAction(this.RACE_SELECT_STATE, function (params) {
            var data = params.callback, chatId = params.chatId, lang = params.lang, playerId = params.playerId, name = params.name, nickname = params.nickname;
            switch (data) {
                case _this.CREATE_DATA:
                    _this._bot.sendMessage(chatId, localization_1.Localization.loc(lang, localization_1.LOC_ID.RegisterRaceSelect), true, _this.getRaceSelectKeyboard(lang));
                    _this._userManager.createTempData(playerId, name, nickname);
                    break;
                case _this.WOLF_DATA:
                case _this.RABBIT_DATA:
                case _this.RAT_DATA:
                case _this.BEAR_DATA:
                    var race = data === _this.WOLF_DATA ? player_1.RACE.Wolf :
                        data === _this.RABBIT_DATA ? player_1.RACE.Rabbit :
                            data === _this.RAT_DATA ? player_1.RACE.Rat :
                                player_1.RACE.Bear;
                    _this._userManager.setTempRace(playerId, race);
                    _this._bot.sendMessage(chatId, localization_1.Localization.loc(lang, localization_1.LOC_ID.RegisterRoleSelect), true, _this.getRoleSelectKeyboard(lang, race));
                    _this.setState(_this.ROLE_SELECT_STATE);
                    break;
                case _this.RANDOM_DATA:
                    var randomRace = [player_1.RACE.Wolf, player_1.RACE.Rabbit, player_1.RACE.Rat, player_1.RACE.Bear][Math.floor(Math.random() * 4)];
                    _this._userManager.setTempRace(playerId, randomRace);
                    var randomRoleData = _this.getRandomRoleData(randomRace);
                    _this.setState(_this.ROLE_SELECT_STATE);
                    params.callback = randomRoleData;
                    _this.activate(params);
                    break;
            }
            return false;
        });
        this.addAction(this.ROLE_SELECT_STATE, function (params) {
            var data = params.callback, playerId = params.playerId, chatId = params.chatId, lang = params.lang;
            switch (data) {
                case _this.WARRIOR_DATA:
                case _this.HUNTER_DATA:
                case _this.SCOUT_DATA:
                case _this.MAGE_DATA:
                    var role = data === _this.WARRIOR_DATA ? player_1.ROLE.Warrior :
                        data === _this.HUNTER_DATA ? player_1.ROLE.Hunter :
                            data === _this.SCOUT_DATA ? player_1.ROLE.Scout :
                                player_1.ROLE.Mage;
                    _this._userManager.setTempRole(playerId, role);
                    _this._userManager.createPlayerFromTempData(playerId);
                    _this._bot.sendMessage(chatId, localization_1.Localization.loc(lang, localization_1.LOC_ID.RegisterComplete), true, _this.getRaceCompleteKeyboard(lang));
                    _this.setState(_this.FINISH_STATE);
                    break;
            }
            return false;
        });
        this.addAction(this.FINISH_STATE, function (params) {
            var playerId = params.playerId, data = params.callback;
            if (data !== _this.START_DATA) {
                return false;
            }
            _this._scenarioManager.add(playerId, game_scenario_1.GameScenario, params);
            return true;
        });
    };
    RegisterScenario.prototype.getRandomRoleData = function (race) {
        var roles = [];
        if (race === player_1.RACE.Wolf || race === player_1.RACE.Bear) {
            roles.push(this.WARRIOR_DATA);
        }
        if (race === player_1.RACE.Wolf || race === player_1.RACE.Rabbit) {
            roles.push(this.HUNTER_DATA);
        }
        if (race === player_1.RACE.Rabbit || race === player_1.RACE.Rat) {
            roles.push(this.SCOUT_DATA);
        }
        if (race === player_1.RACE.Rat || race === player_1.RACE.Bear) {
            roles.push(this.MAGE_DATA);
        }
        return roles[Math.floor(Math.random() * roles.length)];
    };
    RegisterScenario.prototype.getRaceGreetingKeyboard = function (lang) {
        return {
            reply_markup: {
                inline_keyboard: [
                    [{
                            text: localization_1.Localization.loc(lang, localization_1.LOC_ID.RegisterCreate),
                            callback_data: this.CREATE_DATA
                        }]
                ]
            }
        };
    };
    RegisterScenario.prototype.getRaceSelectKeyboard = function (lang) {
        return {
            reply_markup: {
                inline_keyboard: [
                    [{
                            text: localization_1.Localization.loc(lang, localization_1.LOC_ID.RegisterWolf),
                            callback_data: this.WOLF_DATA
                        },
                        {
                            text: localization_1.Localization.loc(lang, localization_1.LOC_ID.RegisterRabbit),
                            callback_data: this.RABBIT_DATA
                        }],
                    [{
                            text: localization_1.Localization.loc(lang, localization_1.LOC_ID.RegisterRat),
                            callback_data: this.RAT_DATA
                        },
                        {
                            text: localization_1.Localization.loc(lang, localization_1.LOC_ID.RegisterBear),
                            callback_data: this.BEAR_DATA
                        }],
                    [{
                            text: localization_1.Localization.loc(lang, localization_1.LOC_ID.RegisterRaceRandom),
                            callback_data: this.RANDOM_DATA
                        }],
                ]
            }
        };
    };
    RegisterScenario.prototype.getRoleSelectKeyboard = function (lang, race) {
        var keyboard = [];
        if (race === player_1.RACE.Wolf || race === player_1.RACE.Bear) {
            keyboard.push({
                text: localization_1.Localization.loc(lang, localization_1.LOC_ID.RegisterWarrior),
                callback_data: this.WARRIOR_DATA
            });
        }
        if (race === player_1.RACE.Wolf || race === player_1.RACE.Rabbit) {
            keyboard.push({
                text: localization_1.Localization.loc(lang, localization_1.LOC_ID.RegisterHunter),
                callback_data: this.HUNTER_DATA
            });
        }
        if (race === player_1.RACE.Rabbit || race === player_1.RACE.Rat) {
            keyboard.push({
                text: localization_1.Localization.loc(lang, localization_1.LOC_ID.RegisterScout),
                callback_data: this.SCOUT_DATA
            });
        }
        if (race === player_1.RACE.Rat || race === player_1.RACE.Bear) {
            keyboard.push({
                text: localization_1.Localization.loc(lang, localization_1.LOC_ID.RegisterMage),
                callback_data: this.MAGE_DATA
            });
        }
        return {
            reply_markup: {
                inline_keyboard: [
                    keyboard
                ]
            }
        };
    };
    RegisterScenario.prototype.getRaceCompleteKeyboard = function (lang) {
        return {
            reply_markup: {
                inline_keyboard: [
                    [{
                            text: localization_1.Localization.loc(lang, localization_1.LOC_ID.ButtonStartGame),
                            callback_data: this.START_DATA
                        }]
                ]
            }
        };
    };
    RegisterScenario.prototype.destroy = function () {
    };
    return RegisterScenario;
}(scenario_1.Scenario));
exports.RegisterScenario = RegisterScenario;
