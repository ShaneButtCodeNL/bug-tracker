import { useRef } from "react";
import { GiveMessageToUser } from "../api/api";
import "./styles/ComposeMessageDisplay.scss";

export default function ComposeMessageDisplay(props: any) {
  const userNameRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const messageBodyRef = useRef<HTMLTextAreaElement>(null);
  async function sendMessage() {
    let toUser: string = userNameRef.current?.value || "";
    let fromUser: string = props.user.getName();
    let title: string = titleRef.current?.value || "No Title";
    let bodyMsg = messageBodyRef.current?.value || "No Message";
    if (toUser === "" || fromUser === "") return;
    await GiveMessageToUser(toUser, fromUser, fromUser, title, bodyMsg, 1);
  }
  return (
    <div className="compose-message-display-container">
      <div className="compose-message-display-toolbar">
        <button
          className="compose-message-display-inbox-btn"
          onClick={() => props.setDisplayState(0)}
        >
          Inbox
        </button>
        <label className="compose-message-display-to-label">To :&nbsp;</label>
        <input
          type="text"
          className="compose-message-display-to-input"
          placeholder="UserName"
          ref={userNameRef}
        />
        <button
          type="button"
          className="compose-message-display-send-btn"
          onClick={() => sendMessage()}
        >
          Send
        </button>
        <label
          htmlFor="compose-message-display-title-input"
          className="compose-message-display-title-label"
        >
          Title :&nbsp;
        </label>
        <input
          id="compose-message-display-title-input"
          type="text"
          className="compose-message-display-title-input"
          placeholder="Max Length 20 Characters"
          maxLength={20}
          ref={titleRef}
        />
      </div>
      <div className="compose-message-display-main">
        <textarea
          className="compose-message-display-body-input"
          maxLength={200}
          placeholder="Max Length 200 characters."
          ref={messageBodyRef}
        ></textarea>
      </div>
    </div>
  );
}
