import User from "./User";
export default class UserList {
  static userList: User[] = [];
  static getUser(username: string) {
    return this.userList.find((x) => x.getName() === username);
  }
  static getUserList() {
    return [...this.userList];
  }
  private static addUser(user: User) {
    if (!this.getUser(user.getName())) this.userList.push(user);
  }
  static makeUser(name: string, password: string) {
    if (!name || !password || name === "" || password === "") return;
    this.addUser(new User(name, this.userList.length + 1, password));
  }

  static reset() {
    this.userList = [];
  }
}
