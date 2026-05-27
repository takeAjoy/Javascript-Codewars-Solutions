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
  const bs = (W * H) / 2n;
  let b = bs * r * r;

  if (rh > 0n) {
    const bss = H % 2n === 0n ? W / 2n : (W + 1n) / 2n;
    b += bss * rh * r;
  }

  if (rw > 0n) {
    const bss = W % 2n === 0n ? H / 2n : (H + 1n) / 2n;
    b += bss * rw * r;
  }

  if (rw > 0n && rh > 0n && (W + H) % 2n === 1n) {
    b += rh * rw;
  }

  return b;
}

module.exports = countCheckerboard;