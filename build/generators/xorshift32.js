"use strict";
exports.__esModule = true;
var util_1 = require("../util");
var Xorshift32 = /** @class */ (function () {
    function Xorshift32(seed) {
        if (seed === void 0) { seed = Date.now(); }
        // It's possible that the lowest 32 bits of Date.now() are all 0
        // which will break the rng. || 1 ensures that the seed will never be 0
        this.state = (seed << 0) || 1;
    }
    Xorshift32.prototype.name = function () {
        return "Xorshift32 (Xorshift 32 bit)";
    };
    Xorshift32.prototype.min = function () {
        return 1;
    };
    Xorshift32.prototype.max = function () {
        return Math.pow(2, 32) - 1;
    };
    Xorshift32.prototype.nextInt = function () {
        this.state ^= this.state << 13;
        this.state ^= this.state >>> 17;
        this.state ^= this.state << 5;
        return (0, util_1.uint)(this.state);
    };
    return Xorshift32;
}());
exports["default"] = Xorshift32;
;
