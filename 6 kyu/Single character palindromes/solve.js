/*
Link: https://www.codewars.com/kata/5a2c22271f7f709eaa0005d3
Kata: Single character palindromes
Author: KenKamau
Tags: Algorithms
*/
const isp = (a) => {
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== a[a.length - 1 - i]) return false;
    }
    return true;
}

function solve(s) {
    if (isp(s)) return "OK";
    for (let i = 0; i < s.length; i++) {
        let newS = s.split``; newS.splice(i, 1);
        if (isp(newS)) return "remove one";
    }
    return "not possible"
};

module.exports = solve;