/*
Link: https://www.codewars.com/kata/6040b781e50db7000ab35125
Kata: Delta Generators
Author: Kacarott
Tags: Iterators, Recursion
*/
function* delta(values, level) {
    let iter = values;
    for (let l = 0; l < level; l++) {
        const it = iter[Symbol.iterator]();
        let prev = it.next();
        if (prev.done) return;
        iter = (function* () {
            for (let curr = it.next(); !curr.done; curr = it.next()) {
                yield curr.value - prev.value;
                prev = curr;
            }
        })();
    }
    yield* iter;
}