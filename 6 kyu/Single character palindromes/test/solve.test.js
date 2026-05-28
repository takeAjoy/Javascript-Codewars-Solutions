const solve = require("../solve");

const _ = require("lodash");
const { assert } = require('chai');

describe('Submission tests', function () {

    function doTest(s, expected) {
        assert.strictEqual(solve(s), expected, `solve("${s}")`);
    }

    it("Basic tests", function () {
        doTest("abba", "OK");
        doTest("abbaa", "remove one");
        doTest("abbaab", "not possible");
        doTest("madmam", "remove one");
        doTest("raydarm", "not possible");
        doTest("hannah", "OK");
    });

    it("Edge cases", function () {
        doTest("baba", "remove one")
        doTest("babab", "OK")
        doTest("bababa", "remove one")
        doTest("abcbad", "remove one")
        doTest("abcdba", "remove one")
        doTest("dabcba", "remove one")
        doTest("abededba", "remove one")
        doTest("abdcdeba", "remove one")
        doTest("abcdedba", "remove one")
        doTest("abbcdedba", "not possible")
    });

    it("Random tests", function () {
        for (let i = 0; i < 250; i++) {
            let s = randoms();
            let expected = refSol(s);
            doTest(s, expected);
        }
    });
});

function palin(s, lo, hi) {
    while (lo < hi) {
        if (s[lo] != s[hi]) return false;
        lo++; hi--;
    }
    return true;
}
function refSol(s) {
    let lo = 0; let hi = s.length - 1;
    while (lo < hi) {
        if (s[lo] == s[hi]) {
            lo++; hi--;
        }
        else {
            if (palin(s, lo + 1, hi) || palin(s, lo, hi - 1))
                return "remove one";
            return "not possible"
        }
    }
    return "OK"
}

function randoms() {
    let palindromesX89ui = ['racecar', 'onino', 'anna', 'ana', 'alula', 'murdrum', 'wesew', 'boob', 'birdrib', 'babybab', 'camac', 'civic', 'campmac', 'deified', 'deleveled', 'devoved', 'dewed', 'detartrated', 'diallaid', 'dontnod', 'drawward', 'dumbmud', 'drawnonward', 'elle', 'eve', 'evilolive', 'evitative', 'godog', 'hanah', 'hannah', 'ipreferpi', 'kayak', 'kahak', 'kanakanak', 'kinikinik', 'lemel', 'level', 'lionoil', 'liveevil', 'madam', 'minim', 'mirrorim', 'mom', 'mygym', 'nattan', 'noon', 'nursesrun', 'pottop', 'refer', 'reifier', 'repaper', 'rotator', 'roravator', 'rotor', 'radar', 'sagas', 'sexes', 'solos', 'stats', 'tenet', 'terret', 'testset', 'toidiot', 'topspot'];
    let validPalin = palindromesX89ui[_.random(0, palindromesX89ui.length - 1)];
    let r = _.random(0, validPalin.length - 1);
    let r0 = _.random(1, 8);
    let letters = "abcdefghijklmnopqrstuvwxyz";
    if (r0 < 3) return validPalin.slice(0, r) + letters[_.random(0, 25)] + validPalin.slice(r);
    else if (r0 < 6) return validPalin;
    else return validPalin.slice(0, r) + letters[_.random(0, 25)] + validPalin.slice(r) + letters[_.random(0, 25)];
}