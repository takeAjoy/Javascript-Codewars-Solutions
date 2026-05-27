const countCheckerboard = require('../countCheckerboard');

const chai = require("chai");
const assert = chai.assert;


function runTest(w, h, r, a) {
    assert.strictEqual(countCheckerboard(w, h, r), a, `Board size = (${w}n, ${h}n) with resolution = ${r}n\n`);
}

const randInt = (a, b) => Math.random * (b - a + 1) + a

describe("Example tests", function () {
    it("Small examples", function () {
        // From the description
        runTest(11n, 6n, 1n, 33n);
        runTest(11n, 6n, 2n, 32n);
        runTest(11n, 6n, 5n, 31n);

        // More basic examples
        runTest(9n, 5n, 2n, 22n);
        runTest(9n, 5n, 4n, 21n);
        runTest(9n, 5n, 8n, 5n);
    });

    it("Larger examples", function () {
        runTest(123456n, 7654321n, 333n, 472485924597n);
        runTest(10n ** 10n, 10n, 20n, 5n * 10n ** 10n);
        runTest(10n ** 10n, 11n, 21n, 54999999978n);
        runTest(8n ** 5n, 7n ** 9n, 124n, 661153496464n);
    });

    it("Some edge cases?", function () {
        runTest(0n, 123n, 1n, 0n);
        runTest(445n, 998n, 101010n, 0n);
        runTest(0n, 0n, 1n, 0n);
        runTest(8n, 9n, 7n, 21n);
    });
});

describe("Random tests", function () {
    const max = (a, b) => a > b ? a : b;
    const min = (a, b) => a > b ? b : a;
    function solve(x, y, n) {
        const dx = x % (2n * n), dy = y % (2n * n);
        const side = (a, b) => max(0n, (a % (2n * n) - n) * min(n, b % (2n * n)));
        const edges = side(dx, dy) + side(dy, dx);
        return (x * y - dx * dy) / 2n + edges;
    }

    function randBigInt(a, b) {
        const lim = String(b - a);
        let res = '', limRange = true;
        for (const digit of lim) {
            const n = Math.floor(Math.random() * (limRange ? Number(digit) + 1 : 10));
            res += n;
            limRange = limRange && (Number(digit) === n);
        }
        return BigInt(res) + a;
    }

    it("Small tests", function () {
        for (let i = 1; i <= 200; i++) {
            const w = randBigInt(0n, 100n);
            const h = randBigInt(0n, 100n);
            const r = randBigInt(1n, Math.random() > 0.1 ? max(w, h) : 100n);
            const sol = solve(w, h, r);
            runTest(w, h, r, sol);
        }
    });

    it("Large tests", function () {
        for (let i = 201; i <= 400; i++) {
            const w = randBigInt(0n, 10n ** 32n - 1n);
            const h = randBigInt(0n, 10n ** 32n - 1n);
            const r = randBigInt(1n, Math.random() > 0.1 ? max(w, h) : 10n ** 32n - 1n);
            const sol = solve(w, h, r);
            runTest(w, h, r, sol);
        }
    });
});