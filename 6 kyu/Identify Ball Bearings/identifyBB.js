/*
Link: https://www.codewars.com/kata/61711668cfcc35003253180d
Kata: Identify Ball Bearings
Author: Kacarott
Tags: Riddles
*/
function identifyBB(bearings, weigh) {
    let k = bearings.length;
    let p = [];
    for (let i = 1; i <= k; i++) {
        p.push(...Array(i).fill(bearings[i - 1]));
    }
    let total = weigh(...p);
    for (let i = 1; i <= k; i++) {
        let s = i * 11;
        let acc = 0;
        for (let j = 1; j <= k; j++) {
            if (j == i) continue;
            acc += j * 10;
        }
        if (total - s == acc) return bearings[i - 1]
    }
}

module.exports = identifyBB;