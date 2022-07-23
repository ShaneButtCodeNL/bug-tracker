import Issue from "./Issue";
import IssueList from "./IssueList";
import Project from "./Project";
const testProject = new Project("testname", ["Java", "Prolog"]);
test("Adding issue", () => {
  IssueList.setUpProjectIssueList(testProject.getId());

  IssueList.addIssueToProjectIssues(
    "firstIssue",
    "firstDesc",
    testProject.getId()
  );
  expect(IssueList.getIssueList(testProject.getId())).toHaveLength(1);
  IssueList.addIssueToProjectIssues("secIssue", "secDesc", testProject.getId());
  expect(IssueList.getIssueList(testProject.getId())).toHaveLength(2);
});
test("Update state", () => {
  IssueList.setUpProjectIssueList(testProject.getId());

  let issue = IssueList.getIssueList(testProject.getId());
  if (issue[0])
    IssueList.updateIssueState(
      testProject.getId(),
      issue[0].getId(),
      Issue.Testing
    );

  expect(IssueList.getIssueList(testProject.getId())).toBeTruthy();
  issue = IssueList.getIssueList(testProject.getId());
  expect(issue[0] ? issue[0].getState() : "fail").toBe("Testing");

  issue = IssueList.getIssueList(testProject.getId());
  if (issue[0])
    IssueList.updateIssueState(
      testProject.getId(),
      issue[0].getId(),
      Issue.Closed
    );
  expect(IssueList.getIssueList(testProject.getId())).toBeTruthy();
  issue = IssueList.getIssueList(testProject.getId());
  expect(issue[0] ? issue[0].getState() : "fail").toBe("Closed");

  issue = IssueList.getIssueList(testProject.getId());
  if (issue[0])
    IssueList.updateIssueState(testProject.getId(), issue[0].getId(), 10);
  expect(IssueList.getIssueList(testProject.getId())).toBeTruthy();
  issue = IssueList.getIssueList(testProject.getId());
  expect(issue[0] ? issue[0].getState() : "fail").toBe("Closed");
});
IssueList.reset();
