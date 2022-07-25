const key = "userMessageList";
import { v4 as uuidv4 } from "uuid";
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
               type: ". . .",
               title: ". . .",
               body: ". . .",
               status:" . . ."
            },
         ]
      }
   ]
} 
 */

function makeEntryToken(input: any) {
  localStorage.set(key, JSON.stringify({ input }));
}

function makeMessage(
  type: number,
  title: string,
  body: string,
  fromUser: string
) {
  return {
    id: uuidv4(),
    type: type,
    from: fromUser,
    title: title,
    body: body,
    status: Statuses.UnRead,
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
  let res = { username: userName, messages: [] };
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

export function GetUserMessages(userName: string) {
  let userMessages = getUserMessagesObject(userName);
  if (userMessages) return userMessages.messages;
  return [];
}

export function GiveMessageToUser(
  toUserName: string,
  fromUserName: string,
  messageTitle: string,
  messageBody: string,
  messageType: number
) {
  let message = makeMessage(
    messageType,
    fromUserName,
    messageTitle,
    messageBody
  );
  addMessageToUser(toUserName, message);
}

export function ChangeStatusOfMessage(
  userName: string,
  msgId: string,
  newStatus: string
) {
  let list = getAll();
  let user = list.find((x: any) => x.userName === userName);
  if (user) {
    let message = user.find((x: any) => x.id === msgId);
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
    for (let i = 0; i < user.length; i++) {
      if (user[i].id === msgId) {
        user.splice(i, 1);
        makeEntryToken(list);
        return;
      }
    }
  }
}
