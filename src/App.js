import "./styles.css";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [time, setTime] = useState(0);
  const [count, setCount] = useState(0);
  const [isTimeout, setIsTimeout] = useState(false);

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const startTimer = () => {
    //10초 setTimeout
    timeoutRef.current = setTimeout(() => setIsTimeout(true), 10000);

    //1초 setInterval
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  const clearTimers = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  //시작
  useEffect(() => {
    startTimer();
    return clearTimers;
  }, []);

  //타이머 종료
  useEffect(() => {
    if (isTimeout) clearTimers();
  }, [isTimeout]);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  const handleRefresh = () => {
    clearTimers();
    setTime(0);
    setCount(0);
    setIsTimeout(false);
    startTimer();
  };

  return (
    <div className="App">
      <div>
        <p>{count}</p>
        <p>남은시간: {10 - time} 초</p>
        {!isTimeout ? (
          <button onClick={handleClick}>+</button>
        ) : (
          <p>타임오버!!!!!!!</p>
        )}
        <div style={{ marginTop: "30px" }}>
          <button onClick={handleRefresh}>새로고침</button>
        </div>
      </div>
    </div>
  );
}
