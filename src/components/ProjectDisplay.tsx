import "./styles/ProjectDisplay.scss";

export default function ProjectDisplay(props: any) {
  return (
    <div className="project-display-container">
      <dl className="project-display-details">
        <dt>Project Name:</dt>
        <dd>{props.project.getName()}</dd>
        <dt>IssueList</dt>
        <dd>list</dd>
        <dt>Languages:</dt>
        <dd>
          <ul>
            {props.project.getLanguages().length ? (
              props.project
                .getLanguages()
                .map((x: string, i: number) => <li key={i}>{x}</li>)
            ) : (
              <li>None Listed</li>
            )}
          </ul>
        </dd>
      </dl>
    </div>
  );
}
