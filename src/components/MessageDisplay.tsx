import "./styles/MessageDisplay.scss";
import {
  faRotateLeft,
  faUserPlus,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AddToUserFollowedUsers,
  CoupleProjectAndMember,
  RemoveUserFromFollowedUsers,
  UserFollowsUser,
} from "../api/api";
import { useEffect, useState } from "react";

export default function MessageDisplay(props: any) {
  const [followsSender, setFollowsSender] = useState<boolean | null>(null);
  const [processing, setProcessing] = useState(true);
  useEffect(() => {
    async function fetchFollows() {
      let f = await UserFollowsUser(props.user.getName(), props.message.sender);
      setFollowsSender(f);
      setProcessing(false);
    }
    fetchFollows();
  }, []);
  return (
    <div className="message-display-container">
      <div className="message-display-toolbar">
        <button
          type="button"
          className="message-display-toolbar-item"
          tabIndex={0}
          onClick={() => props.setDisplayState(0)}
        >
          <FontAwesomeIcon icon={faRotateLeft} />
          &nbsp;Inbox
        </button>
        {followsSender ? (
          <button
            type="button"
            className="message-display-toolbar-item"
            tabIndex={0}
            disabled={processing}
            onClick={() => {
              setProcessing(true);
              async function update() {
                await RemoveUserFromFollowedUsers(
                  props.user.getName(),
                  props.message.sender
                );
                let f = await UserFollowsUser(
                  props.user.getName(),
                  props.message.sender
                );
                setFollowsSender(f);
                setProcessing(false);
              }
              update();
            }}
          >
            Unfollow &nbsp;
            <FontAwesomeIcon icon={faUserMinus} /> &nbsp;
            {props.message.sender}
          </button>
        ) : (
          <button
            type="button"
            className="message-display-toolbar-item"
            tabIndex={0}
            disabled={processing}
            onClick={() => {
              setProcessing(true);
              async function update() {
                await AddToUserFollowedUsers(
                  props.user.getName(),
                  props.message.sender
                );
                let f = await UserFollowsUser(
                  props.user.getName(),
                  props.message.sender
                );
                setFollowsSender(f);
                setProcessing(false);
              }
              update();
            }}
          >
            Follow &nbsp;
            <FontAwesomeIcon icon={faUserPlus} /> &nbsp;
            {props.message.sender}
          </button>
        )}
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
        <div className="message-display-body">
          {props.message.body}
          <br />
          {props.message.type === 2 ? (
            <button
              type="button"
              className="invite-button"
              onClick={() =>
                CoupleProjectAndMember(
                  props.message.projectId,
                  props.user.getName()
                )
              }
            >
              Click {props.message.title.split(" ").slice(3).join(" ")}
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
