class Timer {
  constructor(owner){
    this.owner = owner;
    this.remainingTime = 0;
    this.timeUp = true;
    this.timeOut;

    this.Start = this.Start.bind(this);
    this.Stop = this.Stop.bind(this);
  }

  Start(seconds){
    this.timeUp = false;
    executeTimer(seconds, this.Stop);
  }

  Stop(){
    this.timeUp = true;
    clearTimeout(this.timeOut);
  }
}

export const executeTimer = (seconds, callback) => {
  const remaningTime = seconds;
  window.setTimeout(function() {
    const formatRemainingTime = (seconds) => {
      let ms = `Time Remaining: `;
      return ms + (seconds < 10 ? `0${seconds}` : `${seconds}`);
    }
    if (remaningTime > 0) {
      document.getElementById("timer").innerHTML = formatRemainingTime(remaningTime);
      executeTimer(remaningTime - 1, callback);
    }else {
      document.getElementById("timer").innerHTML = "Time Up!";
      callback();
    }
  }, 1000);
}

export default Timer;