let time = 0;
const timer = () => {
  console.log(++time);
  if (time == 5) {
    clearInterval(interval);
  }
};
const interval = setInterval(timer, 1000);
