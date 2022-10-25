"use strict";
exports.__esModule = true;
exports.hash = exports.uint = void 0;
var uint = function (i) { return (i + Number((i < 0)) * (Math.pow(2, 32))); };
exports.uint = uint;
// Thomas Wang's 32 bit mix function
// http://web.archive.org/web/20071223173210/http://www.concentric.net/~Ttwang/tech/inthash.htm
var hash = function (k) {
    k = ~k + (k << 15);
    k = k ^ (k >>> 12);
    k = k + (k << 2);
    k = k ^ (k >>> 4);
    k = (k + (k << 3)) + (k << 11);
    k = k ^ (k >>> 16);
    return k;
};
exports.hash = hash;
