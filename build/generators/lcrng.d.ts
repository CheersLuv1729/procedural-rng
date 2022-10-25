import { RandomGenerator } from "../random";
export interface LCRNG_Props {
    a?: number | bigint;
    c?: number | bigint;
    m?: number | bigint;
    s?: number;
    w?: number;
}
export default class LCRNG implements RandomGenerator {
    private a;
    private c;
    private m;
    private x;
    private w;
    private s;
    /**
     *
     * @param seed
     * @returns Returns an LCRNG object with parameters similar to Java's built in java.util.Random object.
     */
    static JavaRandom(seed: number | bigint): LCRNG;
    constructor(seed: number | bigint, props?: LCRNG_Props);
    name(): string;
    nextInt(): number;
    min(): number;
    max(): number;
}
