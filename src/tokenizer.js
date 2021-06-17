/** @module tokenizer */

import Token from "./token.js"

/**
 * @memberof: module:tokenizer
 */
class Tokenizer {

	static SEPARATOR = "/"
	static PARAMETER_PREFIX = "{"
	static PARAMETER_SUFFIX = "}"


	/**
	 * @param  {string} input
	 * @return {Token[]}
	 */
	static tokenize(input) {
		const tokens = []
		const characters = [...input]
		let buffer = ""
		for (const [index, character] of characters.entries()) {
			buffer += character
			const bufferIndex = index - buffer.length + 1
			if (buffer[0] === Tokenizer.PARAMETER_PREFIX && character === Tokenizer.PARAMETER_SUFFIX) {
				if(buffer.length === 1) {
					continue
				}
				tokens.push(new Token(Token.TYPE.PARAMETER, buffer, bufferIndex))
				buffer = ""
			} else if (buffer[0] === Tokenizer.PARAMETER_PREFIX) {
				if(buffer.length === 1) {
					continue
				}
				if (character === Tokenizer.SEPARATOR) {
					tokens.push(new Token(Token.TYPE.PATH, buffer.slice(-1), bufferIndex))
					tokens.push(new Token(Token.TYPE.SEPARATOR, character, bufferIndex - buffer.length))
					buffer = ""
				} else if(index === characters.length - 1) {
					tokens.push(new Token(Token.TYPE.PATH, buffer, bufferIndex))
				}
			} else if (character === Tokenizer.SEPARATOR) {
				tokens.push(new Token(Token.TYPE.SEPARATOR, buffer, bufferIndex))
				buffer = ""
			} else {
				const lastToken = tokens[tokens.length - 1]
				if(lastToken && lastToken.type === Token.TYPE.PATH) {
					tokens[tokens.length - 1] = new Token(Token.TYPE.PATH, lastToken.buffer + buffer, lastToken.bufferIndex)
				} else {
					tokens.push(new Token(Token.TYPE.PATH, buffer, bufferIndex))
				}
				buffer = ""
			}
		}
		return tokens
	}

}

export default Tokenizer
