import Project from "./Project";
import User from "./User";
const key = "userList";
export default class UserList {
  static getUser(username: string): User | null {
    let user = this.getUserList().find((x) => x.getName() === username) || null;

    return user;
  }

  static addProjectToUser(project: Project, userName: string) {
    let userList = this.getUserList();
    let user = userList.find((x) => x.getName() === userName) || null;
    if (user !== null) {
      user.addProjectToList(project);
      localStorage.setItem(key, JSON.stringify({ userList: userList }));
    }
  }

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
  private static addUser(user: User) {
    let userList: User[] = this.getUserList();
    let exists =
      userList.find((x: User) => x.getName() === user.getName()) || null;
    if (exists !== null) return;
    userList.push(user);
    localStorage.setItem(key, JSON.stringify({ userList: userList }));
  }
  static makeUser(name: string, password: string) {
    if (!name || !password || name === "" || password === "") return;
    this.addUser(new User(name, password));
  }

  static removeUserFromProject(userName: string, project: Project) {
    const userList = this.getUserList();
    const user = userList.find((x) => x.getName() === userName) || null;
    if (!user) return;
    user.removeProjectFromList(project);
    localStorage.setItem(key, JSON.stringify({ userList: userList }));
  }

  static reset() {
    localStorage.setItem(key, JSON.stringify({ userList: [] }));
  }
}
