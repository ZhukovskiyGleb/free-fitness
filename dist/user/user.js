"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
})(Gender = exports.Gender || (exports.Gender = {}));
var BodyType;
(function (BodyType) {
    BodyType["Thin"] = "thin";
    BodyType["Muscular"] = "muscular";
    BodyType["Large"] = "large";
    BodyType["Overweight"] = "overweight";
    BodyType["Common"] = "common";
})(BodyType = exports.BodyType || (exports.BodyType = {}));
var Activity;
(function (Activity) {
    Activity["Nothing"] = "nothing";
    Activity["Easy"] = "easy";
    Activity["Average"] = "average";
    Activity["Heavy"] = "heavy";
})(Activity = exports.Activity || (exports.Activity = {}));
var Experience;
(function (Experience) {
    Experience["Junior"] = "junior";
    Experience["Middle"] = "middle";
    Experience["Senior"] = "senior";
})(Experience = exports.Experience || (exports.Experience = {}));
var UserProperty;
(function (UserProperty) {
    UserProperty["RequestsAmount"] = "requestsAmount";
    UserProperty["RegisterDate"] = "registerDate";
    UserProperty["LastEditDate"] = "lastEditDate";
    UserProperty["LastVisitDate"] = "lastVisitDate";
    UserProperty["ShowDarkSide"] = "showDarkSide";
    UserProperty["DarkSideAccess"] = "darkSideAccess";
    UserProperty["ContactsNotified"] = "contactsNotified";
    UserProperty["SavedDiet"] = "savedDiet";
    UserProperty["SavedWorkout"] = "savedWorkout";
    UserProperty["Weight"] = "weight";
    UserProperty["Height"] = "height";
    UserProperty["Age"] = "age";
    UserProperty["Gender"] = "gender";
    UserProperty["BodyType"] = "bodyType";
    UserProperty["Activity"] = "activity";
    UserProperty["Experience"] = "experience";
})(UserProperty = exports.UserProperty || (exports.UserProperty = {}));
var User = /** @class */ (function () {
    function User(registerDate) {
        var _a;
        this._properties = (_a = {},
            _a[UserProperty.RequestsAmount] = 0,
            _a[UserProperty.ShowDarkSide] = false,
            _a[UserProperty.DarkSideAccess] = false,
            _a[UserProperty.ContactsNotified] = false,
            _a);
        this._properties[UserProperty.RegisterDate] = registerDate;
    }
    User.prototype.hasProperties = function (requestProps) {
        var _this = this;
        requestProps.forEach(function (property) {
            if (!_this._properties.hasOwnProperty(property)) {
                return false;
            }
        });
        return true;
    };
    User.prototype.getProperties = function (requestProps) {
        var _this = this;
        var result = {};
        requestProps.forEach(function (property) {
            if (_this._properties.hasOwnProperty(property)) {
                // @ts-ignore
                result[property] = _this._properties[property];
            }
        });
        return result;
    };
    User.prototype.getProperty = function (property) {
        if (this._properties.hasOwnProperty(property)) {
            return this._properties[property];
        }
    };
    Object.defineProperty(User.prototype, "properties", {
        get: function () {
            return __assign({}, this._properties);
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
exports.User = User;
