import { Token } from "../index.js"

export function types(test) {
	test.expect(3)
	test.strictEqual(Token.TYPE.PATH, "PATH")
	test.strictEqual(Token.TYPE.PARAMETER, "PARAMETER")
	test.strictEqual(Token.TYPE.SEPARATOR, "SEPARATOR")
	test.done()
}

export function instance(test) {
	test.expect(3)
	const route = new Token(Token.TYPE.PATH, "test", 1)
	test.strictEqual(route.type, Token.TYPE.PATH)
	test.deepEqual(route.buffer, "test")
	test.deepEqual(route.bufferIndex, 1)
	test.done()
}
