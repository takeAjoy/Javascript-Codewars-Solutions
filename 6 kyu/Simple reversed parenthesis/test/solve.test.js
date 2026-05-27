const solve = require('../solve');

describe("tests", function () {
    const { assert } = require('chai');

    it("Basic tests", function () {
        assert.strictEqual(solve(")()("), 2);
        assert.strictEqual(solve("((()"), 1);
        assert.strictEqual(solve("((("), -1);
        assert.strictEqual(solve("())((("), 3);
        assert.strictEqual(solve("())()))))()()("), 4);
    });

    function refsol(str) {
        if (str.length % 2) return -1;
        let s = [];
        for (let i = 0; i < str.length; i++) {
            if (str[i] == ')' && s.length > 0) {
                if (s[s.length - 1] == '(') s.pop();
                else s.push(str[i])
            }
            else s.push(str[i]);
        }
        let n = 0, len = s.length;
        while (s.length > 0 && s[s.length - 1] == '(') {
            s.pop();
            n++;
        }
        return len / 2 + n % 2
    }

    const _ = require("lodash");

    function randomsk() {
        let len = _.random(2, 15), braces = "()";
        let i = 0, small = '', large = '';
        while (i < len) {
            let brace = _.random(0, 1);
            small += braces[brace];
            i++;
        }
        i = 0; len = _.random(2, 1000);
        while (i < len) {
            brace = _.random(0, 1)
            large += braces[brace];
            i++;
        }
        return [small, large];
    }

    it("Random tests", function () {
        for (let i = 0; i < 100; i++) {
            const [small, large] = randomsk();
            assert.strictEqual(solve(small), refsol(small));
            assert.strictEqual(solve(large), refsol(large));
        }
    });
});