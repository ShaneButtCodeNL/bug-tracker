import Project from "./Project";
import { v4 as uuidv4 } from "uuid";

export default class User {
  name: string;
  private password: string;
  private id: string;
  private projects: string[];

  /**
   * Class defines a user and gives them an id and a list of projects associated with them
   * @param name Username for the user
   * @param id Unique id for the user
   * @param password Password for the user
   */
  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
    this.id = uuidv4();
    this.projects = [];
  }

  private setId(newId: string) {
    this.id = newId;
  }

  getJSON() {
    return {
      name: this.name,
      password: this.password,
      id: this.id,
      projects: this.projects,
    };
  }

  getJSONString() {
    return JSON.stringify(this.getJSON());
  }

  static makeUserFromJSON(input: any) {
    if (
      !input ||
      !input.name ||
      !input.id ||
      !input.password ||
      input.name === "" ||
      input.password === ""
    )
      return null;
    let user = new User(input.name, input.password);
    user.setId(input.id);
    user.setProjectsToList(input.projects);
    return user;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getPassword() {
    return this.password;
  }

  getProjectsArray() {
    return [...this.projects];
  }

  compareTo(user: User) {
    return user.getId() === this.id;
  }

  addProjectToList(project: Project) {
    if (this.projects.find((x) => x === project.getId())) return;
    this.projects.push(project.getId());
  }

  private setProjectsToList(list: string[]) {
    this.projects = list;
  }

  removeProjectFromList(project: Project) {
    for (let i = 0; i < this.projects.length; i++) {
      if (project.getId() === this.projects[i]) {
        this.projects.splice(i, 1);
        return;
      }
    }
  }
}
