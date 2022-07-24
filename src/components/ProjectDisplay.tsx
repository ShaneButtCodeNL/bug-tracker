import { useEffect, useState } from "react";
import { GetProjectListOfIssues } from "../api/api";
import Issue from "../data/Issue";
import AddIssueDialog from "./AddIssueDialog";
import IssueDisplay from "./IssueDisplay";
import "./styles/ProjectDisplay.scss";

export default function ProjectDisplay(props: any) {
  const [issueList, setIssueList] = useState<any>([]);
  const [showDialog, setShowDialog] = useState<Boolean>(false);
  useEffect(() => {
    async function fetchIssueList() {
      let list = await GetProjectListOfIssues(props.project.getId());
      if (list) setIssueList(list);
    }
    fetchIssueList();
  }, []);
  return (
    <div className="project-display-container">
      <dl className="project-display-details">
        <dt>Project Name:</dt>
        <dd>{props.project.getName()}</dd>
        <dt>IssueList</dt>
        <dd>
          {issueList === null
            ? "Searching . . ."
            : issueList.length === 0
            ? "No Issues with project"
            : issueList.map((x: Issue, i: any) => (
                <IssueDisplay
                  issue={x}
                  key={`Issue-display-${x.getId()}`}
                  index={i}
                />
              ))}
          <form
            onSubmit={(e) => e.preventDefault()}
            id={`add-issue-form-number-${props.index}`}
          >
            <button type="button" onClick={() => setShowDialog((x) => !x)}>
              Open new Issue
            </button>
          </form>
        </dd>
        <dt>Languages:</dt>
        <dd>
          <ul>
            {props.project.getLanguages().length ? (
              props.project
                .getLanguages()
                .map((x: string, i: number) => <li key={i}>{x}</li>)
            ) : (
              <li>None Listed</li>
            )}
          </ul>
          <form
            onSubmit={(e) => e.preventDefault()}
            id={`add-lang-form-number-${props.index}`}
          >
            <button type="button">Add Language</button>
          </form>
        </dd>
      </dl>
      <AddIssueDialog
        project={props.project}
        show={showDialog}
        changeShow={() => setShowDialog((x) => !x)}
      />
    </div>
  );
}
