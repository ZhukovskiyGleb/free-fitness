"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var LOC_ID;
(function (LOC_ID) {
    LOC_ID[LOC_ID["Test"] = 0] = "Test";
})(LOC_ID = exports.LOC_ID || (exports.LOC_ID = {}));
var Localization = /** @class */ (function () {
    function Localization() {
    }
    Localization.loc = function (lang, id) {
        if (!this.localizations[lang]) {
            lang = 'ru';
        }
        return this.localizations[lang][id];
    };
    Localization.localizations = {
        'ru': (_a = {},
            _a[LOC_ID.Test] = 'test',
            _a)
    };
    return Localization;
}());
exports.Localization = Localization;
