import { RandomGenerator } from "../random";


export interface LCRNG_Props {
	a?: number | bigint, 
	c?: number | bigint, 
	m?: number | bigint,
	s?: number,
	w?: number,
};

const DefaultVals = {
	a: BigInt("25214903917"),
	m: BigInt(1) << BigInt(48),
	c: 11,
	w: 32,
	s: 16,
};

export default class LCRNG implements RandomGenerator{

	private a: bigint;
	private c: bigint;
	private m: bigint;
	private x: bigint;

	private w: number;
	private s: number;

	/**
	 * 
	 * @param seed 
	 * @returns Returns an LCRNG object with parameters similar to Java's built in java.util.Random object.
	 */
	static JavaRandom(seed: number | bigint)
	{
		const java_params = {
			a: BigInt("25214903917"),
			m: BigInt(1) << BigInt(48),
			c: 11,
			w: 32,
			s: 16,
		};
		const s = (BigInt(seed) ^ java_params.a) % java_params.m;
		return new LCRNG(s, java_params);
	}

	constructor(seed: number | bigint, props?: LCRNG_Props)
	{
		this.a = BigInt(props?.a ?? DefaultVals.a);
		this.m = BigInt(props?.m ?? DefaultVals.m);
		this.c = BigInt(props?.c ?? DefaultVals.c);
		
		this.w = Math.min(props?.w ?? DefaultVals.w, 32);
		this.s = props?.s ?? DefaultVals.s;

		this.x = BigInt(seed ?? (BigInt(Date.now()) % this.m));
	}

	name(): string {
		return `LCRNG (Linear congruential generator)`
	}

	nextInt(): number {
		this.x = (this.a * this.x + this.c) % this.m;
		const r = Number(BigInt.asUintN(this.w, this.x >> BigInt(this.s)));
		return r;
	}

	min(): number {
		return 0;
	}
	
	max(): number {
		return Math.min(4294967295, Number(this.m >> BigInt(this.s)) - 1);
	}

};