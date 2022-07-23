import UserList from "./UserList";

test("Defaults.", () => {
  expect(UserList.getUserList()).toHaveLength(0);
  expect(UserList.getUserList()).toEqual([]);
});

test("Adding 5 users.adding an already used name", () => {
  UserList.makeUser("user1", "pass1");
  UserList.makeUser("user2", "pass2");
  UserList.makeUser("user3", "pass3");
  UserList.makeUser("user4", "pass4");
  UserList.makeUser("user5", "pass5");
  expect(UserList.getUserList()).toHaveLength(5);
  UserList.makeUser("user3", "userFail");
  expect(UserList.getUserList()).toHaveLength(5);
});
UserList.reset();
