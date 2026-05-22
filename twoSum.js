/*
https://www.codewars.com/kata/52c31f8e6605bcc646000082
*/
function twoSum(numbers, target) {
    for (let i = 0; i < numbers.length; i++) {
        let x = target - numbers[i];
        let p = numbers.indexOf(x, i + 1);
        if (~p) {
            return [i, p]
        }
    }
}