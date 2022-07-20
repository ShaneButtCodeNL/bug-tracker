import React from "react";
import "./App.scss";
import UserInput from "./components/UserInput";

function App() {
  return (
    <div className="App warm">
      <header className="App-header">
        <UserInput />
      </header>
      <div className="App-body">body</div>
    </div>
  );
}

export default App;
