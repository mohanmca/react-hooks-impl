import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { FaMinus, FaPlus } from "react-icons/fa";
import * as serviceWorker from "./serviceWorker";
import recorder from "./recorder";

import logo from "./logo.svg";
import "./App.css";

const states = [];
let calls = -1;

function useState(defaultValue) {
  const callId = ++calls;
  if (states[callId]) {
    return states[callId];
  }
  const setValue = newValue => {
    //assign something
    //rerender
    states[callId][0] = newValue;
    renderWithCrappyHooks();
  };
  const tuple = [defaultValue, setValue];
  states[callId] = tuple;
  return tuple;
}

function App() {
  const [minutes, setMinutes] = useState(5);
  const [error, setError] = useState(null);

  console.log(error);
  console.log(`${calls} :: Inside render :>> ` + states);

  const handledAdd = () => {
    if (minutes < 9) {
      setMinutes(minutes + 1);
      setError(null);
    } else {
      setError("Less than 10 please");
    }
  };

  const handledSubtract = () => {
    if (minutes > 1) {
      setMinutes(minutes - 1);
      setError(null);
    } else {
      setError("Greater than 1 please");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          width="150"
          height="150"
        />
        <div>
          <button
            onClick={handledSubtract}
            type="button"
            className="icon_button Minutes_button"
          >
            <FaMinus />
          </button>
        </div>
        <div className="Minutes_label" htmlFor="minutes">
          {minutes} Minutes
        </div>
        <div>
          <button
            onClick={handledAdd}
            type="button"
            className="icon_button Minutes_button"
          >
            <FaPlus />
          </button>
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function renderWithCrappyHooks() {
  calls = -1;
  ReactDOM.render(<App />, document.getElementById("root"));
}

renderWithCrappyHooks();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

let register = () => recorder(document);
setTimeout(register, 1000);
