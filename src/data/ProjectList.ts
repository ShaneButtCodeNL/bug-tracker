import Project from "./Project";
import IssueList from "./IssueList";
import UserList from "./UserList";
export default class ProjectList {
  private static listOfProjects: Project[] = [];
  static getListOfProjects() {
    return [...this.listOfProjects];
  }
  static addProjectToList(project: Project) {
    let exists = this.listOfProjects.find((x) => x.compareTo(project));
    if (exists) return;
    this.listOfProjects.push(project);
    //Add Empty issue list to project
    IssueList.addIssueListToProject(project.getId());
  }
  static addIssueToProject(
    projectId: number,
    issueTitle: string,
    issueDescription: string
  ) {
    let exists = this.getProject(projectId);
    if (!exists) return false;
    IssueList.addIssueToProjectIssues(projectId, issueTitle, issueDescription);
  }
  static getIssueList(projectId: number) {
    return IssueList.getIssueList(projectId);
  }
  static getProject(projectId: number) {
    return this.listOfProjects.find((x) => x.getId() === projectId);
  }
  static addMember(projectId: number, userName: string) {
    let user = UserList.getUser(userName);
    if (!user) return;
    let project = this.getProject(projectId);
    if (!project) return;
    project.addMember(user);
    user.addProjectToList(project);
  }
  static removeMember(projectId: number, username: string) {
    let user = UserList.getUser(username);
    if (!user) return;
    let project = this.getProject(projectId);
    if (!project) return;
    project.removeMember(user);
    user.removeProjectFromList(project);
  }
  static addLanguage(projectId: number, language: string) {
    if (!language || language === "") return;
    let project = this.getProject(projectId);
    if (!project) return;
    project.addLanguage(language);
  }
  static removeLanguage(projectId: number, language: string) {
    if (!language || language === "") return;
    let project = this.getProject(projectId);
    if (!project) return;
    project.removeLanguage(language);
  }

  static reset() {
    this.listOfProjects = [];
    UserList.reset();
    IssueList.reset();
  }
}
