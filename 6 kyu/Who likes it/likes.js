/*
Link: https://www.codewars.com/kata/5266876b8f4bf2da9b000362
Kata: Who likes it?
Author: BattleRattle
Tags: Strings, Fundamentals
*/
function likes(names) {
    const end = " likes this";
    const endv2 = " like this";
    const n = names.length;
    if (!n) return "no one" + end;
    else if (n == 1) return names[0] + end;
    else if (n == 2) return names[0] + " and " + names[1] + endv2;
    else if (n == 3) return names[0] + ", " + names[1] + " and " + names[2] + endv2;
    else return names[0] + ", " + names[1] + " and " + (n - 2) + " others" + endv2;
}
module.exports = likes;