import Issue from "./Issue";
import IssueList from "./IssueList";
const pid = 5;
test("Defaults", () => {
  expect(IssueList.getIssueProjectList()).toEqual([]);
});
test("Adding issue", () => {
  IssueList.addIssueToProjectIssues(pid, "firstIssue", "firstDesc");
  expect(IssueList.getIssueList(pid)).toHaveLength(1);
  IssueList.addIssueToProjectIssues(pid, "secIssue", "secDesc");
  expect(IssueList.getIssueList(pid)).toHaveLength(2);
  IssueList.addIssueToProjectIssues(6, "firstIssue", "firstDesc");
  expect(IssueList.getIssueList(pid)).toHaveLength(2);
  expect(IssueList.getIssueList(6)).toHaveLength(1);
  expect(IssueList.getIssueProjectList()).toHaveLength(2);
});
test("Update state", () => {
  let issue = IssueList.getIssueList(pid);
  if (issue) IssueList.updateIssueState(pid, issue[0].getId(), Issue.Testing);
  expect(IssueList.getIssueList(pid)).toBeTruthy();
  issue = IssueList.getIssueList(pid);
  expect(issue ? issue[0].getState() : "fail").toBe("Testing");

  issue = IssueList.getIssueList(pid);
  if (issue) IssueList.updateIssueState(pid, issue[0].getId(), Issue.Closed);
  expect(IssueList.getIssueList(pid)).toBeTruthy();
  issue = IssueList.getIssueList(pid);
  expect(issue ? issue[0].getState() : "fail").toBe("Closed");

  issue = IssueList.getIssueList(pid);
  if (issue) IssueList.updateIssueState(pid, issue[0].getId(), 10);
  expect(IssueList.getIssueList(pid)).toBeTruthy();
  issue = IssueList.getIssueList(pid);
  expect(issue ? issue[0].getState() : "fail").toBe("Closed");
});
IssueList.reset();
