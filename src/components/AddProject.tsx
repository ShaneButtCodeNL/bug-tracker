import "./styles/AddProjects.scss";
import { AddProjectToList } from "../api/api";
import { useRef, useState } from "react";
import SelectedLanguage from "./SelectedLanguage";
import Project from "../data/Project";

const LanguageList = [
  "Java",
  "Python",
  "Javascript",
  "Typescript",
  "Ruby",
  "c",
  "c++",
  "c#",
  "Prolog",
  "Lisp",
  "Scala",
].sort((a, b) => a.localeCompare(b));

export default function AddProjects(props: any) {
  const [languages, setLanguages] = useState([""]);
  const projectNameRef = useRef<HTMLInputElement>(null);
  const projectDescRef = useRef<HTMLTextAreaElement>(null);

  const selectedLanguageRef = useRef<HTMLSelectElement>(null);

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
        languages[0] === "" ? [] : languages
      );
      await AddProjectToList(project, props.user);
      return;
    }
    //todo Error handle
  }

  return (
    <div className="addprojects-wrapper-div">
      <h1>Add Project</h1>
      <form
        id="add-project-form"
        className="add-project-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <label>Project Name:</label>
        <input type="text" ref={projectNameRef} />
        {/*
        <label>Project Description:</label>
        <textarea
          rows={4}
          cols={30}
          maxLength={120}
          placeholder="Max 120 characters."
          ref={projectDescRef}
        ></textarea>
  */}
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
    </div>
  );
}
