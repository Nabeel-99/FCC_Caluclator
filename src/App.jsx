import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("");
  const [expression, setExpression] = useState("");
  const trimmedExp = expression.trim();

  const isOperator = (symbol) => {
    return /[*/+-]/.test(symbol);
  };

  const buttonPress = (symbol) => {
    if (symbol === "clear") {
      setDisplay("");
      setExpression("0");
    } else if (symbol === "percent") {
      if (display === "") return;
      setDisplay((parseFloat(display) / 100).toString());
    } else if (isOperator(symbol)) {
      setExpression(trimmedExp + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      if (lastNumber.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
    if (isOperator(trimmedExp.charAt(trimmedExp.length - 1))) return;
    const parts = trimmedExp.split(" ");
    const newParts = [];

    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setDisplay(eval(display + newExpression).toString());
    } else {
      setDisplay(eval(newExpression).toString());
    }
    setExpression("");
  };

  return (
    <>
      <div className="">
        <h3 className="text-3xl text-black">Calculator</h3>
        <div id="calculator" className="flex flex-col w-96">
          <div id="display">
            <div id="expression" className="bg-black h-10 flex items-end justify-end px-2 text-xl text-white">{expression}</div>
            <div id="answer" className="bg-black h-10 flex items-end justify-end px-2 text-xl text-white">{display}</div>
          </div>
          <div className="flex">
            <button id="clear" onClick={() => buttonPress("clear")} className="bg-orange-500  w-6/12 text-white rounded-none border-black border-2">AC</button>
            <button id="percentage" onClick={() => buttonPress("percentage")} className="rounded-none bg-white text-black w-3/12 border-black border-2">%</button>
            <button id="divide" onClick={() => buttonPress("/")} className="rounded-none bg-white text-black border-black w-3/12 border-2">/</button>
          </div>
          <div className="grid grid-cols-4">
              <button id="seven" onClick={() => buttonPress("7")} className="rounded-none bg-white text-black border-black border-2">7</button>
              <button id="eight" onClick={() => buttonPress("8")} className="rounded-none bg-white text-black border-black border-2">8</button>
              <button id="nine" onClick={() => buttonPress("9")} className="rounded-none bg-white text-black border-black border-2">9</button>
              <button id="multiply" onClick={() => buttonPress("*")} className="rounded-none bg-white text-black border-black border-2">x</button>
          </div>
         <div className="grid grid-cols-4">
             <button id="four" onClick={() => buttonPress("4")} className="rounded-none bg-white text-black border-black border-2">4</button>
             <button id="five" onClick={() => buttonPress("5")} className="rounded-none bg-white text-black border-black border-2">5</button>
             <button id="six" onClick={() => buttonPress("6")} className="rounded-none bg-white text-black border-black border-2">6</button>
             <button id="subtract" onClick={() => buttonPress("-")} className="rounded-none bg-white text-black border-black border-2">-</button>
         </div>
         <div className="grid grid-cols-4">
            <button id="one" onClick={() => buttonPress("1")} className="rounded-none bg-white text-black  border-black border-2">1</button>
            <button id="two" onClick={() => buttonPress("2")} className="rounded-none bg-white text-black border-black border-2">2</button>
            <button id="three" onClick={() => buttonPress("3")} className="rounded-none bg-white text-black border-black border-2">3</button>
            <button id="add" onClick={() => buttonPress("+")} className="rounded-none bg-white text-black  border-black border-2">+</button>
          </div>
          <div className="flex">
            <button id="zero" onClick={() => buttonPress("0")} className="rounded-none bg-white text-black w-6/12 border-black border-2">0</button>
            <button id="decimal" onClick={() => buttonPress(".")} className="rounded-none bg-white text-black w-3/12 border-black border-2">.</button>
            <button id="equals" onClick={() => buttonPress("=")} className="rounded-none w-3/12 bg-green-400 text-white  border-black border-2">=</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
