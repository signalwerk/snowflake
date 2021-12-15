import { center, grid, solidArm, lineArm, hair } from "./snowflake";
import { renderer } from "./App";

export function showConstruction() {
  return (
    <div className="construction">
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
    </div>
  );
}
