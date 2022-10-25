


export const uint = (i: number) => (i + Number((i<0))*(2**32));

// Thomas Wang's 32 bit mix function
// http://web.archive.org/web/20071223173210/http://www.concentric.net/~Ttwang/tech/inthash.htm
export const hash = (k: number) => {
	k = ~k + (k << 15);
	k = k ^ (k >>> 12);
	k = k + (k << 2);
	k = k ^ (k >>> 4);
	k = (k + (k << 3)) + (k << 11);
	k = k ^ (k >>> 16);
	return k;
};