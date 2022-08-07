import { useEffect, useRef, useState } from "react";
import {
  GetProjectListOfIssues,
  GetProjectListOfLanguages,
  SendInviteToUser,
} from "../api/api";
import Issue from "../data/Issue";
import AddIssueDialog from "./AddIssueDialog";
import AddLanguageDialog from "./AddLanguageDialog";
import IssueDisplay from "./IssueDisplay";
import "./styles/ProjectDisplay.scss";
import UnfollowConfirmDialog from "./UnfollowConfirmDialog";

export default function ProjectDisplay(props: any) {
  const [issueList, setIssueList] = useState<any>(null);
  const [langList, setLangList] = useState<string[]>([]);
  const [showIssueDialog, setShowIssueDialog] = useState<Boolean>(false);
  const [showLangDialog, setShowLangDialog] = useState<Boolean>(false);
  const [showUnfollowDialog, setShowUnfollowDialog] = useState<Boolean>(false);
  const inviteNameRef = useRef<HTMLInputElement>(null);
  const [inviteName, setInviteName] = useState("");

  async function fetchIssueList() {
    console.log("fetch");
    let list = await GetProjectListOfIssues(props.project.getId());
    if (list) setIssueList(list);
    let langs = await GetProjectListOfLanguages(props.project.getId());
    setLangList(langs);
  }

  useEffect(() => {
    fetchIssueList();
  }, [props.project]);
  return (
    <div className={`project-display-container ${props.project.getId()}`}>
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
      <div className="project-display-invite-container">
        <div>Invite a Friend :</div>
        <input
          type="text"
          className="project-display-invite-input"
          placeholder="Username"
          onChange={(e) => setInviteName(e.target.value)}
          ref={inviteNameRef}
        />
        <button
          type="button"
          className="project-display-invite-button"
          onClick={() => {
            SendInviteToUser(inviteName, props.user.getName(), props.project);
            if (inviteNameRef.current) inviteNameRef.current.value = "";
          }}
          disabled={inviteName === ""}
        >
          Send
        </button>
        <button
          type="button"
          className="project-display-unfollow-button"
          onClick={() => {
            setShowIssueDialog(false);
            setShowLangDialog(false);
            setShowUnfollowDialog(true);
          }}
        >
          Unfollow
        </button>
      </div>
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
      <UnfollowConfirmDialog
        project={props.project}
        username={props.user.getName()}
        showUnfollowDialog={showUnfollowDialog}
        setShowUnfollowDialog={setShowUnfollowDialog}
        setProjectList={props.setProjectList}
      />
    </div>
  );
}
