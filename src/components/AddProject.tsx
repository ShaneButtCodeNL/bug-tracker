import "./styles/AddProjects.scss";
import { AddProjectToList } from "../api/api";
import { useRef, useState } from "react";
import SelectedLanguage from "./SelectedLanguage";
import Project from "../data/Project";
import { LanguageList } from "./Values";

export default function AddProjects(props: any) {
  const [languages, setLanguages] = useState([""]);
  const projectNameRef = useRef<HTMLInputElement>(null);
  const projectDescRef = useRef<HTMLTextAreaElement>(null);
  const selectedLanguageRef = useRef<HTMLSelectElement>(null);
  const isPublicRef = useRef<string>("public");

  function addLanguage(lang: string) {
    let index = languages.indexOf(lang);
    if (lang === "" || index !== -1) return;
    let newLang = languages[0] === "" ? [] : [...languages];
    newLang.push(lang);
    newLang.sort((a, b) => a.localeCompare(b));
    setLanguages(newLang);
  }

  function removeLanguage(lang: string) {
    let index = languages.indexOf(lang);
    if (lang === "" || index === -1) {
      return;
    }
    let newLang = [...languages];
    newLang.splice(index, 1);
    setLanguages(newLang.length === 0 ? [""] : newLang);
  }

  async function addProjectToList() {
    if (
      projectNameRef.current &&
      languages &&
      projectNameRef.current.value &&
      projectNameRef.current.value !== ""
    ) {
      const project = new Project(
        projectNameRef.current.value,
        projectDescRef.current?.value || "None",
        languages[0] === "" ? [] : languages,
        isPublicRef.current === "public"
      );
      await AddProjectToList(project, props.user);
      projectNameRef.current.value = "";
      if (projectDescRef && projectDescRef.current)
        projectDescRef.current.value = "";
      setLanguages([""]);
      return;
    }
    //todo Error handle
  }

  return (
    <div className="addprojects-wrapper-div">
      <section>
        <h1>Add Project</h1>
        <form
          id="add-project-form"
          className="add-project-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <label>Project Name:</label>
          <input type="text" ref={projectNameRef} />

          <label>Project Description:</label>
          <textarea
            rows={4}
            cols={30}
            maxLength={120}
            placeholder="Max 120 characters."
            ref={projectDescRef}
          ></textarea>
          <label>Make Public :</label>
          <div className="language-container">
            <input
              type={"radio"}
              value="public"
              name="is-public"
              onClick={() => (isPublicRef.current = "public")}
              checked
            />{" "}
            Public
            <input
              type={"radio"}
              value="private"
              name="is-public"
              onClick={() => (isPublicRef.current = "private")}
            />{" "}
            Private
          </div>
          <label>Languages:</label>
          <div className="language-container">
            <div className="selected-languages">
              {languages.map((x, i) => (
                <SelectedLanguage
                  key={i}
                  index={i}
                  language={x}
                  removeLanguage={removeLanguage}
                />
              ))}
            </div>
            <hr />
            <div className="language-selector">
              <select ref={selectedLanguageRef}>
                <option value={""} key={-1}>
                  None
                </option>
                {LanguageList.map((x, i) => (
                  <option value={x} key={`lang-option-key-${i}`}>
                    {x}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() =>
                  addLanguage(selectedLanguageRef.current?.value || "")
                }
              >
                Add Language
              </button>
            </div>
          </div>
          <button type="button" onClick={() => addProjectToList()}>
            Add Project
          </button>
        </form>
      </section>
    </div>
  );
}
