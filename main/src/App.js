import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MicroFrontend from "./MicroFrontend";

import "./App.css";


const {
  REACT_APP_DIARY_HOST: diaryHost,
  REACT_APP_FINANCE_HOST: financeHost,
} = process.env;

function Header() {
  return (
      <div className="banner">
        <h1 className="banner-title">&#128571; Personal Assistant&#128021;</h1>
        <h4>Random pics of cats and dogs</h4>
      </div>
  );
}

function Diary({ history }) {
  return <MicroFrontend history={history} host={diaryHost} name="Diary" />;
}

function Finance({ history }) {
  return <MicroFrontend history={history} host={financeHost} name="Finance" />;
}

function GreetingFinance({ history }) {
  return (
      <div>
        <Header />
        <div className="home">
          <MicroFrontend history={history} host={financeHost} name="Finance" />
        </div>
      </div>
  );
}

function Home({ history }) {
  const [input, setInput] = useState("");

  const handleOnClick = () => {
    history.push(`/finance/${input}`);
  };

  return (
      <div>
        <Header />
        <div className="home">
          <input
              placeholder="Insert a greeting"
              defaultValue={input}
              onBlur={(e) => setInput(e.target.value)}
          />
          <button onClick={handleOnClick}>Greet Me</button>
        </div>

        <div className="home">
          <div className="content">
            <div className="finance">
              <Finance />
            </div>
            <div className="diary">
              <Diary />
            </div>
          </div>
        </div>
      </div>
  );
}

function App() {
  return (
      <BrowserRouter>
        <React.Fragment>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/diary/:greeting" element={<GreetingFinance/>} />
          </Routes>
        </React.Fragment>
      </BrowserRouter>
  );
}

export default App;