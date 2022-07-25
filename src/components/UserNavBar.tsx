import {} from "../api/api";
import NavItem from "./NavItem";
import "./styles/UserNavBar.scss";
const linkList = [
  "Home",
  "Projects",
  "Add Project",
  "Find Projects",
  "MessageBox",
];
export default function UserNavBar(props: any) {
  return (
    <nav className="user-nav">
      {linkList.map((title, index) => (
        <NavItem
          title={title}
          index={index}
          key={index}
          activeLink={props.activeLink}
          setActiveLink={props.setActiveLink}
        />
      ))}
    </nav>
  );
}
