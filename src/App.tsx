import React, { useState } from "react";
import "./App.scss";
import AddProjects from "./components/AddProject";
import Home from "./components/Home";
import Projects from "./components/Projects";
import UserInput from "./components/UserInput";
import UserNavBar from "./components/UserNavBar";
import Welcome from "./components/Welcome";
import User from "./data/User";

function RenderSwitch(n: number, user: User, setActiveLink: Function) {
  switch (n) {
    case 0:
      return <Home user={user} />;
    case 1:
      return <Projects user={user} setActiveLink={setActiveLink} />;
    case 2:
      return <AddProjects user={user} />;
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
        {user !== null ? (
          RenderSwitch(activeLink, user, setActiveLink)
        ) : (
          <Welcome />
        )}
      </div>
    </div>
  );
}

export default App;
