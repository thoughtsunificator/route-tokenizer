import assert from "assert"
import { Token } from "../index.js"

describe("token", () => {

	it("types", () => {
		assert.strictEqual(Token.TYPE.PATH, "PATH")
		assert.strictEqual(Token.TYPE.PARAMETER, "PARAMETER")
		assert.strictEqual(Token.TYPE.SEPARATOR, "SEPARATOR")
	})

	it("instance", () => {
		const route = new Token(Token.TYPE.PATH, "test", 1)
		assert.strictEqual(route.type, Token.TYPE.PATH)
		assert.deepEqual(route.buffer, "test")
		assert.deepEqual(route.bufferIndex, 1)
	})

})
