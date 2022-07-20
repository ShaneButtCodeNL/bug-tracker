import "./styles/UserInput.scss";

function UserInput() {
  return (
    <div className="user-input-container">
      <form className="user-input-form">
        <label>UserName :</label>
        <input type="text" placeholder="UserName . . ." />
        <label>Password :</label>
        <input type="text" placeholder="Password . . ." />
        <button type="button">Login</button>
      </form>
    </div>
  );
}

export default UserInput;
