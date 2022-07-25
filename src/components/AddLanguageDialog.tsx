import { LanguageList } from "./Values";
import "./styles/AddLanguageDialog.scss";
import { useEffect, useRef, useState } from "react";
import { AddLanguageToProject, GetProject } from "../api/api";

export default function AddLanguageDialog(props: any) {
  const langRef = useRef<HTMLSelectElement>(null);
  const [selectedLang, setSelectedLang] = useState<any>(null);

  function close(e: any) {
    e.stopPropagation();
    if (langRef.current) langRef.current.value = "";
    props.changeShow();
  }

  async function fetchList() {
    let pro = await GetProject(props.project.getId());
    if (pro) {
      props.setLangList(pro.getLanguages());
    }
  }

  function updateList(e: any) {
    AddLanguageToProject(props.project.getId(), selectedLang);
    fetchList();
    close(e);
  }

  return (
    <div
      className={`add-lang-dialog ${props.show ? "show" : "hide"}`}
      onClick={(e: any) => close(e)}
      onMouseOver={(e) => e.stopPropagation()}
    >
      <form
        id={`add-Lang-dialog-${props.project.getId()}`}
        className="add-lang-dialog-form"
        onSubmit={(e) => e.preventDefault()}
        onClick={(e) => e.stopPropagation()}
      >
        <label>Language:</label>
        <select
          ref={langRef}
          onChange={() =>
            setSelectedLang(
              langRef.current?.value === "" ? null : langRef.current?.value
            )
          }
          disabled={!props.show}
          tabIndex={props.show ? 0 : -1}
        >
          <option value={""}>None</option>
          {LanguageList.map((x, i) =>
            props.languages.indexOf(x) !== -1 ? (
              <></>
            ) : (
              <option value={x} key={`${x}-${i}`}>
                {x}
              </option>
            )
          )}
        </select>
        {selectedLang !== null ? (
          <button type="button" onClick={(e) => updateList(e)}>
            Add <i>{selectedLang}</i>
          </button>
        ) : (
          <></>
        )}
        <button
          type="button"
          className="cancel-lang-select-button"
          onClick={(e) => close(e)}
          tabIndex={props.show ? 0 : -1}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
