import Project from "./Project";
import User from "./User";
const key = "userList";
export default class UserList {
  /**
   * Get a user object from the list of users
   * @param username The username we are fetching
   * @returns The user if it exists or null if it doesn't
   */
  static getUser(username: string): User | null {
    let user = this.getUserList().find((x) => x.getName() === username) || null;
    return user;
  }

  /**
   * Adds a project to the selected user
   * @param project The project to be added
   * @param userName The username of user
   */
  static addProjectToUser(project: Project, userName: string) {
    let userList = this.getUserList();
    let user = userList.find((x) => x.getName() === userName) || null;
    if (user !== null) {
      user.addProjectToList(project);
      localStorage.setItem(key, JSON.stringify({ userList: userList }));
    }
  }

  /**
   * Add a user to another users friendlist
   * @param usernameA The username with friendlist
   * @param usernameB The username to be added
   */
  static addUserToFriendList(usernameA: string, usernameB: string) {
    let userList = this.getUserList();
    let user = userList.find((x) => x.getName() === usernameA);
    if (user) {
      user.addFriendToList(usernameB);
      localStorage.setItem(key, JSON.stringify({ userList: userList }));
    }
  }

  /**
   * Remove a user from a users friendlist
   * @param usernameA The user having friend removed
   * @param usernameB The user to be removed
   */
  static removeUserFromFriendList(usernameA: string, usernameB: string) {
    let userList = this.getUserList();
    let user = userList.find((x) => x.getName() === usernameA);
    if (user) {
      user.removeFriendFromList(usernameB);
      localStorage.setItem(key, JSON.stringify({ userList: userList }));
    }
  }

  /**
   * Gets the list of all users
   * @returns An array of User objects
   */
  static getUserList(): User[] {
    let userList = localStorage.getItem(key);
    if (userList === null) {
      localStorage.setItem(key, JSON.stringify({ userList: [] }));
      return [];
    }
    return JSON.parse(userList).userList.map((x: any) =>
      User.makeUserFromJSON(x)
    );
  }

  /**
   * Adds a user to the list of users
   * @param user The user to add
   * @returns
   */
  private static addUser(user: User) {
    let userList: User[] = this.getUserList();
    let exists =
      userList.find((x: User) => x.getName() === user.getName()) || null;
    if (exists !== null) return;
    userList.push(user);
    localStorage.setItem(key, JSON.stringify({ userList: userList }));
  }

  /**
   * Creates and adds a user to the userlist
   * @param name The username
   * @param password The password
   * @returns
   */
  static makeUser(name: string, password: string) {
    if (!name || !password || name === "" || password === "") return;
    this.addUser(new User(name, password));
  }

  /**
   * Removes a project from the list of projects followed by a user
   * @param userName The users username
   * @param project The project to be unfollowed
   * @returns
   */
  static removeUserFromProject(userName: string, project: Project) {
    const userList = this.getUserList();
    const user = userList.find((x) => x.getName() === userName) || null;
    if (!user) return;
    user.removeProjectFromList(project);
    localStorage.setItem(key, JSON.stringify({ userList: userList }));
  }

  /**
   * Resets the local storage state of the userlist
   */
  static reset() {
    localStorage.setItem(key, JSON.stringify({ userList: [] }));
  }
}
