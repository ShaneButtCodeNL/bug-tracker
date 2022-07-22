import "./styles/Welcome.scss";

export default function Welcome(props: any) {
  return (
    <div className="page-wrapper welcome-wrapper-div">
      <section className="welcome-section-explain">
        <h1>Welcome To Bug Trax</h1>
        <p>
          This platform allows users to track bugs across a piece of software
          that is being developed. It's as easy as 1 , 2 , 3.
        </p>
        <ol>
          <h3>
            <li>Add Your Project to the collection of tracked projects.</li>
          </h3>
          <p>Give us a name,description and a list of languages used. EASY .</p>
          <h3>
            <li>Add People to contribute to the project.</li>
          </h3>
          <p>
            These people will be able to access your project and look at issues
            to see just what needs to be done.
          </p>
          <h3>
            <li>Open/close issues</li>
          </h3>
          <p>
            Here users can open an issue or close an issue if it has been
            solved.
          </p>
        </ol>
      </section>
      <section className="welcome-section-directions">
        <h1>How to Use Me:</h1>
        <ol>
          <h3>
            <li>Create an Account.</li>
          </h3>
          <p></p>
          <h3>
            <li>Add any Project you want to keep tabs on.</li>
          </h3>
          <p></p>
        </ol>
      </section>
    </div>
  );
}
