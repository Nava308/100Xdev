/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
  return new Promise(function (resolve, resject) {
    setTimeout(resolve, 20000);
  });
}

sleep().then(() => console.log("done"));

let a = 0;

for (let i = 0; i < 1000000000; ++i) {
  a++;
}

console.log(a);

module.exports = sleep;
