import Issue from "./Issue";
const key = "issueList";
/**
 * Stored as . . .
 * {
 *  issueList:{
 *    projectList:[
 *      { projectId : pid1, issueList : issue[] },
 *      { projectId : pid2, issueList : issue[] }
 *    ]
 *   }
 * }
 */
export default class IssueList {
  private static getProjectList(): any[] {
    let list = localStorage.getItem(key);
    if (list === null) {
      localStorage.setItem(key, JSON.stringify({ projectList: [] }));
      return [];
    }
    return JSON.parse(list).projectList;
  }
  /**
   * Gets the list of issues related to a project
   * @param projectId Id of the project
   * @returns List of issues of a project or null if there are none
   */
  static getIssueList(projectId: string): (Issue | null)[] {
    let projectList = this.getProjectList();
    let pair = projectList.find((x) => x.projectId === projectId);
    if (!pair) return [null];
    let issueList = pair.issueList;
    if (issueList) {
      let res = issueList
        .map((x: any) => Issue.makeIssueFromJSON(x))
        .filter((x: null) => x !== null);
      return res;
    }
    projectList.push({ projectId: projectId, issueList: [] });
    localStorage.setItem(key, JSON.stringify({ projectList: projectList }));
    return [];
  }

  static setUpProjectIssueList(pid: string) {
    let pList = this.getProjectList();
    let exists = pList.find((x) => x.projectId === pid);
    if (exists) {
      return;
    }
    pList.push({ projectId: pid, issueList: [] });
    localStorage.setItem(key, JSON.stringify({ projectList: pList }));
  }

  /**
   * Adds an issue to the list of isuues of a project
   * @param projectId The id of the project
   * @param issueTitle The title of the issue
   * @param issueDescription The description of the issue
   */
  static addIssueToProjectIssues(
    issueTitle: string,
    issueDescription: string,
    projectId: string
  ) {
    let issue = new Issue(issueTitle, issueDescription);
    let projectList = this.getProjectList();

    let index = projectList.findIndex((x) => x.projectId === projectId);
    if (index === -1) return;
    let issueList = projectList[index].issueList;
    issueList.push(issue);

    localStorage.setItem(key, JSON.stringify({ projectList: projectList }));
  }

  /**
   * Updates the state of the issue
   * @param projectId The id of the project
   * @param issueId The id of the issue
   * @param newState The new state of the issue
   * @returns
   */
  //TODO fix
  static updateIssueState(
    projectId: string,
    issueId: string,
    newState: number
  ) {
    if (newState < Issue.Open || newState > Issue.Closed) return false;
    let projectList = this.getProjectList().map((x) => {
      return {
        projectId: x.projectId,
        issueList: x.issueList.map((z: any) => Issue.makeIssueFromJSON(z)),
      };
    });
    let pair = projectList.find((x) => x.projectId === projectId);
    if (!pair) return [null];
    let issueList: Issue[] = pair.issueList.filter((x: any) => x !== null);
    let issue: Issue | null =
      issueList.find(
        (x: any) => Issue.makeIssueFromJSON(x)?.getId() === issueId
      ) || null;

    if (issue !== null) issue.setState(newState);
    localStorage.setItem(key, JSON.stringify({ projectList: projectList }));

    return true;
  }

  static reset() {
    localStorage.setItem(key, JSON.stringify({ projectList: [] }));
  }
}
