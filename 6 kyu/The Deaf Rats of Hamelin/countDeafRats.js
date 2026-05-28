/*
Link: https://www.codewars.com/kata/598106cb34e205e074000031
Kata: The Deaf Rats of Hamelin
Author: dinglemouse
Tags: Fundamentals, Strings, Algorithms, Queues, Data Structures
*/
var countDeafRats = function (town) {
    town = town.split` `.join``
    let k = town.indexOf("P");
    let b = town.slice(0, k);
    let a = town.slice(k + 1);
    let newB = "";
    let newA = "";
    for (let i = 0; i < b.length; i += 2) {
        newB += b.slice(i, i + 2) + " ";
    }
    for (let i = 0; i < a.length; i += 2) {
        newA += a.slice(i, i + 2) + " ";
    }
    return (newB.match(/O~/g) || []).length + (newA.match(/~O/g) || []).length
}
module.exports = countDeafRats;