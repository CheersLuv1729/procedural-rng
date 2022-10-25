import Random from "../src/random";
import Xorshift32 from "../src/generators/xorshift32";


test('32', () => {

	const vals = [
		467464973,
		840903603,
		978133223,
		1415607855,
		236115165,
		3315764665,
		380178899,
		2801670362,
		3645386536,
		1225092798,
	];

	const g = new Xorshift32(1729);

	vals.forEach(v => {
		expect(g.nextInt()).toBe(v);
	})
})