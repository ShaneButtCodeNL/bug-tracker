import {
  DecoupleProjectAndMember,
  GetProject,
  GetUserProjectList,
} from "../api/api";
import "./styles/UnfollowConfirmDialog.scss";

export default function UnfollowConfirmDialog(props: any) {
  async function fetchList() {
    await DecoupleProjectAndMember(props.project.getId(), props.username);
    let res = await GetUserProjectList(props.username);
    let res2 = await fetchProjectsDetails(res);
    console.log(res2);
    props.setProjectList([...res2]);
    props.setShowUnfollowDialog(false);
  }
  async function fetchProjectsDetails(pids: string[] | null) {
    if (pids) {
      let res = [];
      for (let id of pids) {
        let project = await GetProject(id);
        if (project) res.push(project);
      }
      return res;
    }
    return [];
  }
  return (
    <div
      className={`unfollow-confirm-dialog ${
        props.showUnfollowDialog
          ? "show-unfollow-dialog"
          : "hide-unfollow-dialog"
      }`}
    >
      <span className="unfollow-dialog-text">
        Are you sure you wish to unfollow {props.project.getName()}? If the
        project is public you can find it with "Find Project", if it's privite
        you will need to be invited again.
      </span>
      <button
        className="unfollow-dialog-confirm"
        type="button"
        onClick={() => {
          fetchList();
        }}
        tabIndex={props.showUnfollowDialog ? 0 : -1}
      >
        Confirm
      </button>
      <button
        className="unfollow-dialog-cancel"
        type="button"
        onClick={() => props.setShowUnfollowDialog(false)}
        tabIndex={props.showUnfollowDialog ? 0 : -1}
      >
        Cancel
      </button>
    </div>
  );
}
