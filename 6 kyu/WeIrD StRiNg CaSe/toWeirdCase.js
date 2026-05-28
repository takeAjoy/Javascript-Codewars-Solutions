/*
Link: https://www.codewars.com/kata/52b757663a95b11b3d00062d
Kata: WeIrD StRiNg CaSe
Author: xDranik
Tags: Strings, Algorithms
*/
function toWeirdCase(string) {
    return string.split` `.map((el) => el.split``.map((el2, i) => i % 2 ? el2.toLowerCase() : el2.toUpperCase()).join``).join` `
}

module.exports = toWeirdCase;