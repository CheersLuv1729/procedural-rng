"use strict";
exports.__esModule = true;
;
var DefaultVals = {
    a: BigInt("25214903917"),
    m: BigInt(1) << BigInt(48),
    c: 11,
    w: 32,
    s: 16
};
var LCRNG = /** @class */ (function () {
    function LCRNG(seed, props) {
        var _a, _b, _c, _d, _e;
        this.a = BigInt((_a = props === null || props === void 0 ? void 0 : props.a) !== null && _a !== void 0 ? _a : DefaultVals.a);
        this.m = BigInt((_b = props === null || props === void 0 ? void 0 : props.m) !== null && _b !== void 0 ? _b : DefaultVals.m);
        this.c = BigInt((_c = props === null || props === void 0 ? void 0 : props.c) !== null && _c !== void 0 ? _c : DefaultVals.c);
        this.w = Math.min((_d = props === null || props === void 0 ? void 0 : props.w) !== null && _d !== void 0 ? _d : DefaultVals.w, 32);
        this.s = (_e = props === null || props === void 0 ? void 0 : props.s) !== null && _e !== void 0 ? _e : DefaultVals.s;
        this.x = BigInt(seed !== null && seed !== void 0 ? seed : (BigInt(Date.now()) % this.m));
    }
    /**
     *
     * @param seed
     * @returns Returns an LCRNG object with parameters similar to Java's built in java.util.Random object.
     */
    LCRNG.JavaRandom = function (seed) {
        var java_params = {
            a: BigInt("25214903917"),
            m: BigInt(1) << BigInt(48),
            c: 11,
            w: 32,
            s: 16
        };
        var s = (BigInt(seed) ^ java_params.a) % java_params.m;
        return new LCRNG(s, java_params);
    };
    LCRNG.prototype.name = function () {
        return "LCRNG (Linear congruential generator)";
    };
    LCRNG.prototype.nextInt = function () {
        this.x = (this.a * this.x + this.c) % this.m;
        var r = Number(BigInt.asUintN(this.w, this.x >> BigInt(this.s)));
        return r;
    };
    LCRNG.prototype.min = function () {
        return 0;
    };
    LCRNG.prototype.max = function () {
        return Math.min(4294967295, Number(this.m >> BigInt(this.s)) - 1);
    };
    return LCRNG;
}());
exports["default"] = LCRNG;
;
