import "./styles/FindProjectDisplayItem.scss";

export default function FindProjectDisplayItem(props: any) {
  return (
    <div className="find-project-item-container">
      <h4 className="find-project-item-project-title">{props.Title}</h4>
      <label className="find-project-item-label">Languages : </label>
      <div className="find-project-item-lang-list">
        {props.LanguageList.length === 0
          ? "None Stated"
          : props.LanguageList.join(", ")}
      </div>
      {props.MemberList.indexOf(props.User.getName()) === -1 ? (
        <button type="button" className="find-project-item-button">
          Follow
        </button>
      ) : (
        <button type="button" className="find-project-item-button">
          Unfollow
        </button>
      )}
    </div>
  );
}
