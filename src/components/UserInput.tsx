import "./styles/UserInput.scss";
import { Login } from "../api/api";
import { useRef } from "react";

function UserInput(props: any) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const login = () => {
    const user = Login(
      usernameRef.current?.value || null,
      passwordRef.current?.value.toLowerCase() || null
    );
    if (user) props.setUser(user);
    else {
      //Error handleing
    }
  };
  const logout = () => {
    props.setUser(null);
    props.setActiveLink(0);
  };
  return (
    <div className="user-input-container">
      {props.user === null ? (
        <form className="user-input-form">
          <label>UserName :</label>
          <input type="text" placeholder="UserName . . ." ref={usernameRef} />
          <label>Password :</label>
          <input type="text" placeholder="Password . . ." ref={passwordRef} />
          <button type="button" onClick={() => login()}>
            Login
          </button>
        </form>
      ) : (
        <form className="loggedin-user-import-form">
          Welcome, {props.user.getName()}
          <button onClick={() => logout()}>Logout</button>
        </form>
      )}
    </div>
  );
}

export default UserInput;
