/*
Link: https://www.codewars.com/kata/618647c4d01859002768bc15
Kata: Hat Game
Author: Kacarott
Tags: Riddles
*/
const countRedAmount = (arr) => arr.reduce((a, c) => a + (c == "Red"), 0)

const guessColour = (g, h) => {
    const r = countRedAmount(h)
    return !g.length
        ? r % 2 ? "Red" : "Blue"
        : ((countRedAmount(g.slice(1)) + r) % 2 ==
            (g[0] == "Red"))
            ? "Blue"
            : "Red";
};

module.exports = guessColour;