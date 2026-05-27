const hasSubpattern = require("../hasSubpattern");

const { assert, config } = require('chai');
config.truncateThreshold = 0;
const _ = require('lodash');

describe("Basic tests", () => {
    const testCases = [
        ["a", false],
        ["AA", true],
        ["444", true],
        ["aaaa", true],
        ["abcd", false],
        ["babababababababa", true],
        ["bbabbaaabbaaaabb", true],
        ["ababababa", false],
        ["aaaabb", true],
        ["abbb", false],
        ["123a123a123a", true],
        ["123A123a123a", false],
        ["12aa13a21233", true],
        ["12aa13a21233A", false],
        ["aabbbbbbaa", true],
        ["abcdabcaccd", false],
        ["aaabbbccccdddddddd", false],
    ];
    for (const [input, expected] of testCases)
        it(`hasSubPattern("${input}")`, () => assert.strictEqual(hasSubpattern(input), expected));
});

describe("Random tests", () => {
    const randint = (a, b) => ~~(Math.random() * (b - a + 1)) + a;
    const repeat = (a, n) => Array.from({ length: n }, () => a).flat();
    const solgcd = (a, b) => b ? solgcd(b, a % b) : a;
    const sol = s => (r => Object.values(r).reduce((a, b) => solgcd(a, b)) > 1)([...s].reduce((a, b) => { a[b] = (a[b] || 0) + 1; return a; }, {}));
    const base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    it("Testing 500 random strings", () => {
        for (let i = 0; i < 500; i++) {
            let chars = Array.from({ length: randint(1, 50) }, () => _.sample(base))
            if (randint(0, 1)) {
                chars = _.shuffle(repeat(chars, randint(2, 10)));
                if (chars.length > 1 && randint(0, 1)) chars = chars.slice(0, -randint(1, chars.length - 1));
            }
            const s = chars.join('');
            const expected = sol(s);
            assert.strictEqual(hasSubpattern(s), expected, `hasSubpattern("${s}")`);
        }
    });
});