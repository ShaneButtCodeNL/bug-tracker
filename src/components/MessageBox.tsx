import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEnvelopeOpen,
} from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { GetUserMessages, GiveMessageToUser } from "../api/api";
import { Statuses } from "../data/UserMessageList";
import "./styles/MessageBox.scss";
enum DisplayStates {
  Inbox = 0,
  ComposeMessage,
  DisplayMessage,
}
export default function MessageBox(props: any) {
  const [displayState, setDisplayState] = useState<number>(DisplayStates.Inbox);
  const [messageList, setMessageList] = useState<any>(null);

  useEffect(() => {
    async function fetchMessageList() {
      let res = await GetUserMessages(props.user.getName());
      setMessageList(res);
    }
    fetchMessageList();
  }, [props.user]);

  function switchState() {
    switch (displayState) {
      case DisplayStates.Inbox:
        return (
          <div className="message-box-inbox-container">
            <div className="message-box-inbox-toolbar">
              <button
                type="button"
                onClick={() =>
                  GiveMessageToUser(
                    props.user.getName(),
                    props.user.getName(),
                    "Test 1",
                    Date.now().toString(),
                    1
                  )
                }
              >
                Send Message to me
              </button>
            </div>
            <div className="message-box-inbox-message-list">
              {messageList ? (
                messageList.length == 0 ? (
                  <></>
                ) : (
                  <ul className="message-list">
                    {messageList.map((x: any, i: number) => (
                      <li
                        key={`message-list-key-${i}`}
                        className="message-list-item"
                      >
                        <div className="message-list-item-title">{x.title}</div>
                        <div className="message-list-item-from">
                          From : {x.from}
                        </div>
                        <div className="message-list-item-status">
                          {x.status === Statuses.Read ? (
                            <FontAwesomeIcon icon={faEnvelopeOpen} />
                          ) : (
                            <FontAwesomeIcon icon={faEnvelope} />
                          )}
                        </div>
                        <input
                          type={"checkbox"}
                          className="message-list-item-checkbox"
                        />
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                <>Loading . . .</>
              )}
            </div>
          </div>
        );
      case DisplayStates.ComposeMessage:
        return (
          <div className="message-box-compose-message-container">compose</div>
        );
    }
  }
  return (
    <div className="message-box-container">
      <section>
        <h1>Message Box</h1>
        <div className="message-box-contents">
          <div className="message-box-side-bar">
            <ul>
              <li
                onClick={() => setDisplayState(DisplayStates.Inbox)}
                className={`${
                  displayState === DisplayStates.Inbox ||
                  displayState === DisplayStates.DisplayMessage
                    ? "selected"
                    : ""
                }`}
              >
                Inbox
              </li>
              <li
                onClick={() => setDisplayState(DisplayStates.ComposeMessage)}
                className={`${
                  displayState === DisplayStates.ComposeMessage
                    ? "selected"
                    : ""
                }`}
              >
                Compose Message
              </li>
            </ul>
          </div>
          <div className="message-box-display">{switchState()}</div>
        </div>
      </section>
    </div>
  );
}
