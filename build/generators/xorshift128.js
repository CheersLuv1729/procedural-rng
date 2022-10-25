"use strict";
exports.__esModule = true;
var util_1 = require("../util");
var Xorshift128 = /** @class */ (function () {
    function Xorshift128(x, y, z, w) {
        // It's ok if x is 0 as long all of the inputs aren't 0
        // The hash() function returns a nonzero output for a 0 input
        // So this will not break unless the user intentionally provides all 0s
        if (x === void 0) { x = Date.now(); }
        this.x = (x << 0);
        this.y = y != undefined ? (0, util_1.uint)(y) : (0, util_1.hash)(this.x);
        this.z = z != undefined ? (0, util_1.uint)(z) : (0, util_1.hash)(this.y);
        this.w = w != undefined ? (0, util_1.uint)(w) : (0, util_1.hash)(this.z);
    }
    Xorshift128.prototype.name = function () {
        return "Xorshift128 (Xorshift 128 bit)";
    };
    Xorshift128.prototype.min = function () {
        return 1;
    };
    Xorshift128.prototype.max = function () {
        return Math.pow(2, 32) - 1;
    };
    Xorshift128.prototype.nextInt = function () {
        var t = this.x;
        this.x = this.y;
        this.y = this.z;
        this.z = this.w;
        this.w ^= (this.w >>> 19);
        t ^= t << 11;
        t ^= t >>> 8;
        this.w ^= t;
        return (0, util_1.uint)(this.w);
    };
    return Xorshift128;
}());
exports["default"] = Xorshift128;
;
