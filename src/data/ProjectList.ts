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
  /**
   * Gets the person that owns a project
   * @param projectId The project id
   * @returns A user that made the project or null
   */
  static getOwner(projectId: string) {
    let project = this.getProject(projectId);
    if (project !== null) return project.getMembers()[0];
    return null;
  }

  /**
   * Gets list of every project stored
   * @returns {Project[]} an array of projects
   */
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

  /**
   * Gets a list of public projects
   * @returns A list of projects set to public
   */
  static getListOfPublicProjects() {
    let list = this.getListOfProjects();
    return list.filter((x) => x.isPublic);
  }

  /**
   * Adds a project to the list of tracked projects
   * @param project The project
   * @param user The user
   * @returns
   */
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
    }
    let pList = this.getListOfProjects();
    pList.push(project);
    //Add to list
    localStorage.setItem(key, JSON.stringify({ projectList: pList }));
  }

  /**
   * Adds a issue to the list of issues of the project
   * @param projectId The id of the project
   * @param issueTitle The title of the the issue
   * @param issueDescription The description of the issue
   */
  static addIssueToProject(
    projectId: string,
    issueTitle: string,
    issueDescription: string
  ) {
    IssueList.addIssueToProjectIssues(issueTitle, issueDescription, projectId);
  }

  /**
   * Gets the list of issues of a project
   * @param projectId The id of the project
   * @returns An array of issues
   */
  static getIssueListOfProject(projectId: string) {
    let val = IssueList.getIssueList(projectId);
    return val;
  }

  /**
   * Gets a project from the list of tracked projects
   * @param projectId The id of the project
   * @returns The project
   */
  static getProject(projectId: string) {
    let pList = this.getListOfProjects();
    let project = pList.find((x) => x.getId() === projectId) || null;
    return project;
  }

  /**
   * Adds a user to the list of users following a project
   * @param projectId The id of the project
   * @param userName The username of the user
   */
  static addMember(projectId: string, userName: string) {
    const projectList = this.getListOfProjects();
    const project = projectList.find((x) => x.getId() === projectId) || null;
    if (project) {
      const user = UserList.getUser(userName);
      if (user) project.addMember(user);
    }
    localStorage.setItem(key, JSON.stringify({ projectList: projectList }));
  }

  /**
   * Gets a list of users that follow a project
   * @param projectId The id of a project
   * @returns An array of users
   */
  static getMemberList(projectId: string) {
    const project = this.getProject(projectId);
    return project?.members.map((x) => UserList.getUser(x));
  }

  /**
   * Removes a user from the list of followers and removes project from user
   * @param projectId The id of a project
   * @param username The username of an user
   * @returns
   */
  static removeMember(projectId: string, username: string) {
    let user = UserList.getUser(username);
    if (!user) return;
    const projectList = this.getListOfProjects();
    let project = projectList.find((x) => x.getId() === projectId) || null;
    if (!project) return;
    project.removeMember(user);
    user.removeProjectFromList(project);
    localStorage.setItem(key, JSON.stringify({ projectList: projectList }));
  }

  /**
   * Add a language to a project
   * @param projectId The projects id
   * @param language The language to be added to the project
   * @returns
   */
  static addLanguage(projectId: string, language: string) {
    if (!language || language === "") return;
    const projectList = this.getListOfProjects();
    const project = projectList.find((x) => x.getId() === projectId);
    if (!project) return;
    project.addLanguage(language);
    localStorage.setItem(key, JSON.stringify({ projectList: projectList }));
  }

  /**
   * Removes a language from the list of languages of a project
   * @param projectId The id of the project
   * @param language the language to be removed
   * @returns
   */
  static removeLanguage(projectId: string, language: string) {
    if (!language || language === "") return;
    const projectList = this.getListOfProjects();
    const project = projectList.find((x) => x.getId() === projectId);
    if (!project) return;
    project.removeLanguage(language);
    localStorage.setItem(key, JSON.stringify({ projectList: projectList }));
  }

  /**
   * Updates the issue state of an issue
   * @param projectId The projects id
   * @param issueId The issues id
   * @param newState The new state of the issue
   */
  static updateStateOfIssue(
    projectId: string,
    issueId: string,
    newState: number
  ) {
    IssueList.updateIssueState(projectId, issueId, newState);
  }

  /**
   * Resets the local storage for project list userlist and issue list
   */
  static reset() {
    localStorage.setItem(key, JSON.stringify({ projectList: [] }));
    UserList.reset();
    IssueList.reset();
  }
}
