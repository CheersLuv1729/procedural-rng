export interface RandomGenerator {
    name(): string;
    nextInt(): number;
    min(): number;
    max(): number;
}
declare type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array;
export default class Random {
    private g;
    constructor(generator: RandomGenerator);
    name(): string;
    min(): number;
    max(): number;
    int(): number;
    float(): number;
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
    shuffleInPlace<R, T extends (Array<R> | TypedArray)>(arr: T): T;
    /**
     *
     * @param arr Array input to be shuffled
     *
     * @remarks
     * This function is expected to call the internal generator `arr.length - 1` times.
     *
     * @returns A reference to new shuffled array
     */
    shuffleCopy<R, T extends (Array<R> | TypedArray)>(arr: T): T;
    /**
     * Generates a random unsigned integer in the range 0 to n-1
     *
     * @remarks
     * This function is expected to call the internal generator `1` time.
     *
     * @returns
     */
    below(n: number): number;
    /**
     * Generates a random unsigned integer in the range start (inclusive) to stop (exclusive)
     *
     * @remarks
     * This function is expected to call the internal generator `1` time.
     *
     * @returns
     */
    range(props: {
        stop: number;
        start?: number;
    }): number;
    /**
     * Returns a random element in the provided array
     * @remarks
     * This function is expected to call the internal generator `1` time.
     * If the provided array is empty, this throws an Error.
     *
     * @param arr The array to select a random element from
     * @returns The randomly selected element
     */
    choice<T>(arr: Array<T>): T;
}
export {};
