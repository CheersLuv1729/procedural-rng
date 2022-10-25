import { RandomGenerator } from "../random";
export default class Xorshift128 implements RandomGenerator {
    private x;
    private y;
    private z;
    private w;
    constructor(x?: number, y?: number, z?: number, w?: number);
    name(): string;
    min(): number;
    max(): number;
    nextInt(): number;
}
