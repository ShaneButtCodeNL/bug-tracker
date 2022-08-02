import User from "./User";
import { v4 as uuidv4 } from "uuid";

export default class Project {
  private id: string;
  name: string;
  description: string;
  isPublic: boolean;
  languages: string[];
  members: string[];

  static makeProjectFromJSON(input: any): Project | null {
    if (!input.languages) input.languages = [];
    if (!input.members) input.members = [];
    if (!input.id || !input.name || !input.description) return null;
    const pro = new Project(
      input.name,
      input.description,
      input.languages,
      false
    );
    pro.isPublic = input.isPublic;
    pro.members = input.members;
    pro.setId(input.id);
    return pro;
  }

  constructor(
    name: string,
    description: string,
    languages: string[],
    isPublic: boolean
  ) {
    this.id = uuidv4();
    this.languages = [...languages];
    this.name = name;
    this.description = description;
    this.members = [];
    this.isPublic = isPublic;
  }

  getId() {
    return this.id;
  }
  private setId(newId: string) {
    this.id = newId;
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
  compareTo(project: Project | null) {
    return project !== null && project.getId() === this.id;
  }
  getJSON() {
    return {
      id: this.id,
      name: this.name,
      languages: this.languages,
      members: this.members,
      isPublic: this.isPublic,
    };
  }
  getJSONString() {
    return JSON.stringify(this.getJSON());
  }
  addLanguage(language: string) {
    if (this.languages.indexOf(language) === -1) this.languages.push(language);
  }
  addMember(user: User) {
    if (!this.members.find((x) => x === user.getName()))
      this.members.push(user.getName());
  }

  removeMember(user: User) {
    console.debug("MEMBERS:", this.members);
    for (let i = 0; i < this.members.length; i++) {
      if (this.members[i] === user.getName()) {
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
