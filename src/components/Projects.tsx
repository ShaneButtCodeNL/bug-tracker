import { useEffect, useState } from "react";
import {
  GetProject,
  GetProjectListOfIssues,
  GetUserProjectList,
} from "../api/api";
import Issue from "../data/Issue";
import Project from "../data/Project";
import ProjectDisplay from "./ProjectDisplay";
import "./styles/Projects.scss";

export default function Projects(props: any) {
  const [projectList, setProjectList] = useState<any>(null);
  useEffect(() => {
    async function fetchProjects(pids: string[] | null) {
      if (pids) {
        let res = [];
        for (let id of pids) {
          let project = await GetProject(id);
          res.push(project);
        }
        return res;
      }
      return [];
    }
    async function fetchList() {
      let res = await GetUserProjectList(props.user.getName());
      let res2 = await fetchProjects(res);
      setProjectList(res2);
    }
    fetchList();
  }, [props.user]);

  function makeProjectDisplay(project: Project, index: number) {
    //let issueList: Issue[] = [new Issue("F", "F")];
    //fetchIssueList(issueList, project.getId());
    return (
      <ProjectDisplay
        key={`project-display-${index}`}
        index={index}
        project={project}
        //issueList={issueList}
      />
    );
  }

  function projectsSwitch(list: Project[] | null) {
    if (list !== null) {
      if (list.length === 0)
        return (
          <form onSubmit={(e) => e.preventDefault()}>
            <p>
              Looks like your not following any projects. Why not add a project
              or follow an existing one.
            </p>
            <button type="button" onClick={() => props.setActiveLink(2)}>
              Add Project
            </button>
          </form>
        );
      return list.map((x, i) => makeProjectDisplay(x, i));
    }
    return <div>Searching</div>;
  }

  return (
    <div className="projects-wrapper-div">
      <section>
        <h1>Projects</h1>
        {projectsSwitch(projectList)}
      </section>
    </div>
  );
}
