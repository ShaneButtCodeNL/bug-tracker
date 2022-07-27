import { useState } from "react";
import "./styles/NavItem.scss";

export default function NavItem(props: any) {
  return (
    <div
      className={`nav-item-container ${
        props.activeLink === props.index ? "active" : "inactive"
      }`}
      key={props.index}
      tabIndex={0}
      onClick={() => {
        props.setActiveLink(+props.index);
      }}
    >
      <h3>{props.title}</h3>
    </div>
  );
}
