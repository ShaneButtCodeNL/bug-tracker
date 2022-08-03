import { v4 as uuidv4 } from "uuid";
import Project from "./Project";

const key = "userMessageList";
/*
Structure
{
   userMessageList: [
      {
         userName:"username",
         messages:[
            {
               id: ". . ."
               from:". . .",
               type: ". . ."
               title: ". . ."
               body: ". . ."
               status:" . . ."
            },
            {
               id: ". . ."
               from:". . .",
               type: ". . ."
               title: ". . ."
               body: ". . ."
               status:" . . ."
            },
         ]
      },
      {
         userName:"username2",
         messages:[
            {
               id: ". . .",
               from:". . .",
               type: number,
               title: ". . .",
               body: ". . .",
               status:" . . .",
               projectId: ". . ."
               date: ". . ."
            },
         ]
      }
   ]
} 
 */
enum Days {
  Sun = 0,
  Mon,
  Tue,
  Wed,
  Thurs,
  Fri,
  Sat,
}
enum Months {
  Jan = 0,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
  Jul,
  Aug,
  Sep,
  Oct,
  Nov,
  Dec,
}

function makeEntryToken(input: any) {
  localStorage.setItem(key, JSON.stringify(input));
}

function makeMessage(
  type: number,
  title: string,
  body: string,
  fromUser: string,
  sender: string
) {
  const date = new Date(Date.now());
  return {
    id: uuidv4(),
    type: type,
    from: fromUser,
    sender: sender,
    title: title,
    body: body,
    status: Statuses.UnRead,
    projectId: "",
    projectTitle: "",
    date: `${Days[date.getDay()]} ${date.getDate()}-${
      Months[date.getMonth()]
    }-${date.getFullYear()}`,
  };
}

function getAll() {
  let mainList = localStorage.getItem(key);
  //Init if not init
  if (!mainList) {
    makeEntryToken([]);
    return [];
  }
  let list = JSON.parse(mainList);
  return list;
}

/**
 *
 * @param userName Username of user
 * @returns {any} { userName:". . .", messages [ ... , ...]}
 */
function getUserMessagesObject(userName: string): any {
  let list = getAll();
  let obj = list.find((x: any) => x.userName === userName);
  //If user found return
  if (obj) return obj;
  //Make user/message obj,add to storage and return it
  let res = { userName: userName, messages: [] };
  list.push(res);
  makeEntryToken(list);
  return res;
}

//TODO Notification
function addMessageToUser(userName: string, message: any) {
  let mainList = getAll();
  let user = mainList.find((x: any) => x.userName === userName);
  if (user) {
    user.messages.push(message);
    makeEntryToken(mainList);
    return;
  }
  mainList.add({ userName: userName, messages: [message] });
  makeEntryToken(mainList);
}

export const Statuses = { Read: "Read", UnRead: "UnRead" };

export function GetUserMessages(userName: string): [] {
  let userMessages = getUserMessagesObject(userName);
  if (userMessages) return userMessages.messages;
  return [];
}

export function GiveMessageToUser(
  toUserName: string,
  fromUserName: string,
  sender: string,
  messageTitle: string,
  messageBody: string,
  messageType: number
) {
  let message = makeMessage(
    messageType,
    messageTitle,
    messageBody,
    fromUserName,
    sender
  );
  addMessageToUser(toUserName, message);
}

export function sendInviteToProject(
  toUser: string,
  fromUser: string,
  project: Project
) {
  let message = makeMessage(
    2,
    `Invite from ${fromUser} to join "${project.getName()}".`,
    `${fromUser} would like you to join them in the project "${project.getName()}". Click the button below to add this project to your list of tracked projects.\nHave a great day!\n\nThe team at Bug-Trax `,
    "SYSTEM",
    fromUser
  );
  message.projectId = project.getId();
  message.projectTitle = project.getName();
  addMessageToUser(toUser, message);
}

export function ChangeStatusOfMessage(
  userName: string,
  msgId: string,
  newStatus: string
) {
  let list = getAll();
  let user = list.find((x: any) => x.userName === userName);
  if (user) {
    let message = user.messages.find((x: any) => x.id === msgId);

    if (message) {
      message.status = newStatus;
      makeEntryToken(list);
    }
  }
}

export function DeleteMessage(userName: string, msgId: string) {
  let list = getAll();
  let user = list.find((x: any) => x.userName === userName);
  if (user) {
    for (let i = 0; i < user.messages.length; i++) {
      if (user.messages[i].id === msgId) {
        user.messages.splice(i, 1);
        makeEntryToken(list);
        return;
      }
    }
  }
}
