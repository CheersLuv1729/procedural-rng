"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.LCRNG = exports.MT19937 = void 0;
var mt19937_1 = __importDefault(require("./generators/mt19937"));
exports.MT19937 = mt19937_1["default"];
var lcrng_1 = __importDefault(require("./generators/lcrng"));
exports.LCRNG = lcrng_1["default"];
var random_1 = __importDefault(require("./random"));
exports["default"] = random_1["default"];
