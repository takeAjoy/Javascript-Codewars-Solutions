const berlinClock = require('../berlinClock');
const chai = require('chai')
const _ = require('lodash')
const assert = chai.assert
chai.config.truncateThreshold = 0

function runTest(input, expected) {
    it(`berlinClock(${JSON.stringify(input)})`, () => {
        assert.equal(berlinClock(input), expected)
    })
}

describe("fixed tests", () => {
    runTest("12:56:01", "O\nRROO\nRROO\nYYRYYRYYRYY\nYOOO")
    runTest("00:00:00", "Y\nOOOO\nOOOO\nOOOOOOOOOOO\nOOOO")
    runTest("22:32:45", "O\nRRRR\nRROO\nYYRYYROOOOO\nYYOO")
})

describe("random tests", () => {
    function reference(time) {
        let arr = time.split(':'), hour = arr[0], min = arr[1], sec = arr[2], seconds = sec % 2 == 0 ? "Y" : "O", topHours = 'R'.repeat(Math.floor(hour / 5)) + 'O'.repeat(4 - Math.floor(hour / 5)).trim(), bottomHours = 'R'.repeat(Math.floor(hour % 5)) + 'O'.repeat(4 - Math.floor(hour % 5)).trim(), topMinutes = Array(Math.floor(min / 5)).fill('Y').concat(Array(11 - Math.floor(min / 5)).fill('O')).join('').replace(/YYY/g, "YYR"), bottomMinutes = 'Y'.repeat(Math.floor(min % 5)) + 'O'.repeat(4 - Math.floor(min % 5)).trim();
        return seconds + "\n" + topHours + "\n" + bottomHours + "\n" + topMinutes + "\n" + bottomMinutes;
    }
    // every possible minute, once with random odd, once with random even second, 1440*2 tests
    let cases = []
    _.range(0, 1440).forEach(t => {
        const hour = Math.floor(t / 60)
        const min = Math.floor(t % 60)
        const oddSec = _.random(0, 29) * 2 + 1
        const evenSec = _.random(0, 29) * 2
        cases.push(`${_.padStart(hour, 2, "0")}:${_.padStart(min, 2, "0")}:${_.padStart(oddSec, 2, "0")}`)
        cases.push(`${_.padStart(hour, 2, "0")}:${_.padStart(min, 2, "0")}:${_.padStart(evenSec, 2, "0")}`)
    })
    _.shuffle(cases).forEach(c => runTest(c, reference(c)))
})