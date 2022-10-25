import { RandomGenerator } from "../random";
import { hash, uint } from "../util";



export default class Xorshift128 implements RandomGenerator {

	private x: number;
	private y: number;
	private z: number;
	private w: number;

	constructor(x: number = Date.now(), y?: number, z?: number, w?: number)
	{
		// It's ok if x is 0 as long all of the inputs aren't 0
		// The hash() function returns a nonzero output for a 0 input
		// So this will not break unless the user intentionally provides all 0s

		this.x = (x << 0);
		this.y = y != undefined ? uint(y) : hash(this.x);
		this.z = z != undefined ? uint(z) : hash(this.y);
		this.w = w != undefined ? uint(w) : hash(this.z);
	}

	name(): string {
		return `Xorshift128 (Xorshift 128 bit)`;
	}

	min(): number {
		return 1;
	}

	max(): number {
		return 2**32 - 1;
	}

	nextInt(): number {
		let t = this.x;
		this.x = this.y;
		this.y = this.z;
		this.z = this.w;
		this.w ^= (this.w>>>19)
		t ^= t << 11;
		t ^= t >>> 8;
		this.w ^= t;
		return uint(this.w);
	}
};