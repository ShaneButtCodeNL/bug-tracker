import React, { useState } from "react";
import "./App.scss";
import UserInput from "./components/UserInput";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <header className="App-header">
        <UserInput user={user} setUser={setUser} />
        <div className="title-container">Bug Trax</div>
      </header>
      {user ? <></> : <></>}
      <div className="App-body">body</div>
    </div>
  );
}

export default App;
