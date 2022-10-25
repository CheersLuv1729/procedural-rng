import { RandomGenerator } from "../random";
export default class Xorshift32 implements RandomGenerator {
    private state;
    constructor(seed?: number);
    name(): string;
    min(): number;
    max(): number;
    nextInt(): number;
}
