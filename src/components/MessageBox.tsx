import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquare,
  faEnvelope,
  faEnvelopeOpen,
} from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import {
  ChangeStatusOfMessage,
  ChangeStatusOfMessageList,
  DeleteListOfMessages,
  GetUserMessages,
  GiveMessageToUser,
} from "../api/api";
import { Statuses } from "../data/UserMessageList";
import "./styles/MessageBox.scss";
import MessageDisplay from "./MessageDisplay";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import ComposeMessageDisplay from "./ComposeMessageDisplay";
enum DisplayStates {
  Inbox = 0,
  ComposeMessage,
  DisplayMessage,
}
export default function MessageBox(props: any) {
  const [displayState, setDisplayState] = useState<number>(DisplayStates.Inbox);
  const [messageList, setMessageList] = useState<any>(null);
  const [displayMessage, setDisplayMessage] = useState<any>(null);
  const [selectedMessages, setSelectedMessages] = useState<
    (boolean | undefined)[]
  >([]);

  useEffect(() => {
    async function fetchMessageList() {
      let res = await GetUserMessages(props.user.getName());
      setDisplayMessage(null);
      setMessageList(res);
      setSelectedMessages(Array.from({ length: res.length }, (_) => false));
    }
    fetchMessageList();
  }, [props.user]);

  useEffect(() => {
    async function fetchMessageList() {
      let res = await GetUserMessages(props.user.getName());
      setDisplayMessage(null);
      setMessageList(res);
      setSelectedMessages(Array.from({ length: res.length }, (_) => false));
    }
    if (displayState === DisplayStates.Inbox) {
      fetchMessageList();
    }
  }, [displayState, props.user]);

  function ClickToOpenMessage(index: number) {
    //console.log("/n{", messageList[index], "/n}");
    async function updateState() {
      if (messageList[index].status !== Statuses.Read)
        await ChangeStatusOfMessage(
          props.user.getName(),
          messageList[index].id,
          Statuses.Read
        );
    }
    updateState();
    messageList[index].status = Statuses.Read;

    setDisplayMessage(messageList[index]);
    setDisplayState(DisplayStates.DisplayMessage);
  }

  function GetListOfIdsFromSelected() {
    let list: string[] = [];
    selectedMessages.forEach((selectd, index) => {
      if (selectd) list.push(messageList[index].id);
    });
    return list;
  }

  function SetSelectedStatusTo(status: string) {
    let list = GetListOfIdsFromSelected();
    async function update() {
      await ChangeStatusOfMessageList(props.user.getName(), list, status);
      let res = await GetUserMessages(props.user.getName());
      setDisplayMessage(null);
      setMessageList(res);
      setSelectedMessages(Array.from({ length: res.length }, (_) => false));
    }
    update();
  }

  function DeleteSelectedMessages() {
    let list = GetListOfIdsFromSelected();
    async function update() {
      await DeleteListOfMessages(props.user.getName(), list);
      let res = await GetUserMessages(props.user.getName());
      setDisplayMessage(null);
      setMessageList(res);
      setSelectedMessages(Array.from({ length: res.length }, (_) => false));
    }
    update();
  }

  function ChangeCheckBox(index: number) {
    function flip(arr: (boolean | undefined)[]) {
      if (arr.length <= index) return arr;
      arr[index] = !arr[index];
      return arr;
    }
    let newArr = [...flip(selectedMessages)];
    setSelectedMessages(newArr);
  }

  function switchState() {
    switch (displayState) {
      case DisplayStates.Inbox:
        return (
          <div className="message-box-inbox-container">
            <div className="message-box-inbox-toolbar">
              <button
                type="button"
                className="message-box-inbox-toolbar-item message-box-inbox-toolbar-item-select-all"
                onClick={() => setSelectedMessages((v) => v.map((_) => true))}
              >
                Select All
              </button>
              <button
                type="button"
                className="message-box-inbox-toolbar-item message-box-inbox-toolbar-item-deselect-all"
                onClick={() => setSelectedMessages((v) => v.map((_) => false))}
              >
                Deselect All
              </button>
              <button
                type="button"
                className="message-box-inbox-toolbar-item message-box-inbox-toolbar-itemmark-as-read"
                disabled={selectedMessages && selectedMessages.length === 0}
                onClick={() => SetSelectedStatusTo(Statuses.Read)}
              >
                Mark As Read
              </button>
              <button
                type="button"
                className="message-box-inbox-toolbar-item message-box-inbox-toolbar-itemmark-as-read"
                disabled={selectedMessages && selectedMessages.length === 0}
                onClick={() => SetSelectedStatusTo(Statuses.UnRead)}
              >
                Mark As Unread
              </button>
              <button
                type="button"
                className="message-box-inbox-toolbar-item message-box-inbox-toolbar-item-delete"
                disabled={selectedMessages && selectedMessages.length === 0}
                onClick={() => DeleteSelectedMessages()}
              >
                Delete
              </button>
            </div>
            <div className="message-box-inbox-message-list">
              {messageList ? (
                messageList.length === 0 ? (
                  <></>
                ) : (
                  <ul className="message-list">
                    {messageList.map((x: any, i: number) => (
                      <li
                        key={`message-list-key-${i}`}
                        className="message-list-item"
                      >
                        <div
                          onClick={() => ChangeCheckBox(i)}
                          className="message-list-item-checkbox"
                          tabIndex={0}
                          style={{ paddingLeft: 0 }}
                        >
                          {selectedMessages[i] ? (
                            <FontAwesomeIcon
                              icon={faSquareCheck}
                              fontSize="1.5em"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faSquare}
                              fontSize={"1.5em"}
                            />
                          )}
                        </div>
                        <div
                          className="message-list-item-title"
                          onClick={() => ClickToOpenMessage(i)}
                          tabIndex={0}
                        >
                          {x.title}
                        </div>
                        <div className="message-list-item-from">
                          From : <span>{x.from}</span>
                        </div>
                        <div
                          className="message-list-item-status"
                          onClick={() => ClickToOpenMessage(i)}
                        >
                          {x.status === Statuses.Read ? (
                            <FontAwesomeIcon icon={faEnvelopeOpen} />
                          ) : (
                            <FontAwesomeIcon icon={faEnvelope} />
                          )}
                        </div>
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
          <ComposeMessageDisplay
            user={props.user}
            setDisplayState={setDisplayState}
          />
        );
      case DisplayStates.DisplayMessage:
        return (
          <MessageDisplay
            message={displayMessage}
            user={props.user}
            setDisplayState={setDisplayState}
          />
        );
      default:
        return <>You Should never see this.</>;
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
