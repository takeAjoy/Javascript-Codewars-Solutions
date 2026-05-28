const toWeirdCase = require("../toWeirdCase");

describe('Tests', function () {

    const { assert } = require('chai');

    function doTest(input, expected) {
        const actual = toWeirdCase(input);
        const message = `for ${JSON.stringify(input)}\n`;
        assert.strictEqual(actual, expected, message);
    }

    it('Fixed Tests', function () {
        doTest('This is a test', 'ThIs Is A TeSt');
        doTest('', '');
        doTest('unique', 'UnIqUe');
        doTest('UPPER CASE', 'UpPeR CaSe');
        doTest('lower case', 'LoWeR CaSe');
    });

    function solution(string) {
        return string.split(' ')
            .map(word => [...word]
                .map((ch, i) => ch[(i % 2) ? 'toLowerCase' : 'toUpperCase']())
                .join('')
            )
            .join(' ')
            ;
    }

    function randInt(from, to) {
        return Math.floor(from + Math.random() * (to - from + 1));
    }

    function randLetter() {
        const lower = String.fromCodePoint(randInt('a'.codePointAt(0), 'z'.codePointAt(0)));
        return lower[randInt(0, 1) ? 'toUpperCase' : 'toLowerCase']();
    }

    function randWord() {
        return Array.from({ length: randInt(1, 10) }, randLetter).join('');
    }

    function randString() {
        return Array.from({ length: randInt(0, 10) }, randWord).join(' ');
    }

    it('Random Tests', function () {
        for (let i = 0; i < 100; i++) {
            const input = randString();
            const expected = solution(input);
            doTest(input, expected);
        }
    });
});