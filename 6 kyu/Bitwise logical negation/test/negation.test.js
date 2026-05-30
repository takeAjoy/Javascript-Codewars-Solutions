const negation = require('../negation');

const { assert } = require('chai');
const { readFileSync } = require('fs');

describe('Restrictions', () => {
    const solution = readFileSync('/workspace/solution.txt', 'utf8');

    it('Character limit', () => {
        assert.isAtMost(solution.length, 28, `Exceeded character limit`);
    });

    it('Disallowed characters', () => {
        const regex = /[^0-9a-z()~&|^<=>+]/;
        const match = solution.match(regex);
        if (match) assert.fail(`Found disallowed character (${match[0]})`);
    });

    it('Plus character', () => {
        const regex = /[^+]/g;
        const count = solution.replace(regex, '').length;
        assert.isAtMost(count, 2, `Found more than 2 occurrences of (+)`);
    });

    it('Disallowed operators', () => {
        const patterns = [
            '&&=?',           // disallow: && &&=
            '\\|\\|=?',       // disallow: || ||=
            '===?',           // disallow: == ===
            '(?<!<)<=',       // disallow: <= allow: <<=
            '(?<!>)>=',       // disallow: >= allow: >>= >>>=
            '(?<!<)<(?!<)',   // disallow: <  allow: <<
            '(?<!>|=)>(?!>)', // disallow: >  allow: >> >>> =>
        ];
        const regex = RegExp(patterns.join('|'));
        const match = solution.match(regex);
        if (match) assert.fail(`Found disallowed operator (${match[0]})`);
    });
});

describe('Fixed tests', () => {
    const tests = [0, 1, -1, 32, -32, 65536, -65536, 1431655765, -1431655766, 2147483647, -2147483648, 0];
    for (const input of tests)
        it(`n = ${input}`, () => assert.strictEqual(negation(input), +!input));
});

describe('Random tests', () => {
    /**
     * Distribution:
     * 10% -> 0
     * 30% -> random signed 32 bit number rounded down to the nearest multiple of 32
     * 60% -> random signed 32 bit number
     */

    function randomInput() {
        const random = Math.random();
        const isZero = random < 0.1;
        if (isZero)
            return 0;
        const input = Math.random() * 2 ** 32 | 0;
        const isMultipleOf32 = random < 0.4;
        if (isMultipleOf32)
            return input >> 5 << 5;
        return input;
    }

    const tests = Array.from({ length: 200 }, randomInput);
    for (const input of tests)
        it(`n = ${input}`, () => assert.strictEqual(negation(input), +!input));
});