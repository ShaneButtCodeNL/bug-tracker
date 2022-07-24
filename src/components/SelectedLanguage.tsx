import "./styles/SelectedLanguage.scss";

export default function SelectedLanguage(props: any) {
  return (
    <div
      key={`selected-lang-key${props.index}`}
      className="selected-language-display-container"
    >
      {props.language === "" ? "None" : props.language}
      {props.language !== "" ? (
        <button
          type="button"
          onClick={() => props.removeLanguage(props.language)}
        >
          X
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
