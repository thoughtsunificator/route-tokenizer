import assert from "assert"
import { Tokenizer, Token } from "../index.js"

describe("tokenizer", () => {

	it("schema", () => {
		const tokens = Tokenizer.tokenize("/test/{xtest}")
		assert.ok(tokens instanceof Array)
		assert.strictEqual(Object.hasOwnProperty.call(tokens[0], "_bufferIndex"), true)
		assert.strictEqual(Object.hasOwnProperty.call(tokens[0], "_buffer"), true)
		assert.strictEqual(Object.hasOwnProperty.call(tokens[0], "_type"), true)
		assert.strictEqual(typeof tokens[0].bufferIndex, "number")
		assert.strictEqual(typeof tokens[0].buffer, "string")
		assert.strictEqual(typeof tokens[0].type, "string")
	})

	it("buffer", () => {
		assert.strictEqual(Tokenizer.tokenize("dsadsads")[0].buffer, "dsadsads")
		assert.strictEqual(Tokenizer.tokenize("x332/{test}/{cxzcxz}")[0].buffer, "x332")
		assert.strictEqual(Tokenizer.tokenize("x332///{test}/cxzcxz}")[1].buffer, "/")
		assert.strictEqual(Tokenizer.tokenize("x332///{test}/cxzcxz}")[2].buffer, "/")
		assert.strictEqual(Tokenizer.tokenize("x332///{test}/cxzcxz}")[3].buffer, "/")
		assert.strictEqual(Tokenizer.tokenize("/test/{test}/{cxzcxz}/")[5].buffer, "{cxzcxz}")
		assert.strictEqual(Tokenizer.tokenize("/{test}/{cxzcxz}/")[1].buffer, "{test}")
		assert.strictEqual(Tokenizer.tokenize("/{test}/{cxzcxz}/")[2].buffer, "/")
		assert.strictEqual(Tokenizer.tokenize("{test}/{cxzcxz}/")[0].buffer, "{test}")
		assert.strictEqual(Tokenizer.tokenize("{test}/{cxzcxz}/regfdgfd")[4].buffer, "regfdgfd")
		assert.strictEqual(Tokenizer.tokenize("/{test}")[0].buffer, "/")
		assert.strictEqual(Tokenizer.tokenize("/{test}")[1].buffer, "{test}")
	})

	it("bufferIndex", () => {
		assert.strictEqual(Tokenizer.tokenize("dsaczxrwqadas")[0].bufferIndex, 0)
		assert.strictEqual(Tokenizer.tokenize("/x332/{test}/{cxzcxz}")[1].bufferIndex, 1)
		assert.strictEqual(Tokenizer.tokenize("x332/{test}/{cxzcxz}")[2].bufferIndex, 5)
		assert.strictEqual(Tokenizer.tokenize("x332///{test}/cxzcxz}")[4].bufferIndex, 7)
		assert.strictEqual(Tokenizer.tokenize("/test/{test}/{cxzcxz}/")[0].bufferIndex, 0)
		assert.strictEqual(Tokenizer.tokenize("/{test}/{cxzcxz}/")[3].bufferIndex, 8)
		assert.strictEqual(Tokenizer.tokenize("{test}/{cxzcxz}/")[0].bufferIndex, 0)
		assert.strictEqual(Tokenizer.tokenize("/{test}")[1].bufferIndex, 1)
	})

	it("path", () => {
		assert.strictEqual(Tokenizer.tokenize("tes")[0].type, Token.TYPE.PATH)
		assert.strictEqual(Tokenizer.tokenize("/tes")[1].type, Token.TYPE.PATH)
		assert.strictEqual(Tokenizer.tokenize("/tes/")[1].type, Token.TYPE.PATH)
		assert.strictEqual(Tokenizer.tokenize("/tes/ds")[1].type, Token.TYPE.PATH)
		assert.strictEqual(Tokenizer.tokenize("/tes/ds")[3].type, Token.TYPE.PATH)
	})

	it("parameter", () => {
		assert.strictEqual(Tokenizer.tokenize("/test/{test}/{cxzcxz}")[3].type, Token.TYPE.PARAMETER)
		assert.strictEqual(Tokenizer.tokenize("/test/{test}/{cxzcxz}/")[5].type, Token.TYPE.PARAMETER)
		assert.strictEqual(Tokenizer.tokenize("/{test}/{cxzcxz}/")[1].type, Token.TYPE.PARAMETER)
		assert.strictEqual(Tokenizer.tokenize("/{test}/{cxzcxz}/")[3].type, Token.TYPE.PARAMETER)
		assert.strictEqual(Tokenizer.tokenize("{test}/{cxzcxz}/")[0].type, Token.TYPE.PARAMETER)
		assert.strictEqual(Tokenizer.tokenize("/{test}")[1].type, Token.TYPE.PARAMETER)
		assert.strictEqual(Tokenizer.tokenize("{test}/{cxzcxz}/regfdgfd")[2].type, Token.TYPE.PARAMETER)
	})

	it("invalidParameter", () => {
		assert.strictEqual(Tokenizer.tokenize("{test")[0].type, Token.TYPE.PATH)
		assert.strictEqual(Tokenizer.tokenize("test}")[0].type, Token.TYPE.PATH)
		assert.strictEqual(Tokenizer.tokenize("/test/{test}/{cxzcxz")[5].type, Token.TYPE.PATH)
	})

})
