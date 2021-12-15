import "./App.css";

<line x1="0" y1="0" x2="200" y2="200" />;

function renderer(items) {
  return items.map((item) => {
    switch (item.type) {
      case "line": {
        return <line x1={item.x1} y1={item.y1} x2={item.x2} y2={item.y2} />;
      }
      case "group": {
        return <g transform={item.transform}>{renderer(item.children)}</g>;
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
    transform: "translate(100,100)",
    children,
  };
}

function hair(style) {
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
      const count = 3;
      const length = 30;
      const start = -60;
      const distance = () => 20;

      return [
        ...fan({ angel: 0 - angel, count, distance, start, length }),
        ...fan({ angel: -180 + angel, count, distance, start, length }),
      ];
    }
    case "sweep": {
      const angel = 30;
      const count = 25;
      const length = 65;
      const start = -15;
      const distance = (step) => (20 / count) * step + 5;

      return [
        ...fan({ angel: 0 - angel, count, distance, start, length }),
        ...fan({ angel: -180 + angel, count, distance, start, length }),
      ];
    }
    case "raise": {
      const angel = 30;
      const count = 25;
      const length = 60;
      const start = -30;
      const distance = (step) => (20 / count) * (count - step) + 5;

      return [
        ...fan({ angel: 0 - angel, count, distance, start, length }),
        ...fan({ angel: -180 + angel, count, distance, start, length }),
      ];
    }
    case "sin": {
      const angel = 30;
      const count = 25;
      const length = 80;
      const start = -20;
      const distance = (step) => Math.sin((Math.PI * step) / count) * 15;

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

function lineArm(style) {
  switch (style) {
    case "line": {
      return [
        {
          type: "line",
          x1: 0,
          y1: 0,
          x2: 0,
          y2: -100,
        },
      ];
    }
    case "doubleLine": {
      const startPoint = [0, -100];
      const secondPointAngel = 45;
      const secondPointDistance = 20;
      const offset = pointAngleDistance(
        startPoint,
        secondPointAngel,
        secondPointDistance
      );

      return [
        {
          type: "line",
          x1: 0,
          y1: 0,
          x2: offset[0],
          y2: offset[1],
        },
        {
          type: "line",
          x1: 0,
          y1: 0,
          x2: 0 - offset[0],
          y2: offset[1],
        },
      ];
    }
    case "fanLine": {
      function fan(angel) {
        const count = 5;
        return Array.from({ length: count }, (_, i) => {
          const startPoint = [0, -100];
          const secondPointAngel = angel;
          const secondPointDistance = (20 / count) * (i + count);
          const offset = pointAngleDistance(
            startPoint,
            secondPointAngel,
            secondPointDistance
          );
          return {
            type: "line",
            x1: 0,
            y1: 0,
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

function solidArm(style) {
  const styles = {
    siemensStar: () => {
      const startPoint = [0, -100];
      const secondPointAngel = 45;
      const secondPointDistance = 20;

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
      const secondPointDistance = 20;
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
      const startPoint = [6, -8];
      const secondPointAngel = -60;
      const secondPointDistance = 20;
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
      const startPoint = [2, -2];
      const secondPointAngel = -60;
      const secondPointDistance = 7;
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
  return {
    type: "polygon",
    points,
  };
}

function snowflake() {
  return [
    center([
      ...grid(),
      {
        type: "polygon",
        points: [
          [0, 0],
          [-10, -50],
          [0, -100],
        ],
      },
    ]),
    // {
    //   type: "group",
    //   transform: "translate(100 100)",
    //   children: [
    //     ...grid(),
    //     {
    //       type: "polygon",
    //       points: [
    //         [0, 0],
    //         [-10, -50],
    //         [0, -100],
    //       ],
    //     },
    //   ],
    // },
    // {
    //   type: "line",
    //   x1: 0,
    //   y1: 50,
    //   x2: 100,
    //   y2: 50,
    // },
  ];
}

function App() {
  return (
    <div className="app">
      <div className="snowflake__group">
        <h3>Solid Arms</h3>
        <div className="snowflake__snowflake-items">
          <div className="snowflake">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              {renderer([center([...grid(), solidArm("siemensStar")])])}
            </svg>
          </div>
          <div className="snowflake">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              {renderer([center([...grid(), solidArm("diamond")])])}
            </svg>
          </div>
          <div className="snowflake">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              {renderer([center([...grid(), solidArm("pointer")])])}
            </svg>
          </div>
          <div className="snowflake">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              {renderer([center([...grid(), solidArm("bar")])])}
            </svg>
          </div>
        </div>
      </div>
      <div className="snowflake__group">
        <h3>Line Arms</h3>
        <div className="snowflake__snowflake-items">
          <div className="snowflake">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              {renderer([center([...lineArm("line")])])}
            </svg>
          </div>
          <div className="snowflake">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              {renderer([center([...lineArm("doubleLine")])])}
            </svg>
          </div>
          <div className="snowflake">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              {renderer([center([...lineArm("fanLine")])])}
            </svg>
          </div>
        </div>
      </div>
      <div className="snowflake__group">
        <h3>Hair</h3>
        <div className="snowflake__snowflake-items">
          <div className="snowflake">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              {renderer([center([...grid(), ...hair("basic")])])}
            </svg>
          </div>
          <div className="snowflake">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              {renderer([center([...grid(), ...hair("sweep")])])}
            </svg>
          </div>
          <div className="snowflake">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              {renderer([center([...grid(), ...hair("raise")])])}
            </svg>
          </div>
          <div className="snowflake">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              {renderer([center([...grid(), ...hair("sin")])])}
            </svg>
          </div>
        </div>
      </div>
      <div className="snowflake__group">
        <h3>Snowflake</h3>
        <div className="snowflake__snowflake-items">
          <div className="snowflake">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              {renderer(snowflake())}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
