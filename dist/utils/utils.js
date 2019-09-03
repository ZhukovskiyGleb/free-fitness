"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Delimiter;
(function (Delimiter) {
    Delimiter[Delimiter["Day"] = 86400000] = "Day";
    Delimiter[Delimiter["Hour"] = 3600000] = "Hour";
})(Delimiter || (Delimiter = {}));
function getDiffTime(fromTime, delimiter) {
    var currentTime = new Date().getTime();
    var diffTime = Math.abs(currentTime - fromTime);
    return Math.floor(diffTime / (delimiter));
}
function getDaysPast(fromTime, moreThen) {
    var diffDays = getDiffTime(fromTime, Delimiter.Day);
    if (!moreThen) {
        return diffDays;
    }
    var result = moreThen - diffDays;
    return result > 0 ? result : 0;
}
exports.getDaysPast = getDaysPast;
function getHoursPast(fromTime, moreThen) {
    var diffHours = getDiffTime(fromTime, Delimiter.Day);
    if (!moreThen) {
        return diffHours;
    }
    var result = moreThen - diffHours;
    return result > 0 ? result : 0;
}
exports.getHoursPast = getHoursPast;
function isSomething(x) {
    return x != null;
}
exports.isSomething = isSomething;
function log() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log.apply(console, args);
}
exports.log = log;
function logError() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log.apply(console, args);
}
exports.logError = logError;
function logDiet() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log.apply(console, args);
}
exports.logDiet = logDiet;
function logScenario() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log.apply(console, args);
}
exports.logScenario = logScenario;
function logUser() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log.apply(console, args);
}
exports.logUser = logUser;
