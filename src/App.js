import "./styles.css";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [time, setTime] = useState(0);
  const [count, setCount] = useState(0);
  const [isTimeout, setIsTimeout] = useState(false);

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

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

  const startTimer = () => {
    // 10초 후 타임아웃
    timeoutRef.current = setTimeout(() => setIsTimeout(true), 10000);

    // 1초마다 time 증가
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

  //10초 후
  useEffect(() => {
    startTimer(); // 최초 시작
    return clearTimers; // 언마운트 시 정리
  }, []);

  useEffect(() => {
    if (isTimeout) clearTimers();
  }, [isTimeout]);

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
