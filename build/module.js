"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Random = exports.Xorshift128 = exports.Xorshift32 = exports.LCRNG = exports.MT19937 = void 0;
var random_1 = __importDefault(require("./random"));
exports.Random = random_1["default"];
var mt19937_1 = __importDefault(require("./generators/mt19937"));
exports.MT19937 = mt19937_1["default"];
var lcrng_1 = __importDefault(require("./generators/lcrng"));
exports.LCRNG = lcrng_1["default"];
var xorshift32_1 = __importDefault(require("./generators/xorshift32"));
exports.Xorshift32 = xorshift32_1["default"];
var xorshift128_1 = __importDefault(require("./generators/xorshift128"));
exports.Xorshift128 = xorshift128_1["default"];
