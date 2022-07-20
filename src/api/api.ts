import UserList from "../data/UserList";
import ProjectList from "../data/ProjectList";
import Project from "../data/Project";
import Issue from "../data/Issue";

export function GetUser(username: string) {
  return UserList.getUser(username) || null;
}

export function GetProject(pid: number) {
  return ProjectList.getProject(pid) || null;
}

export function GetUserProjectList(username: string) {
  let user = GetUser(username);
  if (user) {
    return user.getProjectsArray();
  }
  return null;
}

export function GetProjectListOfIssues(pid: number) {
  ProjectList.getIssueList(pid);
}

export function AddProjectToList(project: Project) {
  ProjectList.addProjectToList(project);
}

export function AddIssueToProject(
  projectId: number,
  issueTitle: string,
  issueDescription: string
) {
  ProjectList.addIssueToProject(projectId, issueTitle, issueDescription);
}

export function AddMemberToProject(pid: number, username: string) {
  ProjectList.addMember(pid, username);
}

export function AddLanguageToProject(pid: number, lang: string) {
  ProjectList.addLanguage(pid, lang);
}

export function makeUser(username: string, password: string) {
  UserList.makeUser(username, password);
}

export function Login(username: string | null, password: string | null) {
  console.log(username, password);
  if (!username || !password) return;
  UserList.makeUser(username, password);
  let user = GetUser(username);
  if (user && user.getPassword() === password) {
    return user;
  }
  return null;
}

export function SetIssueToClosed(pid: number, iid: number) {
  ProjectList.updateStateOfIssue(pid, iid, Issue.Closed);
}

export function SetIssueToAwaitingApproval(pid: number, iid: number) {
  ProjectList.updateStateOfIssue(pid, iid, Issue.AwaitingApproval);
}

export function SetIssueToOpen(pid: number, iid: number) {
  ProjectList.updateStateOfIssue(pid, iid, Issue.Open);
}

export function SetIssueToTesting(pid: number, iid: number) {
  ProjectList.updateStateOfIssue(pid, iid, Issue.Testing);
}
