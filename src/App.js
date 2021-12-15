import "./App.css";
import { useState, useEffect } from "react";
import { center, grid, solidArm, lineArm, hair, snowflake } from "./snowflake";

const delay = 4; // keep in sync with css

function renderer(items) {
  return items.map((item) => {
    switch (item.type) {
      case "line": {
        return <line x1={item.x1} y1={item.y1} x2={item.x2} y2={item.y2} />;
      }
      case "group": {
        return (
          <g
            className={item.className}
            filter={item.filter || null}
            transform={item.transform}
          >
            {renderer(item.children)}
          </g>
        );
      }
      case "polygon": {
        return (
          <polygon
            points={item.points.map((point) => point.join(",")).join(" ")}
          />
        );
      }

      default:
    }
  });
}

function App() {
  const [counter, setCounter] = useState(0);

  console.log(counter);

  useEffect(() => {
    let timer1 = setInterval(() => setCounter((v) => v + 1), delay * 1000);

    return () => {
      clearInterval(timer1);
    };
  }, []);

  return (
    <div className="app">
      <div className="snowflake__group">
        <h3>Solid Arms</h3>
        <div className="snowflake__snowflake-items">
          <div className="snowflake__containter">
            <svg
              className="snowflake"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 250 250"
            >
              {renderer([center([...grid(), ...solidArm("siemensStar")])])}
            </svg>
          </div>
          <div className="snowflake__containter">
            <svg
              className="snowflake"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 250 250"
            >
              {renderer([center([...grid(), ...solidArm("diamond")])])}
            </svg>
          </div>
          <div className="snowflake__containter">
            <svg
              className="snowflake"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 250 250"
            >
              {renderer([center([...grid(), ...solidArm("pointer")])])}
            </svg>
          </div>
          <div className="snowflake__containter">
            <svg
              className="snowflake"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 250 250"
            >
              {renderer([center([...grid(), ...solidArm("bar")])])}
            </svg>
          </div>
        </div>
      </div>
      <div className="snowflake__group">
        <h3>Line Arms</h3>
        <div className="snowflake__snowflake-items">
          <div className="snowflake__containter">
            <svg
              className="snowflake"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 250 250"
            >
              {renderer([center([...lineArm("line")])])}
            </svg>
          </div>
          <div className="snowflake__containter">
            <svg
              className="snowflake"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 250 250"
            >
              {renderer([center([...lineArm("doubleLine")])])}
            </svg>
          </div>
          <div className="snowflake__containter">
            <svg
              className="snowflake"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 250 250"
            >
              {renderer([center([...lineArm("fanLine")])])}
            </svg>
          </div>
        </div>
      </div>
      <div className="snowflake__group">
        <h3>Hair</h3>
        <div className="snowflake__snowflake-items">
          <div className="snowflake__containter">
            <svg
              className="snowflake"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 250 250"
            >
              {renderer([center([...grid(), ...hair("basic")])])}
            </svg>
          </div>
          <div className="snowflake__containter">
            <svg
              className="snowflake"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 250 250"
            >
              {renderer([center([...grid(), ...hair("sweep")])])}
            </svg>
          </div>
          <div className="snowflake__containter">
            <svg
              className="snowflake"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 250 250"
            >
              {renderer([center([...grid(), ...hair("raise")])])}
            </svg>
          </div>
          <div className="snowflake__containter">
            <svg
              className="snowflake"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 250 250"
            >
              {renderer([center([...grid(), ...hair("sin")])])}
            </svg>
          </div>
        </div>
      </div>
      <div className="snowflake__group">
        <p>Happy new year Christelle!</p>

        <div className="snowflake__snowflake-items">
          <div className="snowflake__containter">
            <div className="blink">
              <svg
                className="snowflake"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 250 250"
              >
                <defs>
                  <filter id="hipster-bg">
                    <feGaussianBlur id="gauss" stdDeviation=".6" />
                  </filter>
                </defs>

                {renderer(snowflake())}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
