const twoSum = require("../twoSum");

describe("Fixed Tests", function () {

    const chai = require("chai"), { assert } = chai;

    function doTest(numbers, targetSum) {
        const [idx0, idx1] = twoSum(numbers.slice(), targetSum);
        const num0 = numbers[idx0], num1 = numbers[idx1], actSum = num0 + num1;

        const message = `for target sum = ${targetSum} and numbers = [${numbers.join(', ')}]\n`;

        assert.notEqual(idx0, idx1,
            message + `the two indices must be different, but got [${[idx0, idx1]}]\n`
        );
        assert.strictEqual(actSum, targetSum,
            message + `array[${idx0}] = ${num0}, array[${idx1}] = ${num1}\n` +
            `${num0} + ${num1} = ${actSum}\n`
        );
    }

    it('Fixed Tests', function () {
        doTest([1, 2, 3], 4);
        doTest([1234, 5678, 9012], 14690);
        doTest([2, 2, 3], 4);
        doTest([2, 3, 1], 3);
    });

    function randInt(min, max) { // both inclusive
        min = Math.ceil(min), max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    it('Random Tests', function () {
        for (let i = 0; i < 100; i++) {
            const numbers = Array.from(
                { length: randInt(2, 50) },
                _ => randInt(-1000, +1000)
            );
            const idx0 = randInt(0, numbers.length - 1);
            do
                var idx1 = randInt(0, numbers.length - 1);
            while (idx0 === idx1);
            doTest(numbers, numbers[idx0] + numbers[idx1]);
        }
    });
});