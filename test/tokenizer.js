import Tokenizer from "../src/tokenizer.js"
import Token from "../src/token.js"

export function schema(test) {
	test.expect(7)
	const tokens = Tokenizer.tokenize("/test/{xtest}")
	test.ok(tokens instanceof Array)
	test.strictEqual(Object.hasOwnProperty.call(tokens[0], "_bufferIndex"), true)
	test.strictEqual(Object.hasOwnProperty.call(tokens[0], "_buffer"), true)
	test.strictEqual(Object.hasOwnProperty.call(tokens[0], "_type"), true)
	test.strictEqual(typeof tokens[0].bufferIndex, "number")
	test.strictEqual(typeof tokens[0].buffer, "string")
	test.strictEqual(typeof tokens[0].type, "string")
	test.done()
}

export function buffer(test) {
	test.expect(12)
	test.strictEqual(Tokenizer.tokenize("dsadsads")[0].buffer, "dsadsads")
	test.strictEqual(Tokenizer.tokenize("x332/{test}/{cxzcxz}")[0].buffer, "x332")
	test.strictEqual(Tokenizer.tokenize("x332///{test}/cxzcxz}")[1].buffer, "/")
	test.strictEqual(Tokenizer.tokenize("x332///{test}/cxzcxz}")[2].buffer, "/")
	test.strictEqual(Tokenizer.tokenize("x332///{test}/cxzcxz}")[3].buffer, "/")
	test.strictEqual(Tokenizer.tokenize("/test/{test}/{cxzcxz}/")[5].buffer, "{cxzcxz}")
	test.strictEqual(Tokenizer.tokenize("/{test}/{cxzcxz}/")[1].buffer, "{test}")
	test.strictEqual(Tokenizer.tokenize("/{test}/{cxzcxz}/")[2].buffer, "/")
	test.strictEqual(Tokenizer.tokenize("{test}/{cxzcxz}/")[0].buffer, "{test}")
	test.strictEqual(Tokenizer.tokenize("{test}/{cxzcxz}/regfdgfd")[4].buffer, "regfdgfd")
	test.strictEqual(Tokenizer.tokenize("/{test}")[0].buffer, "/")
	test.strictEqual(Tokenizer.tokenize("/{test}")[1].buffer, "{test}")
	test.done()
}

export function bufferIndex(test) {
	test.expect(8)
	test.strictEqual(Tokenizer.tokenize("dsaczxrwqadas")[0].bufferIndex, 0)
	test.strictEqual(Tokenizer.tokenize("/x332/{test}/{cxzcxz}")[1].bufferIndex, 1)
	test.strictEqual(Tokenizer.tokenize("x332/{test}/{cxzcxz}")[2].bufferIndex, 5)
	test.strictEqual(Tokenizer.tokenize("x332///{test}/cxzcxz}")[4].bufferIndex, 7)
	test.strictEqual(Tokenizer.tokenize("/test/{test}/{cxzcxz}/")[0].bufferIndex, 0)
	test.strictEqual(Tokenizer.tokenize("/{test}/{cxzcxz}/")[3].bufferIndex, 8)
	test.strictEqual(Tokenizer.tokenize("{test}/{cxzcxz}/")[0].bufferIndex, 0)
	test.strictEqual(Tokenizer.tokenize("/{test}")[1].bufferIndex, 1)
	test.done()
}

export function path(test) {
	test.expect(5)
	test.strictEqual(Tokenizer.tokenize("tes")[0].type, Token.TYPE.PATH)
	test.strictEqual(Tokenizer.tokenize("/tes")[1].type, Token.TYPE.PATH)
	test.strictEqual(Tokenizer.tokenize("/tes/")[1].type, Token.TYPE.PATH)
	test.strictEqual(Tokenizer.tokenize("/tes/ds")[1].type, Token.TYPE.PATH)
	test.strictEqual(Tokenizer.tokenize("/tes/ds")[3].type, Token.TYPE.PATH)
	test.done()
}

export function parameter(test) {
	test.expect(7)
	test.strictEqual(Tokenizer.tokenize("/test/{test}/{cxzcxz}")[3].type, Token.TYPE.PARAMETER)
	test.strictEqual(Tokenizer.tokenize("/test/{test}/{cxzcxz}/")[5].type, Token.TYPE.PARAMETER)
	test.strictEqual(Tokenizer.tokenize("/{test}/{cxzcxz}/")[1].type, Token.TYPE.PARAMETER)
	test.strictEqual(Tokenizer.tokenize("/{test}/{cxzcxz}/")[3].type, Token.TYPE.PARAMETER)
	test.strictEqual(Tokenizer.tokenize("{test}/{cxzcxz}/")[0].type, Token.TYPE.PARAMETER)
	test.strictEqual(Tokenizer.tokenize("/{test}")[1].type, Token.TYPE.PARAMETER)
	test.strictEqual(Tokenizer.tokenize("{test}/{cxzcxz}/regfdgfd")[2].type, Token.TYPE.PARAMETER)
	test.done()
}

export function invalidParameter(test) {
	test.expect(3)
	test.strictEqual(Tokenizer.tokenize("{test")[0].type, Token.TYPE.PATH)
	test.strictEqual(Tokenizer.tokenize("test}")[0].type, Token.TYPE.PATH)
	test.strictEqual(Tokenizer.tokenize("/test/{test}/{cxzcxz")[5].type, Token.TYPE.PATH)
	test.done()
}
