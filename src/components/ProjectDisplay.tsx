import { useEffect, useState } from "react";
import { GetProjectListOfIssues } from "../api/api";
import Issue from "../data/Issue";
import AddIssueDialog from "./AddIssueDialog";
import AddLanguageDialog from "./AddLanguageDialog";
import IssueDisplay from "./IssueDisplay";
import "./styles/ProjectDisplay.scss";

export default function ProjectDisplay(props: any) {
  const [issueList, setIssueList] = useState<any>(null);
  const [langList, setLangList] = useState<string[]>(
    props.project.getLanguages() || []
  );
  const [showIssueDialog, setShowIssueDialog] = useState<Boolean>(false);
  const [showLangDialog, setShowLangDialog] = useState<Boolean>(false);

  async function fetchIssueList() {
    let list = await GetProjectListOfIssues(props.project.getId());
    if (list) setIssueList(list);
  }

  useEffect(() => {
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
                  fetchIssueList={fetchIssueList}
                  projectId={props.project.getId()}
                />
              ))}
          <form
            onSubmit={(e) => e.preventDefault()}
            id={`add-issue-form-number-${props.index}`}
          >
            <button
              type="button"
              onClick={() => {
                setShowLangDialog(false);
                setShowIssueDialog(true);
              }}
            >
              Open new Issue
            </button>
          </form>
        </dd>
        <dt>Languages:</dt>
        <dd>
          <ul>
            {langList.length ? (
              langList.map((x: string, i: number) => <li key={i}>{x}</li>)
            ) : (
              <li>None Listed</li>
            )}
          </ul>
          <form
            onSubmit={(e) => e.preventDefault()}
            id={`add-lang-form-number-${props.index}`}
          >
            <button
              type="button"
              onClick={() => {
                setShowIssueDialog(false);
                setShowLangDialog(true);
              }}
            >
              Add Language
            </button>
          </form>
        </dd>
      </dl>
      <AddIssueDialog
        project={props.project}
        show={showIssueDialog && !showLangDialog}
        changeShow={() => {
          setShowLangDialog(false);
          setShowIssueDialog((x) => !x);
        }}
        setIssueList={setIssueList}
      />
      <AddLanguageDialog
        project={props.project}
        show={showLangDialog && !showIssueDialog}
        languages={langList}
        changeShow={() => {
          setShowLangDialog((x) => !x);
          setShowIssueDialog(false);
        }}
        setLangList={setLangList}
      />
    </div>
  );
}
