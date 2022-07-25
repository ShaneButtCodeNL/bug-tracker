import "./styles/IssueDisplay.scss";
import Issue from "../data/Issue";
import { SetIssueToClosed, SetIssueToOpen } from "../api/api";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function IssueDisplay(props: any) {
  const [enable, setEnable] = useState<Boolean>(true);
  async function changeState() {
    if (props.issue.getStateValue() === Issue.Open) {
      await SetIssueToClosed(props.projectId, props.issue.getId());
    } else {
      await SetIssueToOpen(props.projectId, props.issue.getId());
    }
    await props.fetchIssueList();
    setEnable(true);
  }
  return (
    <div className={`issue-container ${props.issue.getState()}`}>
      <div className="issue-state">
        {props.issue.getStateValue() === Issue.Open ? (
          <div className="open-icon-bg">
            <FontAwesomeIcon icon={faCircleExclamation} color="red" />
          </div>
        ) : (
          <div className="close-icon-bg">
            <FontAwesomeIcon icon={faCircleCheck} color="white" />
          </div>
        )}
      </div>
      <div className="issue-title">{props.issue.getTitle()}</div>
      <div className="issue-desc">{props.issue.getDescription()}</div>

      {props.issue.getStateValue() === Issue.Open ? (
        <button
          className="issue-state-button"
          type="button"
          disabled={!enable}
          onClick={() => {
            setEnable(false);
            changeState();
          }}
        >
          Close Issue
        </button>
      ) : (
        <button
          className="issue-state-button open-issue-state-button"
          type="button"
          disabled={!enable}
          onClick={() => {
            setEnable(false);
            changeState();
          }}
        >
          Open Issue
        </button>
      )}
    </div>
  );
}
