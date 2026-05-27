/*
Link: https://www.codewars.com/kata/5a4a391ad8e145cdee0000c4
Kata: String subpattern recognition II
Author: GiacomoSorbi
Tags: Strings, Regular Expressions, Fundamentals
*/
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function hasSubpattern(string) {
    let obj = {};
    for (let k of string) {
        obj[k] = (obj[k] || 0) + 1;
    }
    return Object.values(obj).reduce((acc, el) => gcd(acc, el)) > 1
}

module.exports = hasSubpattern;