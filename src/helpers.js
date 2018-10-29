const niceTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 3600 % 60);
  const secondsText = (`0${seconds.toString()}`).slice(-2);
  const minutesText = (`0${minutes.toString()}`).slice(-2);
  return `${minutesText}:${secondsText}`;
};

export default niceTime;
