import { RandomGenerator } from "../random";
import { uint } from "../util";

export default class Xorshift32 implements RandomGenerator {

	private state: number;

	constructor(seed: number = Date.now())
	{
		// It's possible that the lowest 32 bits of Date.now() are all 0
		// which will break the rng. || 1 ensures that the seed will never be 0
		this.state = (seed << 0) || 1;
	}

	name(): string {
		return `Xorshift32 (Xorshift 32 bit)`;
	}

	min(): number {
		return 1;
	}

	max(): number {
		return 2**32 - 1;
	}

	nextInt(): number {
		this.state ^= this.state << 13;
		this.state ^= this.state >>> 17;
		this.state ^= this.state << 5;
		return uint(this.state);
	}
};

