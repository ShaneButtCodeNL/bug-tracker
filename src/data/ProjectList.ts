import Project from "./Project";
import IssueList from "./IssueList";
import UserList from "./UserList";
import User from "./User";
const key = "projectList";

/**
 *
 *  {
 *    projectList:{
 *      projectList:{
 *        [
 *          project1,
 *          project2
 *        ]
 *      }
 *    }
 *  }
 */
export default class ProjectList {
  static getListOfProjects(): Project[] {
    let list = localStorage.getItem(key);

    //Local storage has project list? continue else add to locale storage return empty array
    if (!list) {
      localStorage.setItem(key, JSON.stringify({ projectList: [] }));
      return [];
    }
    //Return project list
    return JSON.parse(list).projectList.map((x: any) =>
      Project.makeProjectFromJSON(x)
    );
  }

  static getListOfPublicProjects() {
    let list = this.getListOfProjects();
    //todo Filter
    return list;
  }

  static addProjectToList(project: Project, user: User | null) {
    //Check if project is already in list
    let exists =
      this.getListOfProjects().find((x) => x.compareTo(project)) || null;

    //Already exists? Exit
    if (exists !== null) return;
    if (user) {
      project.addMember(user);
      UserList.addProjectToUser(project, user.getName());
      IssueList.setUpProjectIssueList(project.getId());
      //user.addProjectToList(project);
    }
    let pList = this.getListOfProjects();
    pList.push(project);
    //Add to list
    localStorage.setItem(key, JSON.stringify({ projectList: pList }));
  }

  static addIssueToProject(
    projectId: string,
    issueTitle: string,
    issueDescription: string
  ) {
    // console.log(projectId, issueTitle, issueDescription);
    IssueList.addIssueToProjectIssues(issueTitle, issueDescription, projectId);
  }

  static getIssueListOfProject(projectId: string) {
    //console.log("pid ", projectId);
    let val = IssueList.getIssueList(projectId);
    //console.log("val ", val);
    return val;
  }

  static getProject(projectId: string) {
    let pList = this.getListOfProjects();
    let project = pList.find((x) => x.getId() === projectId) || null;
    return project;
  }

  static addMember(projectId: string, userName: string) {
    const projectList = this.getListOfProjects();
    const project = projectList.find((x) => x.getId() === projectId) || null;
    //console.debug("Project", project);
    if (project) {
      const user = UserList.getUser(userName);
      //console.debug("ADDUser", user);
      if (user) project.addMember(user);
    }
    // console.debug("Project", project);

    localStorage.setItem(key, JSON.stringify({ projectList: projectList }));
  }

  static getMemberList(projectId: string) {
    const project = this.getProject(projectId);
    return project?.members.map((x) => UserList.getUser(x));
  }

  static removeMember(projectId: string, username: string) {
    let user = UserList.getUser(username);
    if (!user) return;
    const projectList = this.getListOfProjects();
    let project = projectList.find((x) => x.getId() === projectId) || null;
    //console.debug("\n\nUSER:\n", user, "\nProject:\n", project);
    if (!project) return;
    project.removeMember(user);
    user.removeProjectFromList(project);
    localStorage.setItem(key, JSON.stringify({ projectList: projectList }));
  }

  static addLanguage(projectId: string, language: string) {
    if (!language || language === "") return;
    const projectList = this.getListOfProjects();
    const project = projectList.find((x) => x.getId() === projectId);
    if (!project) return;
    project.addLanguage(language);
    localStorage.setItem(key, JSON.stringify({ projectList: projectList }));
  }

  static removeLanguage(projectId: string, language: string) {
    if (!language || language === "") return;
    const projectList = this.getListOfProjects();
    const project = projectList.find((x) => x.getId() === projectId);
    if (!project) return;
    project.removeLanguage(language);
    localStorage.setItem(key, JSON.stringify({ projectList: projectList }));
  }

  static updateStateOfIssue(
    projectId: string,
    issueId: string,
    newState: number
  ) {
    IssueList.updateIssueState(projectId, issueId, newState);
  }

  static reset() {
    localStorage.setItem(key, JSON.stringify({ projectList: [] }));
    UserList.reset();
    IssueList.reset();
  }
}
