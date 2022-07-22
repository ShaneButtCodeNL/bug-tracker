import { useState } from "react";
import { GetUserProjectList } from "../api/api";
import "./styles/Projects.scss";

export default function Projects(props: any) {
  const [projectList, setProjectList] = useState(
    props.user ? GetUserProjectList(props.user.getName()) : null
  );
  return (
    <div className="projects-wrapper-div">
      <section>
        <h1>Projects</h1>
        {projectList === null || projectList.length === 0 ? (
          <form onSubmit={(e) => e.preventDefault()}>
            <p>
              Looks like your not following any projects. Why not add a project
              or follow an existing one.
            </p>
            <button type="button" onClick={() => props.setActiveLink(2)}>
              Add Project
            </button>
          </form>
        ) : (
          <></>
        )}
      </section>
    </div>
  );
}
