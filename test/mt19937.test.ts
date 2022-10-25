import MT19937 from "../src/generators/mt19937";
import Random, { RandomGenerator } from "../src/random";

test('Checks output of MT19937.nextInt with known values', () => {
	const seed = 1729;
	// Espected return vals for seed = 1729
	const expected_vals = [
		911214221,  2673937510, 1112474867, 3239237157,
		1819012629,	2081533310,	3090920515,	862427021,
		2973195097,	1895702843,	3127487011,	1771570369,
		1235017307,	2955339172,	1091279593,	1300292809,
		4127158639,	123956829,	2427543891,	3777731499,
	];

	const r = new MT19937(seed);
	expected_vals.forEach(e => {
		expect(r.nextInt()).toBe(e);
	});
});