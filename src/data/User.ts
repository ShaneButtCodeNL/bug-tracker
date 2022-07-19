export default class User {
  private name: string;
  private password: string;
  private id: number;
  private projects: any;

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
    this.projects = new Set();
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

  getProjectsSet() {
    return this.projects;
  }

  getProjectsArray() {
    return [...this.projects];
  }

  compareTo(user: User) {
    return user.getId() === this.id;
  }
}
