let t = 0;
const runTime = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(++t), 1000);
  });

const timer = () => {
  const arr = [];
  for (let i = 0; i < 5; ++i) {
    let p = runTime();
    arr.push(p);
  }
};
timer();
