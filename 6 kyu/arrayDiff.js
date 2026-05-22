/* 
Link: https://www.codewars.com/kata/523f5d21c841566fde000009
Author: marcinbunsch
Tags: Arrays, Fundamentals, Algorithms
*/
function arrayDiff(a, b) {
    b = [...new Set(b)];
    while (b.length > 0) {
        let k = [];
        let p = b.pop();
        a.forEach((el) => {
            if (el !== p) k.push(el);
        });
        a = k;
    }
    return a;
}