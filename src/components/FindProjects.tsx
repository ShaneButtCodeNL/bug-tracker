import { useEffect, useState } from "react";
import { GetPublicProjects } from "../api/api";
import Project from "../data/Project";
import FindProjectDisplayItem from "./FindProjectDisplayItem";
import "./styles/FindProjects.scss";

export default function FindProjects(props: any) {
  const [projectList, setProjectList] = useState<Project[] | null>(null);
  useEffect(() => {
    async function fetchList() {
      let list = await GetPublicProjects();
      setProjectList(list);
    }
    fetchList();
  }, []);
  return (
    <div className="find-project-list-container">
      <section>
        <h1>Find Projects</h1>
        <ul className="find-project-list">
          {projectList === null ? (
            <li className="find-project-list-item">Searching . . .</li>
          ) : projectList.length > 0 ? (
            projectList.map((pro, i) => (
              <li
                className="find-project-list-item"
                key={`find-project-list-item-${i}`}
              >
                <FindProjectDisplayItem
                  ProjectId={pro.getId()}
                  User={props.user}
                />
              </li>
            ))
          ) : (
            <li className="find-project-list-item">
              Well this is embarrissing. Looks like we couldn't find any public
              projects . Why dont you start one ?{" "}
              <button type="button"> Add Project </button>{" "}
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
