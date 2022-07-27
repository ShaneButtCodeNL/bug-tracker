import "./styles/ComposeMessageDisplay.scss";

export default function ComposeMessageDisplay(props: any) {
  return (
    <div className="compose-message-display-container">
      <div className="compose-message-display-toolbar">
        <label className="compose-message-display-to-label">To :&nbsp;</label>
        <input
          type="text"
          className="compose-message-display-to-input"
          placeholder="UserName"
        />
        <button type="button" className="compose-message-display-send-btn">
          Send
        </button>
        <button className="compose-message-display-inbox-btn">Inbox</button>
      </div>
      <div className="compose-message-display-main">
        <textarea
          className="compose-message-display-body-input"
          maxLength={200}
          placeholder="Max Length 100 characters."
        ></textarea>
      </div>
    </div>
  );
}
