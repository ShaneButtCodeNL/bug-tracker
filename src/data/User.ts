import Project from "./Project";
import { v4 as uuidv4 } from "uuid";

export default class User {
  name: string;
  private friendList: string[];
  private password: string;
  private id: string;
  private projects: string[];

  /**
   * Class defines a user and gives them an id and a list of projects associated with them
   * @param name Username for the user
   * @param password Password for the user
   */
  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
    this.id = uuidv4();
    this.projects = [];
    this.friendList = [];
  }

  /**
   * Sets the id of an user
   * @param newId The new id
   */
  private setId(newId: string) {
    this.id = newId;
  }

  /**
   * Gets the JSON Representation of this user object
   * @returns A json rep of the user {name:"...", password:"...", id:"...", projects:[...], friendList:["..."]}
   */
  getJSON() {
    return {
      name: this.name,
      password: this.password,
      id: this.id,
      projects: this.projects,
      friendList: this.friendList,
    };
  }

  /**
   * Gets a Stringified version of this user object
   * @returns The string form of the JSON Of this user "..."
   */
  getJSONString() {
    return JSON.stringify(this.getJSON());
  }

  /**
   * Makes a user from a JSON object
   * @param input The JSON
   * @returns A User object
   */
  static makeUserFromJSON(input: any) {
    if (
      !input ||
      !input.name ||
      !input.password ||
      input.name === "" ||
      input.password === ""
    )
      return null;
    let user = new User(input.name, input.password);
    if (input.id && input.id !== "") user.setId(input.id);
    user.setProjectsToList(input.projects);
    if (input.friendList && input.friendList.length > 0)
      user.friendList = [...input.friendList];
    return user;
  }

  /**
   * Gets the name value from the user object
   * @returns The Users name
   */
  getName() {
    return this.name;
  }

  /**
   * Gets a list of usernames this user follows
   * @returns An array of usernames
   */
  getFriendList() {
    return this.friendList;
  }

  /**
   * Gets the id of this user object
   * @returns The id of this user object
   */
  getId() {
    return this.id;
  }

  /**
   * Gets the users password
   * @returns This users password
   */
  getPassword() {
    return this.password;
  }

  /**
   * The list of project ids this user follows
   * @returns An array of project ids
   */
  getProjectsArray() {
    return [...this.projects];
  }

  /**
   * Compares if two users are the same
   * @param user An user object to compare this one to
   * @returns is this object the same as this one
   */
  compareTo(user: User) {
    return user.getId() === this.id;
  }

  /**
   * Adds a username to list of users this user follows
   * @param userName Username to be added
   */
  addFriendToList(userName: string) {
    if (this.friendList.indexOf(userName) === -1)
      this.friendList.push(userName);
  }

  /**
   * Adds a project to the list of projects this user follows
   * @param project The project to be added
   * @returns
   */
  addProjectToList(project: Project) {
    if (this.projects.find((x) => x === project.getId())) return;
    this.projects.push(project.getId());
  }

  /**
   * Sets the followed project list
   * @param list The list to set to
   */
  private setProjectsToList(list: string[]) {
    this.projects = list;
  }

  /**
   * Remove a username from the list of users this user follows
   * @param userName Username to be removed
   */
  removeFriendFromList(userName: string) {
    let index = this.friendList.indexOf(userName);
    if (index > -1) this.friendList.splice(index, 1);
  }

  /**
   * Remove a project from the followed list of projects
   * @param project The project to be removed
   * @returns
   */
  removeProjectFromList(project: Project) {
    for (let i = 0; i < this.projects.length; i++) {
      if (project.getId() === this.projects[i]) {
        this.projects.splice(i, 1);
        return;
      }
    }
  }
}
