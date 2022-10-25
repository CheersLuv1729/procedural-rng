# procedural-rng.js

procedural-rng.js collection of procedural random number generators (prng) written in TypeScript.

Unlike the built in Math.random(), these generators can be provided an initial seed value, allowing for reproducable and predictable results.

Please note: These generators are NOT cryptographically secure and should not be used in cases where strong cryptographic randomness is needed.
If strong crypographic properties are needed, such as when generating certificates or authentication tokens, please refer to JavaScript's built-in [Crypto interface](https://w3c.github.io/webcrypto/#crypto-interface)

## Usage

### Setting up the generator
```typescript
import {Random, MT19937} from "procedural-rng";

const seed = 1729;
const generator = new MT19937(seed); // Mersenne twister
const r = new Random(generator);
```

### Generating random values
```typescript
// Random int between 0-99 (inclusive)
const random_int = r.below(100);

// Random float between 0 (inclusive) and 1 (exclusive) (same as Math.random())
const random_float = r.float();
```

### Other utility functions
```typescript
console.log(`Dice roll: You rolled a ${r.range({start: 1, stop: 7})}`); 

console.log(`Coin flip: You flipped a ${r.choice(['Heads', 'Tails'])}`);
```

### Array functions
```typescript
const playlist = [
	{name: "The Sound of Silence", year: 1964, artist: "Simon & Garfunkel"},
	{name: "Life on Mars?", year: 1973, artist: "David Bowie"},
	{name: "Stairway to Heaven", year: 1971, artist: "Led Zeppelin"},
	{name: "Sympathy For The Devil", year: 1969, artist: "The Rolling Stones"},
	{name: "Who Are You", year: 1978, artist: "The Who"}
];

r.shuffleInPlace(playlist);
console.log(playlist);

const suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
const values = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];

const cards = suits.map(s => values.map(v => `${v} of ${s}`)).flat();
const draw = r.choice(cards);
console.log(draw);
```

### Types of generators
```typescript
import {MT19937, LCRNG, Xorshift32, Xorshift128} from "procedural-rng"

{
	const lcrng = new LCRNG(54321, {
		// Newlib, Musl parameters taken from
		// https://en.wikipedia.org/wiki/Linear_congruential_generator
		m: BigInt(2)**BigInt(64),         // Modulus
		a: BigInt("6364136223846793005"), // multiplier
		c: BigInt("1"),                   // increment
		w: 32, // Width in bits of the output
		s: 32, // Shift in bits of the output
		// Returning 32 bits after shifting 32 bits = bits 63..32
	});
	const r = new Random(lcrng);
}

{
	// Params based on older versions of Java's java.util.random
	const lcrng = new LCRNG.JavaRandom(12345);
	const r = new Random(lcrng);
}

{
	const xorshift32 = new Xorshift32(192837465);
	const r = new Random(xorshift32);
}

{
	// Pameters x, y, z, and w of the xorshift128 algorithm (all are optional)
	// The first param is Date.now() by default, as is the other generators
	// The other three values are derived from hashes of value before them
	const xorshift128 = new Xorshift128(123456789, 362436069, 521288629, 88675123);
	const r = new Random(xorshift128);
}
```
