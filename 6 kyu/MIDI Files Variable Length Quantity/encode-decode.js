/*
Link: https://www.codewars.com/kata/6a020680357f9fb3614e6502
Kata: MIDI Files: Variable Length Quantity
Author: BobtheLantern
Tags: Binary, Bits, Algorithms
*/
function encode(n) {
    let grp = [];
    while (true) {
        grp.push(n & 127);
        n = n >> 7;
        if (n === 0) break;
    }
    grp.reverse();
    let res = [];
    for (let i = 0; i < grp.length; i++) {
        if (i === grp.length - 1) {
            res.push(grp[i]);
        } else {
            res.push(grp[i] | 128);
        }
    }
    return res;
}

function decode(d) {
    let res = 0;
    for (let i = 0; i < d.length; i++) {
        res = (res << 7) | (d[i] & 127);
        if ((d[i] & 128) === 0) break;
    }
    return res;
}

module.exports = {
    encode, decode
}