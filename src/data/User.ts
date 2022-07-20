import Project from "./Project";

export default class User {
  name: string;
  private password: string;
  private id: number;
  private projects: Project[];

  /**
   * Class defines a user and gives them an id and a list of projects associated with them
   * @param name Username for the user
   * @param id Unique id for the user
   * @param password Password for the user
   */
  constructor(name: string, id: number, password: string) {
    this.name = name;
    this.password = password;
    this.id = id;
    this.projects = [];
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
    if (this.projects.find((x) => x.getId() === project.getId())) return;
    this.projects.push(project);
  }

  removeProjectFromList(project: Project) {
    for (let i = 0; i < this.projects.length; i++) {
      if (project.getId() === this.projects[i].getId()) {
        this.projects.splice(i, 1);
        return;
      }
    }
  }
}
