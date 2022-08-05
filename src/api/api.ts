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
  sendInviteToProject,
} from "../data/UserMessageList";

// delay value to simulate network speed min = (timevalue), max= (2 x timevalue)
const timeValue = 150;

/**
 * Simulates network transfer speed using timeValue
 * @param functionName Name for function call
 * @returns An objet {name:"...", time:[timeValue , 2*timevalue]}
 */
function delay(functionName?: string) {
  let time = timeValue + Math.random() * timeValue;
  return new Promise((res) => {
    setTimeout(() => res({ name: functionName || "", time: time }), time);
  });
}

/**
 * Gets a user from the storage
 * @param username the username
 * @returns the user
 */
export async function GetUser(username: string) {
  let res = await delay("GetUser");
  console.debug(res);

  return UserList.getUser(username) || null;
}

/**
 * Gets a project from the project storage
 * @param pid The project id
 * @returns A project or null
 */
export async function GetProject(pid: string) {
  let res = await delay("GetProject");
  console.debug(res);

  return ProjectList.getProject(pid) || null;
}

/**
 * Gets a list of public projects from storage
 * @returns A list of public projects
 */
export async function GetPublicProjects() {
  let res = await delay();
  console.debug("GetPublicProjects", res);
  let list = ProjectList.getListOfPublicProjects();
  return list;
}

/**
 * Gets the list of projects that user follows
 * @param username The user name
 * @returns An array of projects
 */
export async function GetUserProjectList(username: string) {
  let res = await delay("GetUserProjects");
  console.debug(res);
  let user = UserList.getUser(username) || null;
  if (user) {
    return user.getProjectsArray();
  }
  return null;
}

/**
 * Gets a list of issues for a certain project
 * @param pid The project id
 * @returns An array of issues for a project
 */
export async function GetProjectListOfIssues(pid: string) {
  let res = await delay("GetProjectListOfIssues");

  console.debug(res);
  let val = ProjectList.getIssueListOfProject(pid);
  return val;
}

/**
 * Adds project to be tracked and adds user to the following list
 * @param project Project to be added
 * @param user The user adding the project
 */
export async function AddProjectToList(project: Project, user: User) {
  let res = await delay("AddProjectToList");
  console.debug(res);
  ProjectList.addProjectToList(project, user);
}

/**
 * Adds an issue to the project
 * @param projectId The projects id
 * @param issueTitle The title for the issue
 * @param issueDescription The description for the issue
 */
export async function AddIssueToProject(
  projectId: string,
  issueTitle: string,
  issueDescription: string
) {
  let res = await delay("AddIssueToProject");
  console.debug(res);
  ProjectList.addIssueToProject(projectId, issueTitle, issueDescription);
}

/**
 * Adds a user to the list of users following a project
 * @param pid the project id
 * @param username The username of the user
 */
export async function AddMemberToProject(pid: string, username: string) {
  let res = await delay("AddMemberToProject");
  console.debug(res);
  ProjectList.addMember(pid, username);
}

/**
 * Adds a project to the list of projects followed by user
 * @param pid The project id
 * @param username the username of the user
 */
export async function AddProjectToMember(pid: string, username: string) {
  let res = await delay("AddProjectToMember");
  console.debug(res);
  let project = ProjectList.getProject(pid);
  if (project) UserList.addProjectToUser(project, username);
}

/**
 * Adds user to list of followers of project
 * Adds project to list of followed projects of the user
 * Combines AddProjectToMember and AddMemberToProject
 * @param pid The project id
 * @param username The username of the user
 */
export async function CoupleProjectAndMember(pid: string, username: string) {
  let res = await delay("CoupleProjectAndMember");
  console.debug(res);
  await AddMemberToProject(pid, username);
  await AddProjectToMember(pid, username);
}

/**
 * Removes a user from list of followers of a project
 * @param pid The project id
 * @param username The user's username
 */
export async function RemoveMemberFromProject(pid: string, username: string) {
  let res = await delay("RemoveMemberFromProject");
  console.debug(res);
  ProjectList.removeMember(pid, username);
}

/**
 * Remove a project from the list of a users followed projects
 * @param pid The projects id
 * @param username The user's username
 */
export async function RemoveProjectFromMember(pid: string, username: string) {
  let res = await delay("RemoveProjectFromMember");
  console.debug(res);
  let project = ProjectList.getProject(pid);
  if (project) UserList.removeUserFromProject(username, project);
}

/**
 * Add project to list of user's followed projects
 * Add user to list of followers of a project
 * combines RemoveMemberFromProject and RemoveProjectFromMember
 * @param pid The projects id
 * @param username The user's username
 */
export async function DecoupleProjectAndMember(pid: string, username: string) {
  let res = await delay("DecoupleProjectAndMember");
  console.debug(res);
  await RemoveMemberFromProject(pid, username);
  await RemoveProjectFromMember(pid, username);
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

export async function SendInviteToUser(
  toUser: string,
  fromUser: string,
  project: Project
) {
  let res = await delay("SendInviteToUser");
  console.debug(res);
  sendInviteToProject(toUser, fromUser, project);
}

export async function GiveMessageToUser(
  toUser: string,
  fromUser: string,
  sender: string,
  title: string,
  body: string,
  type: number
) {
  let res = await delay("GiveMessageToUser");
  console.debug(res);
  GMTU(toUser, fromUser, sender, title, body, type);
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

/**
 * Check if a User A follows a User B
 * @param usernameA The user name of the user we are checking if follows usernameB
 * @param usernameB The user name we check if usernameA follows
 * @returns {Promise<boolean>} True if UserA follows UserB, else false
 */
export async function UserFollowsUser(
  usernameA: string,
  usernameB: string
): Promise<boolean> {
  let res = await delay("UserFollowUser");
  console.debug(res);
  let userA = UserList.getUser(usernameA);
  if (userA) {
    let friendList = userA.getFriendList();
    let follows = friendList.findIndex((x) => x === usernameB);
    return follows > -1;
  }
  return false;
}

export async function AddToUserFollowedUsers(
  usernameA: string,
  usernameB: string
) {
  let res = await delay("AddToUserFollowedUsers");
  console.debug(res);
  let userA = UserList.getUser(usernameA);
  if (userA) {
    UserList.addUserToFriendList(usernameA, usernameB);
  }
}

/**
 * Make userA stop following userB
 * @param usernameA The user that is unfollowing userB
 * @param usernameB The user being unfollowed by userA
 */
export async function RemoveUserFromFollowedUsers(
  usernameA: string,
  usernameB: string
) {
  let res = await delay("RemoveToUserFollowedUsers");
  console.debug(res);
  let userA = UserList.getUser(usernameA);
  if (userA) {
    UserList.removeUserFromFriendList(usernameA, usernameB);
  }
}
