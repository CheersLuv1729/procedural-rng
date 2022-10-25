


export interface RandomGenerator {

	name(): string;
	nextInt(): number;
	min(): number;
	max(): number;
};

class MathRandomGenerator implements RandomGenerator{
	name(){return "Math.random() generator"};
	nextInt(){return Math.random() * (4294967296)};
	min(){return 0};
	max(){return 4294967295};
}

type TypedArray = 
	Int8Array | Uint8Array | Uint8ClampedArray | 
	Int16Array | Uint16Array | 
	Int32Array | Uint32Array | 
	Float32Array | Float64Array | 
	BigInt64Array | BigUint64Array;

export default class Random{

	private g: RandomGenerator;


	constructor(generator: RandomGenerator)
	{
		this.g = generator;
	}

	name(): string { return `Random{${this.g.name()}}` }
	min(): number { return 0; }
	max(): number { return this.g.max() - this.g.min();}
	int(): number { return this.g.nextInt() - this.g.min();}
	
	// /**
	//  * Generates a random float in between 0 (inclusive) and 1 (exclusive)
	//  * 
	//  * @remarks
	//  * This function is expected to call the internal generator `1` time.
	//  * 
	//  * @returns 
	//  */
	float(): number
	{
		const v = this.int();
		// +1 ensures that nextFloat() never returns 1
		// and always returns a value in the interval [0, 1)
		return (v - this.min()) / (this.max() + 1 - this.min());
	}
	
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
	shuffleInPlace<R, T extends (Array<R> | TypedArray)>(arr: T): T
	{
		for(let i = arr.length-1; i > 0; i--)
		{
			const j = this.below(i + 1);
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}
	/**
	 * 
	 * @param arr Array input to be shuffled
	 * 
	 * @remarks
	 * This function is expected to call the internal generator `arr.length - 1` times.
	 * 
	 * @returns A reference to new shuffled array
	 */
	shuffleCopy<R, T extends (Array<R> | TypedArray)>(arr: T): T
	{
		const c = arr.slice() as T;
		return this.shuffleInPlace(c);
	}

	/**
	 * Generates a random unsigned integer in the range 0 to n-1
	 * 
	 * @remarks
	 * This function is expected to call the internal generator `1` time.
	 * 
	 * @returns 
	 */
	below(n: number): number
	{
		if( n <= 0) throw Error(`Error: Invalid value ${n} passed to randBelow(n). Value must be greater than 0`);
		const v = this.int();
		return v % n;
	}

	/**
	 * Generates a random unsigned integer in the range start (inclusive) to stop (exclusive)
	 * 
	 * @remarks
	 * This function is expected to call the internal generator `1` time.
	 * 
	 * @returns 
	 */
	range(props: {stop: number, start?: number}): number
	{
		const {stop, start = 0} = props;
		const width = stop - start;
		return start + this.below(width);
	}

	/**
	 * Returns a random element in the provided array
	 * @remarks
	 * This function is expected to call the internal generator `1` time.
	 * If the provided array is empty, this throws an Error.
	 * 
	 * @param arr The array to select a random element from
	 * @returns The randomly selected element
	 */
	choice<T>(arr: Array<T>): T
	{
		if(arr.length == 0) throw Error(`Error: Empty array passed to randChoice(). Array must not be empty`);
		return arr[this.below(arr.length)];
	}
};