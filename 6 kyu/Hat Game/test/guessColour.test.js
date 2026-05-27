const guessColour = require('../guessColour');

const { assert } = require("chai");

const randint = (a, b) => (Math.random() * (b - a + 1) | 0) + a;

function* runGameSteps(hats, func = guessColour, ran = false) {
    const hatsCopy = [...hats];
    const guesses = [];
    let wrong = 0;
    let n = ran ? randint(1, hats.length + 2) : -1;
    let current, guess;
    while (hatsCopy.length) {
        yield true;
        current = hatsCopy.shift();
        guess = func(guesses, [...hatsCopy]);
        if (!["Red", "Blue"].includes(guess))
            return assert.fail(`Your function must return a valid guess! ("Red" or "Blue")\nInstead it returned: ${guess}`);
        if (!(--n)) {
            func([], hats.map(v => Math.random() > .5 ? "Red" : "Blue"));
            n = randint(1, hats.length + 2);
        }
        guesses.push(guess);
        wrong += (current != guess);
        if (wrong > 1) {
            if (hats.length < 30) return assert.fail(`Too many wrong guesses!\nHat colours: [${hats.join(', ')}]\nGuesses: [${guesses.join(', ')}]`);
            return assert.fail("Too many wrong guesses!")
        }
    }
    assert(true);
}

function runGame(hats, func = guessColour, ran = false) {
    Array.from(runGameSteps(hats, func, ran));
}

describe("Sample tests", function () {
    it("Should work for teams of 2", function () {
        runGame(["Blue", "Red"]);
        runGame(["Red", "Blue"]);
        runGame(["Red", "Red"]);
        runGame(["Blue", "Blue"]);
    });
    it("Should work for teams of 3", function () {
        runGame(["Blue", "Red", "Blue"]);
        runGame(["Red", "Red", "Red"]);
        runGame(["Red", "Red", "Blue"]);
    });
    it("Should work for teams of 4", function () {
        runGame(["Blue", "Red", "Blue", "Red"]);
        runGame(["Red", "Red", "Red", "Red"]);
        runGame(["Blue", "Blue", "Blue", "Red"]);
    });
    it("Should work for larger teams", function () {
        runGame(["Red", "Red", "Blue", "Blue", "Blue", "Red", "Red"]);
        runGame(["Red", "Red", "Red", "Red", "Red", "Red", "Blue", "Red", "Red"]);
    });
    it("Should work for multiple games running at the same time", function () {
        const teams = [["Red", "Red", "Blue"], ["Blue", "Blue", "Red"], ["Red", "Blue", "Blue"]].map(v => runGameSteps(v));
        for (const team of [1, 2, 0, 0, 2, 1, 2, 1, 2, 0, 1, 0]) {
            teams[team].next();
        }
    });
});

describe("Full tests", function () {
    it("Should be consistent", function () {
        const cache = {};
        for (let i = 0; i < 2 ** 8; i++) {
            const inp = Array.from({ length: 8 }, (_, j) => 2 ** j & i ? "Red" : "Blue");
            cache[i] = Array(8).fill(null);
            for (let j = 0; j < 8; j++) {
                const val = guessColour(inp.slice(0, -j - 1), j ? inp.slice(-j) : []);
                cache[i][7 - j] = val;
            }
        }
        function cachedSol(guesses, hats) {
            const s = [...guesses, "Red", ...hats].reduce((a, c, i) => a + (2 ** i * (c == "Red")), 0);
            return cache[s][guesses.length];
        }

        runGame(["Red", "Blue", "Red", "Blue", "Red", "Red", "Blue", "Blue"], cachedSol);
        runGame(["Red", "Red", "Red", "Red", "Red", "Red", "Red", "Red"], cachedSol);
        runGame(["Blue", "Blue", "Blue", "Red", "Red", "Red", "Blue", "Red"], cachedSol);
        runGame(["Red", "Blue", "Red", "Red", "Blue", "Red", "Blue", "Blue"], cachedSol);
        runGame(["Blue", "Blue", "Red", "Blue", "Red", "Red", "Blue", "Red"], cachedSol);
        runGame(["Red", "Red", "Blue", "Blue", "Red", "Red", "Blue", "Blue"], cachedSol);
        runGame(["Red", "Red", "Red", "Blue", "Blue", "Blue", "Red", "Blue"], cachedSol);
        runGame(["Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue"], cachedSol);
    });

    it("Random Tests", function () {
        for (let i = 0; i < 100; i++) {
            const inp = Array.from({ length: randint(2, 1000) }, () => Math.random() > .5 ? "Red" : "Blue");
            runGame(inp, undefined, ran = true);
        }
    });
});