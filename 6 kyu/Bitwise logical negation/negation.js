/*
Link: https://www.codewars.com/kata/614f18006ad6c4003197970c
Kata: Bitwise logical negation
Author: user9307760 (deleted user)
Tags: Puzzles, Restricted
*/
const negation = n => (n | ~n + 1) >>> 31 ^ 1
module.exports = negation;