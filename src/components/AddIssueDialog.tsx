import { useRef } from "react";
import { AddIssueToProject, GetProjectListOfIssues } from "../api/api";
import "./styles/AddIssueDialog.scss";

export default function AddIssueDialog(props: any) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  function UpdateList() {
    async function fetchIssueList() {
      let list = await GetProjectListOfIssues(props.project.getId());
      if (list) props.setIssueList(list);
    }
    fetchIssueList();
  }

  function close(e: any) {
    e.stopPropagation();
    if (titleRef.current) titleRef.current.value = "";
    if (descRef.current) descRef.current.value = "";
    props.changeShow();
  }

  return (
    <div
      className={`add-issue-dialog ${props.show ? "show" : "hide"}`}
      onClick={(e: any) => close(e)}
      onMouseOver={(e) => e.stopPropagation()}
    >
      <form
        id={`add-issue-dialog-${props.project.getId()}`}
        className="add-issue-dialog-form"
        onSubmit={(e) => e.preventDefault()}
        onClick={(e) => e.stopPropagation()}
      >
        <label>Title:</label>
        <input
          type={"text"}
          ref={titleRef}
          disabled={!props.show}
          tabIndex={props.show ? 0 : -1}
        />
        <label>Description:</label>
        <textarea
          disabled={!props.show}
          ref={descRef}
          maxLength={100}
          placeholder="Max 100 characters."
          tabIndex={props.show ? 0 : -1}
        ></textarea>
        <button
          type="button"
          disabled={!props.show}
          tabIndex={props.show ? 0 : -1}
          onClick={(e) => {
            AddIssueToProject(
              props.project.getId(),
              titleRef.current?.value || "",
              descRef.current?.value || ""
            );
            UpdateList();
            close(e);
          }}
        >
          Open Issue
        </button>
        <button
          type="button"
          onClick={(e) => close(e)}
          tabIndex={props.show ? 0 : -1}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
