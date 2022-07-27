import "./styles/MessageDisplay.scss";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MessageDisplay(props: any) {
  return (
    <div className="message-display-container">
      <div className="message-display-toolbar">
        <div
          className="message-display-toolbar-item"
          tabIndex={0}
          onClick={() => props.setDisplayState(0)}
        >
          <FontAwesomeIcon icon={faRotateLeft} />
          &nbsp;Inbox
        </div>
      </div>
      <div className="message-display-content">
        <div className="message-display-detail-box">
          <div className="message-display-detail-title">
            {props.message.title}
          </div>
          <div className="message-display-detail-from">
            {props.message.from}
          </div>
          <div className="message-display-detail-date">
            {props.message.date}
          </div>
        </div>
        <div className="message-display-body">{props.message.body}</div>
      </div>
    </div>
  );
}