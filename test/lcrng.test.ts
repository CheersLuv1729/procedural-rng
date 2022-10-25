import LCRNG from "../src/generators/lcrng";

test('Checks output of LCRNG.nextInt with known values', () => {
	const seed = 1729;
	// Espected return vals for seed = 1729
	// These are generated with Java's java.util.Random
	// Random r = new Random(1729);
	// for(int i = 0; i < 20; i++)
	//    System.out.println(Integer.toUnsignedLong(r.nextInt()));
	const expected_vals = [
		2572747590, 497775772,  4206628996, 2657139311,
		2944282859, 1942540650, 3646142738,	1192783242,
		3941892485,	2149623924,	2203877117,	3839258981,
		2313716195,	2876945277,	3156722458, 1882002391,
		263890786,  3666135825, 3449731032, 1897736748,
	];

	const r = LCRNG.JavaRandom(seed);
	expected_vals.forEach(e => {
		const v = r.nextInt();
		expect(v).toBe(e);
	});
});