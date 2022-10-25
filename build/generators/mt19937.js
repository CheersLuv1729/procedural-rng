"use strict";
exports.__esModule = true;
var n = 624;
var m = 397;
var a = 0x9908B0DF;
var f = 1812433253;
var u = 11;
var d = 0xFFFFFFFF;
var s = 7;
var b = 0x9D2C5680;
var t = 15;
var c = 0xEFC60000;
var l = 18;
var UPPER = 0x80000000;
var LOWER = 0x7FFFFFFF;
var MT19937 = /** @class */ (function () {
    function MT19937(seed) {
        if (seed === void 0) { seed = Date.now(); }
        this.mt = new Array(n);
        this.index = n + 1;
        this.seed_mt(seed & 0xffffffff);
    }
    MT19937.prototype.seed_mt = function (s) {
        this.mt[0] = s >>> 0;
        for (this.index = 1; this.index < n; this.index++) {
            // This is functionally equivalent to the below snippet from wikipedia
            // MT[i] := lowest w bits of (f * (MT[i-1] xor (MT[i-1] >> (w-2))) + i)
            //
            // JavaScript bit shifting operates on 32-bit integers, whereas the example uses 64-bits
            // Therefore the number has to be split up into smaller parts as to not be truncated when
            // multiplied by f
            var mask = 0xffff;
            var s_1 = this.mt[this.index - 1] ^ (this.mt[this.index - 1] >>> 30);
            this.mt[this.index] = ((((s_1 >> 16 & mask) * f) << 16) + (s_1 & mask) * f + this.index) >>> 0;
        }
    };
    ;
    MT19937.prototype.twist = function () {
        for (var i = 0; i < n; i++) {
            var x = (this.mt[i] & UPPER) + (this.mt[(i + 1) % n] & LOWER);
            var xA = x >>> 1;
            if (x % 2)
                xA ^= a;
            this.mt[i] = this.mt[(i + m) % n] ^ xA;
        }
        this.index = 0;
    };
    ;
    MT19937.prototype.name = function () {
        return "MT19937 (Mersenne Twister 19937)";
    };
    MT19937.prototype.nextInt = function () {
        if (this.index >= n) {
            if (this.index > n) {
                var val = 5489;
                console.warn("Mersenne Twister Generator was never seeded! Seeding with constant value ".concat(val));
                this.seed_mt(val);
            }
            this.twist();
        }
        var y = this.mt[this.index++];
        y ^= (y >>> u) & d;
        y ^= (y << s) & b;
        y ^= (y << t) & c;
        y ^= (y >>> l);
        return y >>> 0;
    };
    ;
    MT19937.prototype.min = function () {
        return 0;
    };
    MT19937.prototype.max = function () {
        return Math.pow(2, 32) - 1;
    };
    return MT19937;
}());
exports["default"] = MT19937;
