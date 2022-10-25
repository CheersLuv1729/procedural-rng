import Random, { RandomGenerator } from "../random";

const n = 624;
const m =  397;
const a = 0x9908B0DF;

const f = 1812433253;

const u = 11;
const d = 0xFFFFFFFF;

const s = 7;
const b = 0x9D2C5680;

const t = 15;
const c = 0xEFC60000;

const l = 18;

const UPPER = 0x80000000;
const LOWER = 0x7FFFFFFF;

export default class MT19937 implements RandomGenerator{

	// This code is adapted from the example pseudo code presented on wikipedia
	// https://en.wikipedia.org/wiki/Mersenne_Twister

	mt: Array<number>;
	index: number;

	constructor(seed: number = Date.now())
	{
		this.mt = new Array<number>(n);
		this.index = n + 1;
		this.seed_mt(seed & 0xffffffff);
	}

	private seed_mt(s: number) {
		this.mt[0] = s >>> 0;
    	for (this.index = 1; this.index < n; this.index++) {
			// This is functionally equivalent to the below snippet from wikipedia
			// MT[i] := lowest w bits of (f * (MT[i-1] xor (MT[i-1] >> (w-2))) + i)
			//
			// JavaScript bit shifting operates on 32-bit integers, whereas the example uses 64-bits
			// Therefore the number has to be split up into smaller parts as to not be truncated when
			// multiplied by f
			const mask = 0xffff;
			const s = this.mt[this.index - 1] ^ (this.mt[this.index-1] >>> 30);
			this.mt[this.index] = ((((s >> 16 & mask) * f) << 16) + (s & mask) * f + this.index) >>> 0;
    	}
	};



	private twist(){
		for(let i = 0; i < n; i++){
			const x = (this.mt[i] & UPPER) + (this.mt[(i+1) % n] & LOWER);
			let xA = x >>> 1;
			if(x % 2) xA ^= a;
			this.mt[i] = this.mt[(i+m) % n] ^ xA;
		}
		this.index = 0;
	};

	name(): string {
		return `MT19937 (Mersenne Twister 19937)`;
	}

	nextInt(): number {
		if(this.index >= n){
			if(this.index > n){
				const val = 5489;
				console.warn(`Mersenne Twister Generator was never seeded! Seeding with constant value ${val}`);
				this.seed_mt(val);
			}
			this.twist();
		}

		let y = this.mt[this.index++];
		y ^= (y >>> u) & d;
		y ^= (y << s) & b;
		y ^= (y << t) & c;
		y ^= (y >>> l);

		return y >>> 0;
	};

	min(): number{
		return 0;
	}

	max(): number{
		return 2**32-1;
	}

}