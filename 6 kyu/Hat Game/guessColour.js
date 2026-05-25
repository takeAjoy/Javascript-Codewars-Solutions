/*
Link: https://www.codewars.com/kata/618647c4d01859002768bc15
Kata: Hat Game
Author: Kacarott
Tags: Riddles
*/
const guessColour = (g, h) => {
    const r = h.reduce((a, c) => a + (c == "Red"), 0);
    return !g.length
        ? r % 2 ? "Red" : "Blue"
        : ((g.slice(1).reduce((a, c) => a + (c == "Red"), 0) + r) % 2 ==
            (g[0] == "Red"))
            ? "Blue"
            : "Red";
};