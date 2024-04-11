import React, { useState } from "react";
import Buttonbox from "./components/Buttonbox";
import Screen from "./components/Screen";
import Wrapper from "./components/Wrapper";
import Buttons from "./components/Buttons";

const btnValues = [
  ["C", "+-", "%", "/"],
  ["7", "8", "9", "X"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];
const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpace = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  const [calc, setCalc] = useState({ sign: "", num: 0, res: 0 });

  //numClickHandler
  const numClickHandler = (e) => {
    e.preventDefault();

    const value = e.target.innerHTML;

    if (removeSpace(calc.num)?.length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpace(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpace(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  //commaClickHandler

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  //signClickHandler

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  //equalsClickHandler

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;
      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide by 0"
            : toLocaleString(
                math(
                  Number(removeSpace(calc.res)),
                  Number(removeSpace(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  //invertClickHandler

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpace(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpace(calc.res) * -1) : 0,
      sign: "",
    });
  };

  //percentClickHandler

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpace(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpace(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  //resetClickHandler

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <div>
      <Wrapper>
        <Screen value={calc.num ? calc.num : calc.res} />
        <Buttonbox>
          {btnValues.flat().map((btn, i) => {
            return (
              <Buttons
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={
                  btn === "C"
                    ? resetClickHandler
                    : btn === "+-"
                    ? invertClickHandler
                    : btn === "%"
                    ? percentClickHandler
                    : btn === "="
                    ? equalsClickHandler
                    : btn === "+" || btn === "-" || btn === "X" || btn === "/"
                    ? signClickHandler
                    : btn === "."
                    ? commaClickHandler
                    : numClickHandler
                }
              />
            );
          })}
        </Buttonbox>
      </Wrapper>
    </div>
  );
};

export default App;
