/*
Link: https://www.codewars.com/kata/5a3f2925b6cfd78fb0000040
Kata: Simple reversed parenthesis
Author: KenKamau
Tags: Fundamentals
*/
function solve(s) {
    if (s.length % 2 !== 0) return -1;
    let k = [];
    for (let q of s) {
        if (q == "(") {
            k.push(q);
        } else {
            if (k.length && k[k.length - 1] == "(") {
                k.pop()
            } else {
                k.push(q)
            }
        }
    }
    let a = 0, b = 0;
    for (let q of k) {
        if (q == "(") a++
        else b++;
    }
    return [a / 2, b / 2].reduce((acc, el) => Math.ceil(acc) + Math.ceil(el));
}