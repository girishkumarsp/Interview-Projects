import { useState } from "react";
import "./index.css";

export default function BoxHunt() {
  let divCount = 90; // Number of divs to create
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [randomBlock, setRandomBlock] = useState(null);
  const [clicks, setClicks] = useState([]);
  const [timeLimit, setTimeLimit] = useState("");
  const [timerId, setTimerId] = useState(null);

  function RandomLight() {
    setRandomBlock(Math.floor(Math.random() * divCount));
  }

  function setTimer(timeLimit) {
    const IntervalId = setInterval(() => {
      RandomLight();
    }, timeLimit * 1000);
    setTimerId(IntervalId);
  }

  function hanldeStart() {
    setIsGameStarted(true);
    RandomLight();
    if (timeLimit) {
      setTimer(timeLimit);
    }
    !startTime ? setStartTime(performance.now()) : setStartTime(null);
  }

  function hanldePause() {
    setIsGameStarted(false);
    setRandomBlock(null);
    clearInterval(timerId);
  }

  function hanldeReset() {
    setIsGameStarted(false);
    setRandomBlock(null);
    setClicks([]);
    setStartTime(0);
    clearInterval(timerId);
    setTimeLimit("");
  }

  function handleGridClick(e) {
    if (isGameStarted && e.target.classList.contains("active")) {
      const endTime = performance.now();
      const TimeTaken = Math.floor(endTime - startTime);
      const newClick = { number: clicks.length + 1, time: TimeTaken / 1000 };
      setClicks([...clicks, newClick]);
      setRandomBlock(null);
      clearInterval(timerId);
      RandomLight();
      if (timeLimit) {
        setTimer(timeLimit);
      }
    }
  }

  function handleTimeLimit(e) {
    setTimeLimit(e.target.value);
  }

  return (
    <div className="my-element">
      <div className="container">
        <h1>Box Hunt</h1>
        <div className="buttonDiv">
          <button onClick={hanldeStart} id="startBtn">
            Start
          </button>
          <button onClick={hanldePause} id="pauseBtn">
            Pause
          </button>
          <button onClick={hanldeReset} id="resetBtn">
            Reset
          </button>
          <input
            onChange={handleTimeLimit}
            value={timeLimit}
            type="text"
            id="timeLimit"
            placeholder="Time Limit"
          />
        </div>

        <div className="grid" id="main-grid">
          {[...Array(divCount)].map((_, index) => {
            return (
              <div
                key={index}
                className={`grid-item 
            ${index === randomBlock ? "active" : null}`}
                onClick={(e) => handleGridClick(e)}
              ></div>
            );
          })}
        </div>

        <table>
          <thead>
            <tr>
              <td>Mouse Click Number</td>
              <td>Reaction Time</td>
            </tr>
          </thead>
          <tbody id="tableBody">
            {clicks.map((click, index) => (
              <tr key={index}>
                <td>{click.number}</td>
                <td>{click.time} s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}