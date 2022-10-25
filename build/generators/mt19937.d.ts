import { RandomGenerator } from "../random";
export default class MT19937 implements RandomGenerator {
    mt: Array<number>;
    index: number;
    constructor(seed?: number);
    private seed_mt;
    private twist;
    name(): string;
    nextInt(): number;
    min(): number;
    max(): number;
}
