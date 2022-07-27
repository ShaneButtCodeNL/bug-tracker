import UserList from "../data/UserList";
import ProjectList from "../data/ProjectList";
import Project from "../data/Project";
import Issue from "../data/Issue";
import User from "../data/User";
import {
  GetUserMessages as GUM,
  GiveMessageToUser as GMTU,
  ChangeStatusOfMessage as CSOM,
  DeleteMessage as DM,
} from "../data/UserMessageList";

const timeValue = 150;

function delay(functionName?: string) {
  let time = timeValue + Math.random() * timeValue;
  return new Promise((res) => {
    setTimeout(() => res({ name: functionName || "", time: time }), time);
  });
}

export async function GetUser(username: string) {
  let res = await delay("GetUser");
  console.debug(res);

  return UserList.getUser(username) || null;
}

export async function GetProject(pid: string) {
  let res = await delay("GetProject");
  console.debug(res);

  return ProjectList.getProject(pid) || null;
}

export async function GetUserProjectList(username: string) {
  let res = await delay("GetUserProjects");
  console.debug(res);
  let user = UserList.getUser(username) || null;
  if (user) {
    return user.getProjectsArray();
  }
  return null;
}

export async function GetProjectListOfIssues(pid: string) {
  let res = await delay("GetProjectListOfIssues");

  console.debug(res);
  let val = ProjectList.getIssueListOfProject(pid);
  return val;
}

export async function AddProjectToList(project: Project, user: User) {
  let res = await delay("AddProjectToList");
  console.debug(res);
  ProjectList.addProjectToList(project, user);
}

export async function AddIssueToProject(
  projectId: string,
  issueTitle: string,
  issueDescription: string
) {
  let res = await delay("AddIssueToProject");
  console.debug(res);
  ProjectList.addIssueToProject(projectId, issueTitle, issueDescription);
}

export async function AddMemberToProject(pid: string, username: string) {
  let res = await delay("AddMemberToProject");
  console.debug(res);
  ProjectList.addMember(pid, username);
}

export async function AddLanguageToProject(pid: string, lang: string) {
  let res = await delay("AddLanguageToProject");
  console.debug(res);

  ProjectList.addLanguage(pid, lang);
}

export async function makeUser(username: string, password: string) {
  let res = await delay("makeUser");
  console.debug(res);

  UserList.makeUser(username, password);
  return UserList.getUser(username);
}

export async function Login(username: string | null, password: string | null) {
  let res = await delay("Login");
  console.debug(res);

  if (!username || !password) return;
  UserList.makeUser(username, password);
  let user = UserList.getUser(username) || null;
  if (user && user.getPassword() === password) {
    return user;
  }
  return null;
}

export async function SetIssueToClosed(pid: string, iid: string) {
  let res = await delay("SetIssueToClosed");
  console.debug(res);
  ProjectList.updateStateOfIssue(pid, iid, Issue.Closed);
}

export async function SetIssueToAwaitingApproval(pid: string, iid: string) {
  let res = await delay("SetIssueToAwaitingApproval");
  console.debug(res);
  //console.log(res);

  ProjectList.updateStateOfIssue(pid, iid, Issue.AwaitingApproval);
}

export async function SetIssueToOpen(pid: string, iid: string) {
  let res = await delay("SetIssueToOpen");
  console.debug(res);
  ProjectList.updateStateOfIssue(pid, iid, Issue.Open);
}

export async function SetIssueToTesting(pid: string, iid: string) {
  let res = await delay("SetIssueToTesting");
  console.debug(res);
  ProjectList.updateStateOfIssue(pid, iid, Issue.Testing);
}
export async function GetUserMessages(userName: string) {
  let res = await delay("GetUserMessages");
  console.debug(res);
  return GUM(userName);
}

export async function GiveMessageToUser(
  toUser: string,
  fromUser: string,
  title: string,
  body: string,
  type: number
) {
  let res = await delay("GiveMessageToUser");
  console.debug(res);
  GMTU(toUser, fromUser, title, body, type);
}

export async function ChangeStatusOfMessage(
  userName: string,
  msgId: string,
  newStatus: string
) {
  let res = await delay("ChangeStatusOfMessage");
  console.debug(res);
  CSOM(userName, msgId, newStatus);
}

export async function ChangeStatusOfMessageList(
  userName: string,
  msgIdList: string[],
  newStatus: string
) {
  msgIdList.forEach((msgId) => {
    CSOM(userName, msgId, newStatus);
  });

  let res = await delay("ChangeStatusOfMessageList");
  console.debug(res);
}

export async function DeleteMessage(userName: string, msgId: string) {
  let res = await delay("DeleteMessage");
  console.debug(res);
  DM(userName, msgId);
}

export async function DeleteListOfMessages(userName: string, msgIds: string[]) {
  msgIds.forEach((msgId) => DM(userName, msgId));

  let res = await delay("DeleteMessageList");
  console.debug(res);
}
