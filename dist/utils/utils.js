"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isSomething(x) {
    return x != null;
}
exports.isSomething = isSomething;
function getPastDays(editTime, moreThen) {
    var currentTime = new Date().getTime();
    var diffTime = Math.abs(currentTime - editTime);
    var diffDays = Math.floor(diffTime / (8.64e+7));
    if (!moreThen) {
        return diffDays;
    }
    var result = moreThen - diffDays;
    return result > 0 ? result : 0;
}
exports.getPastDays = getPastDays;
