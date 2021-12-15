import "./App.css";
import { useState, useEffect } from "react";

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

function snowflake() {
  const solidArmStyles = ["siemensStar", "diamond", "pointer", "bar"];
  const lineArmStyles = ["line", "doubleLine", "fanLine"];
  const hairStyles = ["basic", "sweep", "raise", "sin"];

  return [
    center([
      ...grid(),

      ...lineArm(sample(lineArmStyles)),
      ...solidArm(sample(solidArmStyles)),
      ...hair(sample(hairStyles)),
    ]),
  ];
}

function grid() {
  return [
    {
      type: "line",
      x1: -100,
      y1: 0,
      x2: 100,
      y2: 0,
    },
    {
      type: "line",
      x1: 0,
      y1: -100,
      x2: 0,
      y2: 100,
    },
  ];
}

<polygon points="0,100 50,25 50,75 100,0" />;

function pointAngleDistance([x, y], angle, distance) {
  return [
    Math.cos((angle * Math.PI) / 180) * distance + x,
    Math.sin((angle * Math.PI) / 180) * distance + y,
  ];
}

function center(children) {
  return {
    type: "group",
    filter: "url(#hipster-bg)",
    transform: "translate(125,125)",
    children,
  };
}

function random(min, max) {
  // return min;
  return Math.floor(rand() * (max - min)) + min;
}

function rand() {
  return Math.random();
}

function hair(style) {
  function generate() {
    function fan({ angel, count, distance, length = 90, start = 0 }) {
      return Array.from({ length: count }, (_, i) => {
        const startPoint = [0, (0 - length / count) * i + start];
        const secondPointAngel = angel;
        const secondPointDistance = distance(i);

        const offset = pointAngleDistance(
          startPoint,
          secondPointAngel,
          secondPointDistance
        );
        return {
          type: "line",
          x1: startPoint[0],
          y1: startPoint[1],
          x2: offset[0],
          y2: offset[1],
        };
      });
    }

    switch (style) {
      case "basic": {
        const angel = 30;
        const count = random(3, 6);

        const spread = random(40, 70);
        const length = 90 - spread;
        const start = 0 - spread;

        // const length = 30;
        // const start = -60;
        const distance = () => 20;

        return [
          ...fan({ angel: 0 - angel, count, distance, start, length }),
          ...fan({ angel: -180 + angel, count, distance, start, length }),
        ];
      }
      case "sweep": {
        const angel = 30;
        const count = random(10, 20);
        // const length = 65;
        // const start = -15;

        const spread = random(10, 30);
        const length = 90 - spread;
        const start = 0 - spread;

        const distance = (step) => (20 / count) * step + 5;

        return [
          ...fan({ angel: 0 - angel, count, distance, start, length }),
          ...fan({ angel: -180 + angel, count, distance, start, length }),
        ];
      }
      case "raise": {
        const angel = 30;
        const count = random(10, 20);

        const spread = random(5, 25);
        const length = 100 - spread;
        const start = 0 - spread;

        // const count = 25;
        // const length = 60;
        // const start = -30;
        const distance = (step) => (20 / count) * (count - step) + 5;

        return [
          ...fan({ angel: 0 - angel, count, distance, start, length }),
          ...fan({ angel: -180 + angel, count, distance, start, length }),
        ];
      }
      case "sin": {
        const angel = 30;
        const count = random(10, 20);
        const length = random(70, 90);
        const start = random(0, -30);

        const scaler = random(15, 25);
        const distance = (step) => Math.sin((Math.PI * step) / count) * scaler;

        return [
          ...fan({ angel: 0 - angel, count, distance, start, length }),
          ...fan({ angel: -180 + angel, count, distance, start, length }),
        ];
      }

      // case y: {
      //
      //   break;
      // }
      default:
    }
  }

  const obj = generate();

  return Array.from({ length: 6 }, (_, i) => ({
    type: "group",
    className: `hair hair--${style}`,
    transform: `rotate(${60 * i})`,
    children: obj,
  }));
}

