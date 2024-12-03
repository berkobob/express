"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = controller;
var AppRouter_1 = require("../../AppRouter");
var MetadataKeys_1 = require("./MetadataKeys");
function bodyValidator(keys) {
    return function (req, res, next) {
        if (!req.body) {
            res.status(422).send('Invalid request');
            return;
        }
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (!req.body[key]) {
                res.status(422).send("Missing property ".concat(key));
                return;
            }
        }
        next();
    };
}
function controller(routePrefix) {
    return function (target) {
        var router = AppRouter_1.AppRouter.getInstance();
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata(MetadataKeys_1.metadataKeys.path, target.prototype, key);
            var method = Reflect.getMetadata(MetadataKeys_1.metadataKeys.method, target.prototype, key);
            var middlewares = Reflect.getMetadata(MetadataKeys_1.metadataKeys.middleware, target.prototype, key) || [];
            var requiredBodyProps = Reflect.getMetadata(MetadataKeys_1.metadataKeys.validator, target.prototype, key) || [];
            var validator = bodyValidator(requiredBodyProps);
            if (path) {
                router[method].apply(router, __spreadArray(__spreadArray(["".concat(routePrefix).concat(path)], middlewares, false), [validator,
                    routeHandler], false));
            }
        }
    };
}
//# sourceMappingURL=controller.js.map