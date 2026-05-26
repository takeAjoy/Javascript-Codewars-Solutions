const delta = require("../delta");

const chai = require('chai')
const _ = require('lodash')
const assert = chai.assert

const firstN = (generator, n) => _.times(n, _ => generator.next().value)

describe("Fixed Tests", () => {
    it("Should work for simple cases", () => {
        assert.deepEqual([...delta([1, 2, 3, 4, 5, 6], 1)], [1, 1, 1, 1, 1], 'delta([ 1, 2, 3, 4, 5, 6 ], 1)')
        assert.deepEqual([...delta([3, 3, -5, 77], 2)], [-8, 90], 'delta([ 3, 3, -5, 77 ], 2)')
        assert.deepEqual([...delta(Array(10).fill(1.5), 9)], [0], 'delta(Array(10).fill(1.5), 9)')
        assert.deepEqual([...delta([1, -1, 1, -1], 3)], [-8], 'delta([ 1, -1, 1, -1 ], 3)')
    })

    it("Should work for endless generators", () => {
        function* ones() { while (true) yield 1 }
        assert.deepEqual(firstN(delta(ones(), 1), 1000), Array(1000).fill(0), 'firstN(delta(ones(), 1), 1000) [implementation of ones & firstN in sample tests]')
        assert.deepEqual(firstN(delta(ones(), 100), 1000), Array(1000).fill(0), 'firstN(delta(ones(), 100), 1000) [implementation of ones & firstN in sample tests]')

        function* up() {
            for (let a = 0n, b = 1n; true; [a, b] = [a + b, b + 3n])
                yield a
        }
        assert.deepEqual(firstN(delta(up(), 1), 10), [1n, 4n, 7n, 10n, 13n, 16n, 19n, 22n, 25n, 28n], 'firstN(delta(up(), 1), 10) [implementation of up & firstN in sample tests]')
        assert.deepEqual(firstN(delta(up(), 2), 10), Array(10).fill(3n), 'firstN(delta(up(), 2), 10) [implementation of up & firstN in sample tests]')
    })
})

describe("Random Tests", () => {
    // Sample solution.
    function _sol(seq, n) {
        function* d(itr) {
            let last = itr.next().value
            for (const value of itr) {
                yield value - last
                last = value
            }
        }
        let itr = seq[Symbol.iterator]()
        for (let i = 0; i < n; ++i) itr = d(itr)
        return itr
    }

    it("Lite Tests", () => {
        _.times(250).map(() => {
            const n = _.random(1, 100)
            const arr = Array.from(Array(n * 3), () => _.random(-2000, 2000))
            const expected = [..._sol(arr, n)]
            assert.deepEqual([...delta(arr, n)], expected, 'Incorrect output')
        })
    })

    it("Generator Tests", () => {
        _.times(250).map(() => {
            const n = _.random(1, 10)
            const randArr = Array.from(Array(20), () => _.random(-10, 10)).map(BigInt)

            function* endlos() {
                let arr = [...randArr]
                while (true) {
                    yield arr.at(-1);
                    _.range(1, arr.length).forEach(n => {
                        arr[n] += arr[n - 1]
                    })
                }
            }

            const expected = firstN(_sol(endlos(), n), 100)

            assert.deepEqual(firstN(delta(endlos(), n), 100), expected, 'Incorrect output')
        })
    })
})