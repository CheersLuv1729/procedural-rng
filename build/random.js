"use strict";
exports.__esModule = true;
;
var MathRandomGenerator = /** @class */ (function () {
    function MathRandomGenerator() {
    }
    MathRandomGenerator.prototype.name = function () { return "Math.random() generator"; };
    ;
    MathRandomGenerator.prototype.nextInt = function () { return Math.random() * (4294967296); };
    ;
    MathRandomGenerator.prototype.min = function () { return 0; };
    ;
    MathRandomGenerator.prototype.max = function () { return 4294967295; };
    ;
    return MathRandomGenerator;
}());
var Random = /** @class */ (function () {
    function Random(generator) {
        this.g = generator;
    }
    Random.prototype.name = function () { return "Random{".concat(this.g.name(), "}"); };
    Random.prototype.min = function () { return 0; };
    Random.prototype.max = function () { return this.g.max() - this.g.min(); };
    Random.prototype.int = function () { return this.g.nextInt() - this.g.min(); };
    // /**
    //  * Generates a random float in between 0 (inclusive) and 1 (exclusive)
    //  * 
    //  * @remarks
    //  * This function is expected to call the internal generator `1` time.
    //  * 
    //  * @returns 
    //  */
    Random.prototype.float = function () {
        var v = this.int();
        // +1 ensures that nextFloat() never returns 1
        // and always returns a value in the interval [0, 1)
        return (v - this.min()) / (this.max() + 1 - this.min());
    };
    /**
     *
     * @param arr Array input to be shuffled.
     *
     * @remarks
     * This function is expected to call the internal generator `arr.length - 1` times.
     * This input array will be modified directly and the return value can be ignored, however
     * it is also returned for convenience `let a = r.shuffleInPlace([1, 2, 3])`.
     *
     *
     * @returns A reference to the input array
     */
    Random.prototype.shuffleInPlace = function (arr) {
        var _a;
        for (var i = arr.length - 1; i > 0; i--) {
            var j = this.below(i + 1);
            _a = [arr[j], arr[i]], arr[i] = _a[0], arr[j] = _a[1];
        }
        return arr;
    };
    /**
     *
     * @param arr Array input to be shuffled
     *
     * @remarks
     * This function is expected to call the internal generator `arr.length - 1` times.
     *
     * @returns A reference to new shuffled array
     */
    Random.prototype.shuffleCopy = function (arr) {
        var c = arr.slice();
        return this.shuffleInPlace(c);
    };
    /**
     * Generates a random unsigned integer in the range 0 to n-1
     *
     * @remarks
     * This function is expected to call the internal generator `1` time.
     *
     * @returns
     */
    Random.prototype.below = function (n) {
        if (n <= 0)
            throw Error("Error: Invalid value ".concat(n, " passed to randBelow(n). Value must be greater than 0"));
        var v = this.int();
        return v % n;
    };
    /**
     * Generates a random unsigned integer in the range start (inclusive) to stop (exclusive)
     *
     * @remarks
     * This function is expected to call the internal generator `1` time.
     *
     * @returns
     */
    Random.prototype.range = function (props) {
        var stop = props.stop, _a = props.start, start = _a === void 0 ? 0 : _a;
        var width = stop - start;
        return start + this.below(width);
    };
    /**
     * Returns a random element in the provided array
     * @remarks
     * This function is expected to call the internal generator `1` time.
     * If the provided array is empty, this throws an Error.
     *
     * @param arr The array to select a random element from
     * @returns The randomly selected element
     */
    Random.prototype.choice = function (arr) {
        if (arr.length == 0)
            throw Error("Error: Empty array passed to randChoice(). Array must not be empty");
        return arr[this.below(arr.length)];
    };
    return Random;
}());
exports["default"] = Random;
;
