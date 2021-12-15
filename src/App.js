import { useState } from "react";
import { snowflake } from "./snowflake";
import { showConstruction } from "./showConstruction";

const constructionIsRendered = false;

// this renders out of the object the svg elements
export function renderer(items) {
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

  console.log(`congrats you watched ${counter} snowflakes`);

  return (
    <div className="app">
      {constructionIsRendered && showConstruction()}

      <div className="snowflake__group">
        <div className="snowflake__snowflake-items">
          <div className="snowflake__containter">
            <div
              className={counter % 2 ? "blinkA" : "blinkB"}
              onAnimationEnd={() => setCounter((v) => v + 1)}
            >
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

        <p>Generative Snowflake</p>
        <p className="small">❦</p>
        <p className="small">
          billions of randomly generated snowflakes
          <br />
          <a
            href="https://github.com/signalwerk/snowflake"
            target="_blank"
            rel="noopener noreferrer"
          >
            → code
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
