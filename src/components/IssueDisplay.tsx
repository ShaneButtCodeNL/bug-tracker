import Issue from "../data/Issue";

export default function IssueDisplay(props: any) {
  return (
    <div>
      <div>{props.issue.getState()}</div>
      <div>{props.issue.getTitle()}</div>
      <div>{props.issue.getDescription()}</div>
      <div>
        {props.issue.getStateValue() === Issue.Open ? (
          <button type="button">Close</button>
        ) : (
          <button type="button">Open</button>
        )}
      </div>
    </div>
  );
}
