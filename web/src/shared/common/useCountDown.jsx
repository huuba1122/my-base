import React from 'react';

const initialCountDown = {
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00',
  distanceToNow: 0
};

/**
 * custom hooks useCountDown
 * @param {number} countDownTime
 * @return {object} includes data, func stop and func restart count down
 */
export default function useCountDown(countDownTime = 0, step = 1000) {
  const [value, setValue] = React.useState(initialCountDown);
  const [startDate, setStartDate] = React.useState(Date.now() + countDownTime);
  const [isStarted, setIsStarted] = React.useState(false);
  const timerRef = React.useRef(null);

  /**
   * update state each step time
   * @param {number} startTime
   */
  const setCountDown = (startTime) => {
    const endTime = Date.now();

    const distanceToNow = startTime - endTime;
    const oneHourMiliseconds = 60 * 60 * 1000;
    const oneDayMiliseconds = 24 * oneHourMiliseconds;
    const diffDays = Math.floor(distanceToNow / oneDayMiliseconds);
    const diffHours = Math.floor((distanceToNow % oneDayMiliseconds) / oneHourMiliseconds);
    const diffMinutes = Math.floor((distanceToNow % oneHourMiliseconds) / (60 * 1000));
    const diffSeconds = Math.floor((distanceToNow % (60 * 1000)) / 1000);

    setValue({
      days: `0${diffDays || 0}`.slice(-2),
      hours: `0${diffHours || 0}`.slice(-2),
      minutes: `0${diffMinutes || 0}`.slice(-2),
      seconds: `0${diffSeconds || 0}`.slice(-2),
      distanceToNow
    });

    if (distanceToNow <= 1000) {
      onStop();
    }
  };

  /**
   * start timer
   * @param {date} startTime
   * @return {void}
   */
  const onStart = (startTime, stepInterval) => {
    timerRef.current = setInterval(() => setCountDown(startTime), stepInterval);
    setIsStarted(true);
  };

  const onStop = () => {
    setIsStarted(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const onRestart = () => {
    onStop();
    setValue(initialCountDown);
    setStartDate(Date.now() + countDownTime);
  };

  React.useEffect(() => {
    onStart(startDate, step);

    return () => onStop();
  }, [startDate, step]);

  return { value, isStarted, onRestart, onStop };
}
