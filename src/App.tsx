import React, { useState } from "react";
import "./App.scss";
import AddProjects from "./components/AddProject";
import Home from "./components/Home";
import Projects from "./components/Projects";
import UserInput from "./components/UserInput";
import UserNavBar from "./components/UserNavBar";
import Welcome from "./components/Welcome";

function RenderSwitch(n: number) {
  switch (n) {
    case 0:
      return <Home />;
    case 1:
      return <Projects />;
    case 2:
      return <AddProjects />;
    default:
      return <div>SomeThing went wrong Your not suposed to see this.</div>;
  }
}
function App() {
  const [user, setUser] = useState(null);
  const [activeLink, setActiveLink] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <UserInput
          user={user}
          setUser={setUser}
          setActiveLink={setActiveLink}
        />
        <div className="title-container">Bug Trax</div>
      </header>
      {user !== null ? (
        <UserNavBar activeLink={activeLink} setActiveLink={setActiveLink} />
      ) : (
        <></>
      )}
      <div className="App-body">
        {user !== null ? RenderSwitch(activeLink) : <Welcome />}
      </div>
    </div>
  );
}

export default App;
