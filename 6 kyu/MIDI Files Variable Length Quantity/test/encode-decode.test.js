const { encode, decode } = require("../encode-decode");

const chai = require('chai');
const assert = chai.assert;
const _ = require('lodash');

function doTest(actual, expected, inp) {
    let message;
    if (Array.isArray(inp)) {
        message = `[${inp.map(x => `0x${x.toString(16).padStart(2, '0').toUpperCase()}`).join(',')}]`;
    } else {
        message = String(inp);
    }
    assert.deepEqual(actual, expected, `Input: ${message}`);
}

describe("Fixed Tests", () => {
    it('Single Byte Encoding', () => {
        const tests = [
            [0, [0x00]],
            [127, [0x7F]],
            [55, [0x37]],
            [69, [0x45]]
        ];
        for (let [inp, expected] of tests) doTest(encode(inp), expected, inp);
    });

    it('Single Byte Decoding', () => {
        const tests = [
            [[0x00], 0],
            [[0x7F], 127],
            [[0x37], 55],
            [[0x45], 69],
            // Extra trailing data
            [[0x00, 0x7F, 0x7F], 0],
            [[0x7F, 0x81, 0x00], 127],
            [[0x45, 0x45, 0x45], 69],
            [[0x37, 0xFF, 0xFF, 0x7F], 55]
        ];
        for (let [inp, expected] of tests) doTest(decode(inp), expected, inp);
    });

    it("Two Byte Encoding", () => {
        const tests = [
            [128, [0x81, 0x00]],
            [16383, [0xFF, 0x7F]],
            [8192, [0xC0, 0x00]],
            [6969, [0xB6, 0x39]]
        ];
        for (let [inp, expected] of tests) doTest(encode(inp), expected, inp);
    });

    it("Two Byte Decoding", () => {
        const tests = [
            [[0x81, 0x00], 128],
            [[0xFF, 0x7F], 16383],
            [[0xC0, 0x00], 8192],
            [[0xB6, 0x39], 6969],
            // Extra trailing data
            [[0x81, 0x00, 0xFF], 128],
            [[0xFF, 0x7F, 0x00], 16383],
            [[0xC0, 0x00, 0x81, 0x80, 0x00], 8192],
            [[0xB6, 0x39, 0xFF, 0xFF], 6969]
        ];
        for (let [inp, expected] of tests) doTest(decode(inp), expected, inp);
    });

    it("Three Byte Encoding", () => {
        const tests = [
            [16384, [0x81, 0x80, 0x00]],
            [2097151, [0xFF, 0xFF, 0x7F]],
            [1048576, [0xC0, 0x80, 0x00]],
            [123456, [0x87, 0xC4, 0x40]]
        ];
        for (let [inp, expected] of tests) doTest(encode(inp), expected, inp);
    });

    it("Three Byte Decoding", () => {
        const tests = [
            [[0x81, 0x80, 0x00], 16384],
            [[0xFF, 0xFF, 0x7F], 2097151],
            [[0xC0, 0x80, 0x00], 1048576],
            [[0x87, 0xC4, 0x40], 123456],
            // Extra trailing data
            [[0x81, 0x80, 0x00, 0x80, 0x80, 0x80, 0x00], 16384],
            [[0xFF, 0xFF, 0x7F, 0x81, 0x00], 2097151],
            [[0xC0, 0x80, 0x00, 0xFF, 0x7F], 1048576],
            [[0x87, 0xC4, 0x40, 0x00, 0x00], 123456],
        ];
        for (let [inp, expected] of tests) doTest(decode(inp), expected, inp);
    });

    it("Four Byte Encoding", () => {
        const tests = [
            [2097152, [0x81, 0x80, 0x80, 0x00]],
            [268435455, [0xFF, 0xFF, 0xFF, 0x7F]],
            [134217728, [0xC0, 0x80, 0x80, 0x00]],
            [69696969, [0xA1, 0x9D, 0xFB, 0x49]]
        ];
        for (let [inp, expected] of tests) doTest(encode(inp), expected, inp);
    });

    it("Four Byte Decoding", () => {
        const tests = [
            [[0x81, 0x80, 0x80, 0x00], 2097152],
            [[0xFF, 0xFF, 0xFF, 0x7F], 268435455],
            [[0xC0, 0x80, 0x80, 0x00], 134217728],
            [[0xA1, 0x9D, 0xFB, 0x49], 69696969],
            // Extra trailing data
            [[0x81, 0x80, 0x80, 0x00, 0x7F], 2097152],
            [[0xFF, 0xFF, 0xFF, 0x7F, 0x81, 0x00], 268435455],
            [[0xC0, 0x80, 0x80, 0x00, 0xFF, 0xFF, 0x7F], 134217728],
            [[0xA1, 0x9D, 0xFB, 0x49, 0x00, 0x00], 69696969]
        ];
        for (let [inp, expected] of tests) doTest(decode(inp), expected, inp);
    });
});

describe("Random Tests", () => {
    function refEncode(n) {
        let groups = [];
        while (true) {
            groups.push(n & 0x7F);
            n >>= 7;
            if (n === 0) break;
        }
        groups.reverse();
        for (let i = 0; i < groups.length - 1; ++i) groups[i] |= 0x80;
        return groups;
    }
    function generateRandomInputs() {
        const inputs = [];
        const ranges = [[0, 127], [128, 16383], [16384, 2097151], [2097152, 268435455]];
        for (const [low, high] of ranges) {
            for (let i = 0; i < 25; ++i) {
                inputs.push(_.random(low, high));
            }
        }
        return inputs;
    }
    function randomByte() {
        if (Math.random() < 0.6) return _.random(0x80, 0xFF);
        return _.random(0x00, 0x7F);
    }
    function withExtraData(data, chance = 0.7) {
        if (Math.random() > chance) return data;
        const extraLen = _.random(1, 5);
        const extra = Array.from({ length: extraLen }, () => randomByte());
        return data.concat(extra);
    }

    it("Random Encode", () => {
        const inputs = generateRandomInputs();
        for (const n of inputs) {
            const expected = refEncode(n);
            doTest(encode(n), expected, n);
        }
    });
    it("Random Decode", () => {
        const inputs = generateRandomInputs();
        for (const n of inputs) {
            const vlq = refEncode(n);
            const vlqWithExtra = withExtraData(vlq);
            doTest(decode(vlqWithExtra), n, vlqWithExtra);
        }
    });
    it("Random Round-Trip", () => {
        const inputs = generateRandomInputs();
        for (const n of inputs) {
            doTest(decode(encode(n)), n, n);
        }
    });
});