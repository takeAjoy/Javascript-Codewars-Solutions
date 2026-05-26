const arrayDiff = require("../arrayDiff");

const chai = require("chai");
const assert = chai.assert;
chai.config.truncateThreshold = 0;

describe("Basic tests", () => {
    it("Should pass Basic tests", () => {
        assert.deepEqual(arrayDiff([1, 2], [1]), [2], "a was [1,2], b was [1]");
        assert.deepEqual(arrayDiff([1, 2, 2], [1]), [2, 2], "a was [1,2,2], b was [1]");
        assert.deepEqual(arrayDiff([1, 2, 2], [2]), [1], "a was [1,2,2], b was [2]");
        assert.deepEqual(arrayDiff([1, 2, 2], []), [1, 2, 2], "a was [1,2,2], b was []");
        assert.deepEqual(arrayDiff([], [1, 2]), [], "a was [], b was [1,2]");
        assert.deepEqual(arrayDiff([1, 2, 3], [1, 2]), [3], "a was [1,2,3], b was [1,2]")
    });
});

describe("Random tests", () => {
    const array_diff_sol = (a, b) => a.filter(e => !b.includes(e));
    function shuffle(arr) {
        for (let cIdx = arr.length - 1; cIdx > 0; cIdx--) {
            let rIdx = Math.floor(Math.random() * (cIdx + 1));
            [arr[cIdx], arr[rIdx]] = [arr[rIdx], arr[cIdx]]
        }
        return arr
    }
    const generateRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    for (let i = 0; i < 40; i++) {
        let a, b, expected, aLength, bLength;
        a = [];
        b = [];
        aLength = generateRandomInt(0, 20);
        bLength = generateRandomInt(0, aLength);
        for (let j = 0; j < aLength; j++)
            a.push(generateRandomInt(0, 40) - 20);
        b = shuffle(a).slice(0, generateRandomInt(0, aLength));
        expected = array_diff_sol(a, b);
        it("Testing for arrayDiff([" + a + "],[" + b + "])", () => {
            assert.deepEqual(arrayDiff(a, b), expected, "Should work for random arrays too");
        });
    }
});