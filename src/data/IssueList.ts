import Issue from "./Issue";

export default class IssueList {
  private static idCounter: number = 1;
  private static issueList: [number, Issue[]][] = [];

  static getIssueProjectList() {
    return [...this.issueList];
  }

  /**
   * Adds an empty list of issues to a project
   * @param projectId Id of the project
   */
  static addIssueListToProject(projectId: number) {
    if (!this.issueList.find((x) => x[0] === projectId))
      this.issueList.push([projectId, []]);
  }

  /**
   * Gets the list of issues related to a project
   * @param projectId Id of the project
   * @returns List of issues of a project or null if there are none
   */
  static getIssueList(projectId: number): Issue[] | null {
    let issues = this.issueList.find((x) => x[0] === projectId);
    return issues ? issues[1] : null;
  }

  /**
   * Adds an issue to the list of isuues of a project
   * @param projectId The id of the project
   * @param issueTitle The title of the issue
   * @param issueDescription The description of the issue
   */
  static addIssueToProjectIssues(
    projectId: number,
    issueTitle: string,
    issueDescription: string
  ) {
    let existing = this.issueList.find((x) => x[0] === projectId);
    if (!existing) {
      this.addIssueListToProject(projectId);
      existing = this.issueList.find((x) => x[0] === projectId);
    }
    if (existing)
      existing[1].push(
        new Issue(issueTitle, issueDescription, IssueList.idCounter++)
      );
  }

  /**
   * Updates the state of the issue
   * @param projectId The id of the project
   * @param issueId The id of the isuue
   * @param newState The new state of the issue
   * @returns
   */
  static updateIssueState(
    projectId: number,
    issueId: number,
    newState: number
  ) {
    if (newState < Issue.Open || newState > Issue.Closed) return false;
    let issue = this.getIssueList(projectId);
    if (!issue) return false;
    issue.find((x) => x.getId() === issueId)?.setState(newState);
    return true;
  }

  static reset() {
    IssueList.idCounter = 1;
    this.issueList = [];
  }
}
