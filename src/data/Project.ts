import User from "./User";
export default class Project {
  private id: number;
  name: string;
  languages: string[];
  members: User[];

  constructor(name: string, id: number, languages: string[]) {
    this.id = id;
    this.languages = [...languages];
    this.name = name;
    this.members = [];
  }

  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getLanguages() {
    return [...this.languages];
  }
  getMembers() {
    return [...this.members];
  }
  compareTo(project: Project) {
    return project.getId() === this.id;
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      languages: this.languages,
      members: this.members,
    };
  }
  addLanguage(language: string) {
    if (this.languages.indexOf(language) === -1) this.languages.push(language);
  }
  addMember(user: User) {
    if (!this.members.find((x) => x.compareTo(user))) this.members.push(user);
  }

  removeMember(user: User) {
    for (let i = 0; i < this.members.length; i++) {
      if (this.members[i].compareTo(user)) {
        this.members.splice(i, 1);
        return;
      }
    }
  }

  removeLanguage(language: string) {
    let i = this.languages.indexOf(language);
    if (i !== -1) this.languages.splice(i, 1);
  }
}
