class Timer {
  constructor(owner){
    this.owner = owner;
    this.remainingTime = 0;
    this.timeUp = true;
    this.timeOut;

    this.Start = this.Start.bind(this);
    this.Stop = this.Stop.bind(this);
    this.ExecuteTimer = this.ExecuteTimer.bind(this);
  }

  Start(seconds){
    this.timeUp = false;
    // executeTimer(seconds, this.Stop);
    window.timer = this;
    this.ExecuteTimer(seconds, this.Stop);
  }

  Stop(){
    debugger
    this.timeUp = true;
    clearTimeout(this.timeOut);
  }

  ExecuteTimer(seconds, callback) {
    const remaningTime = seconds;
    this.timeOut = setTimeout(function () {
      const formatRemainingTime = (seconds) => {
        return (seconds < 10 ? `0${seconds}` : `${seconds}`);
      }
      debugger
      if (remaningTime > 0) {
        document.getElementById("timer").innerHTML = "Time Remaining:";
        document.getElementById("timer-seconds").innerHTML = formatRemainingTime(remaningTime);
        window.timer.ExecuteTimer(remaningTime - 1, callback);
      }else {
        document.getElementById("timer").innerHTML = "Time Remaining:";
        document.getElementById("timer-seconds").innerHTML = "Time Up!";
        callback();
      }
    }, 1000);
  }

}

// export const executeTimer = (seconds, callback) => {
//   const remaningTime = seconds;
//   // window.setTimeout(function() {
//   window.setTimeout(function() {
//     const formatRemainingTime = (seconds) => {
//       // let ms = `Time Remaining: `;
//       // return ms + (seconds < 10 ? `0${seconds}` : `${seconds}`);
//       return (seconds < 10 ? `0${seconds}` : `${seconds}`);
//     }
//     if (remaningTime > 0) {
//       document.getElementById("timer").innerHTML = "Time Remaining:";
//       document.getElementById("timer-seconds").innerHTML = formatRemainingTime(remaningTime);
//       executeTimer(remaningTime - 1, callback);
//     }else {
//       document.getElementById("timer").innerHTML = "Time Remaining:";
//       document.getElementById("timer-seconds").innerHTML = "Time Up!";
//       callback();
//     }
//   }, 1000);
// }

export default Timer;