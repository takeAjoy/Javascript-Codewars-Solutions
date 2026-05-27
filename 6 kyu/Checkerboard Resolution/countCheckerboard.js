/*
Link: https://www.codewars.com/kata/60576b180aef19001bce494d
Kata: Checkerboard Resolution
Author: Kacarott
Tags: Performance, Algorithms, Matrix
*/
function countCheckerboard(width, height, resolution) {
  const w = 1n * width, h = 1n * height, r = 1n * resolution;
  const W = w / r, H = h / r;
  const rh = h % r, rw = w % r;
  let b = (W * H) / 2n * r ** 2n;
  (rh > 0n) && (b += (H % 2n === 0n ? W / 2n : (W + 1n) / 2n) * rh * r);
  (rw > 0n) && (b += (W % 2n === 0n ? H / 2n : (H + 1n) / 2n) * rw * r);
  return (W + H) % 2n === 1n ? b + rh * rw : b;
}

module.exports = countCheckerboard;