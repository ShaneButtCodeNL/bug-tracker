import { useEffect, useState } from "react";
import {
  CoupleProjectAndMember,
  DecoupleProjectAndMember,
  GetProject,
} from "../api/api";
import Project from "../data/Project";
import "./styles/FindProjectDisplayItem.scss";

export default function FindProjectDisplayItem(props: any) {
  const [project, setProject] = useState<Project | null>(null);
  useEffect(() => {
    async function fetchProject() {
      let proj = await GetProject(props.ProjectId);
      setProject(proj);
    }
    fetchProject();
  });
  if (project)
    return (
      <div className="find-project-item-container">
        <h4 className="find-project-item-project-title">
          {project?.getName()}
        </h4>
        <label className="find-project-item-label">Languages : </label>
        <div className="find-project-item-lang-list">
          {project?.getLanguages().length === 0
            ? "None Stated"
            : project?.getLanguages().join(", ")}
        </div>
        {project?.getMembers().indexOf(props.User.getName()) === -1 ? (
          <button
            type="button"
            className="find-project-item-button"
            onClick={() => {
              CoupleProjectAndMember(props.ProjectId, props.User.getName());
            }}
          >
            Follow
          </button>
        ) : (
          <button
            type="button"
            className="find-project-item-button"
            onClick={() => {
              DecoupleProjectAndMember(props.ProjectId, props.User.getName());
            }}
          >
            Unfollow
          </button>
        )}
      </div>
    );
  return <></>;
}
