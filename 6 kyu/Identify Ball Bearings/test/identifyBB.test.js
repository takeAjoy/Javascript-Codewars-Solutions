const identifyBB = require("../identifyBB");

const { assert } = require("chai");
const rnd = (m, n = 0) => Math.floor(Math.random() * (n - m) + m);
const elements = xs => xs[rnd(xs.length)];

describe("Identify Ball Bearings", function () {
    it("fixed tests", function () {
        const a = new Bearing(0), b = new Bearing(1), c = new Bearing(2), d = new Bearing(3), e = new Bearing(4);
        assert(identifyBB([a, b], buildWeigh(a)) === a, "You did not identify the deluxe bearing");
        assert(identifyBB([a, b, c], buildWeigh(c)) === c, "You did not identify the deluxe bearing");
        assert(identifyBB([a, b, c], buildWeigh(b)) === b, "You did not identify the deluxe bearing");
        assert(identifyBB([a, b, c, d, e], buildWeigh(d)) === d, "You did not identify the deluxe bearing");
    });
    it("random tests", function () {
        for (let i = 1; i <= 200; i++) {
            const [bearings, weigh, expected] = rndTest(i);
            assert(identifyBB(bearings, weigh) === expected, "You did not identify the deluxe bearing");
        }
    });
});

class Bearing extends Number {
    toString() { return `Bearing from Box ${this.valueOf()}`; }
}

function buildWeigh(deluxe) {
    let used = false;
    return function weigh(...bearings) {
        if (used)
            throw new Error("weigh has already been used!");
        else if (!bearings.every(bearing => bearing instanceof Bearing))
            throw new Error("all arguments should be bearings!");
        else {
            used = true;
            return bearings.reduce((weight, bearing) => weight + 10 + Number(bearing === deluxe), 0);
        }
    };
}

function rndTest(size) {
    const bearings = Array.from({ length: size }, (_, i) => new Bearing(i));
    const expected = elements(bearings);
    const weigh = buildWeigh(expected);
    return [bearings, weigh, expected];
}