function lineArm(style) {
  function generate() {
    switch (style) {
      case "line": {
        const start = random(-20, 0);
        return [
          {
            type: "line",
            x1: 0,
            y1: start,
            x2: 0,
            y2: -100,
          },
        ];
      }
      case "doubleLine": {
        const start = random(-20, 0);

        const startPoint = [0, -100];
        const secondPointAngel = 45;
        const secondPointDistance = random(15, 30);
        const offset = pointAngleDistance(
          startPoint,
          secondPointAngel,
          secondPointDistance
        );

        return [
          {
            type: "line",
            x1: 0,
            y1: start,
            x2: offset[0],
            y2: offset[1],
          },
          {
            type: "line",
            x1: 0,
            y1: start,
            x2: 0 - offset[0],
            y2: offset[1],
          },
        ];
      }
      case "fanLine": {
        const count = random(3, 7);
        const scaler = random(20, 30);

        const start = random(-20, 0);

        function fan(angel) {
          return Array.from({ length: count }, (_, i) => {
            const startPoint = [0, -100];
            const secondPointAngel = angel;
            const secondPointDistance = (scaler / count) * (i + count);
            const offset = pointAngleDistance(
              startPoint,
              secondPointAngel,
              secondPointDistance
            );
            return {
              type: "line",
              x1: 0,
              y1: start,
              x2: offset[0],
              y2: offset[1],
            };
          });
        }

        return [...fan(60), ...fan(180 - 60)];
      }

      // case y: {
      //
      //   break;
      // }
      default:
    }
  }
  const obj = generate();

  return Array.from({ length: 6 }, (_, i) => ({
    type: "group",
    className: `lineArm lineArm--${style}`,
    transform: `rotate(${60 * i})`,
    children: obj,
  }));
}

function solidArm(style) {
  const styles = {
    siemensStar: () => {
      const startPoint = [0, -100];
      const secondPointAngel = 45;
      const secondPointDistance = random(15, 30);

      return [
        startPoint,
        pointAngleDistance(startPoint, secondPointAngel, secondPointDistance),
        [0, 0],
        pointAngleDistance(
          startPoint,
          180 - secondPointAngel,
          secondPointDistance
        ),
      ];
    },
    diamond: () => {
      const startPoint = [0, 0];
      const secondPointAngel = -60;
      const secondPointDistance = random(15, 35);
      const secondPoint = pointAngleDistance(
        startPoint,
        secondPointAngel,
        secondPointDistance
      );

      return [
        startPoint,
        secondPoint,
        pointAngleDistance(
          secondPoint,
          secondPointAngel * 2,
          secondPointDistance
        ),
        pointAngleDistance(
          startPoint,
          180 + Math.abs(secondPointAngel),
          secondPointDistance
        ),
      ];
    },
    pointer: () => {
      const startPoint = [5, random(-9, -35)];
      const secondPointAngel = -60;
      const secondPointDistance = random(10, 25);
      const secondPoint = pointAngleDistance(
        startPoint,
        secondPointAngel,
        secondPointDistance
      );
      const thirdPoint = [0, -60];
      const lastPoint = [0 - startPoint[0], startPoint[1]];

      return [
        startPoint,
        secondPoint,
        thirdPoint,
        pointAngleDistance(
          lastPoint,
          180 + Math.abs(secondPointAngel),
          secondPointDistance
        ),
        lastPoint,
      ];
    },
    bar: () => {
      const armLength = 80;
      const startPoint = [random(2, 4), random(-10, -40)];
      const secondPointAngel = -60;
      const secondPointDistance = random(2, 9);
      const secondPoint = pointAngleDistance(
        startPoint,
        secondPointAngel,
        secondPointDistance
      );
      const lastPoint = [0 - startPoint[0], startPoint[1]];

      return [
        startPoint,
        secondPoint,
        pointAngleDistance(
          [startPoint[0], 0 - armLength],
          Math.abs(secondPointAngel),
          secondPointDistance
        ),
        [startPoint[0], 0 - armLength],
        [0 - startPoint[0], 0 - armLength],
        pointAngleDistance(
          [0 - startPoint[0], 0 - armLength],
          180 + secondPointAngel,
          secondPointDistance
        ),
        pointAngleDistance(
          lastPoint,
          180 + Math.abs(secondPointAngel),
          secondPointDistance
        ),
        lastPoint,
      ];
    },
  };

  const points = styles[style]();

  return Array.from({ length: 6 }, (_, i) => ({
    type: "group",
    className: `solidArm solidArm--${style}`,
    transform: `rotate(${30 + 60 * i})`,

    children: [
      {
        type: "polygon",
        points,
      },
    ],
  }));
}

// will return one item randomly from the array
function sample(array) {
  return array[Math.floor(rand() * array.length)];
}

function App() {
  const [counter, setCounter] = useState(0);

  console.log(counter);

  useEffect(
    () => {
      let timer1 = setInterval(() => setCounter((v) => v + 1), delay * 1000);

      // this will clear Timeout
      // when component unmount like in willComponentUnmount
      // and show will not change to true
      return () => {
        clearInterval(timer1);
      };
    },
    // useEffect will run only one time with empty []
    // if you pass a value to array,
    // like this - [data]
    // than clearTimeout will run every time
    // this value changes (useEffect re-run)
    []
  );

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
        <h3>Snowflake</h3>
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
