import { useState, useEffect } from "react";
import "../styles/Timer.scss";

const CountdownTimer = ({ targetTime }) => {
  const calculateTimeLeft = () => {
    const difference = targetTime - new Date().getTime();
    if (difference <= 0) return { days: "00", hours: "00", minutes: "00", seconds: "00" };

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      days: days.toString().padStart(2, "0"),
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  return (
    <div className="countdown-timer">
      <div className="time-box">
        <p className="time-label">Days</p>
        <span className="time-value">{timeLeft.days}</span>
      </div>
      <span className="separator">:</span>
      <div className="time-box">
        <p className="time-label">Hours</p>
        <span className="time-value">{timeLeft.hours}</span>
      </div>
      <span className="separator">:</span>
      <div className="time-box">
        <p className="time-label">Minutes</p>
        <span className="time-value">{timeLeft.minutes}</span>
      </div>
      <span className="separator">:</span>
      <div className="time-box">
        <p className="time-label">Seconds</p>
        <span className="time-value">{timeLeft.seconds}</span>
      </div>
    </div>
  );
};

export default CountdownTimer;


