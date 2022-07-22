import "./styles/Home.scss";

export default function Home(props: any) {
  return (
    <div className="home-wrapper-div">
      <section>
        <h1>Home</h1>
        Welcome {props.user.getName()}
      </section>
    </div>
  );
}
