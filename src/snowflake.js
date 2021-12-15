export function snowflake() {
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

// helper to show the center
export function grid() {
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

// will return one item randomly from the array
function sample(array) {
  return array[Math.floor(rand() * array.length)];
}

function random(min, max) {
  return Math.floor(rand() * (max - min)) + min;
}

// in case we need an other random function
function rand() {
  return Math.random();
}

// get a new point based on angel and distance
function pointAngleDistance([x, y], angle, distance) {
  return [
    Math.cos((angle * Math.PI) / 180) * distance + x,
    Math.sin((angle * Math.PI) / 180) * distance + y,
  ];
}

// move to center
export function center(children) {
  return {
    type: "group",
    filter: "url(#hipster-bg)",
    transform: "translate(125,125)",
    children,
  };
}

// thin lines
export function hair(style) {
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

        const distance = () => 20;

        return [
          ...fan({ angel: 0 - angel, count, distance, start, length }),
          ...fan({ angel: -180 + angel, count, distance, start, length }),
        ];
      }
      case "sweep": {
        const angel = 30;
        const count = random(10, 20);

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

// bigger simple strokes
export function lineArm(style) {
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

// the closed shapes
export function solidArm(style) {
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
