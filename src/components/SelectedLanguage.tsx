import "./styles/SelectedLanguage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
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
          <FontAwesomeIcon icon={faCircleXmark} fontSize="1.5em" />
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
