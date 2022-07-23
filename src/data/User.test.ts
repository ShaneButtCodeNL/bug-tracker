import Project from "./Project";
import User from "./User";

const testName = "TestUser",
  testPassword = "TestPass";
const user = new User(testName, testPassword);

test("Getters and defaults.", () => {
  expect(user.getName()).toBe(testName);
  expect(user.getPassword()).toBe(testPassword);
  expect(user.getProjectsArray()).toEqual([]);
});

test("Add/Remove projects", () => {
  const p = new Project("a", ["a", "b"]);
  user.addProjectToList(p);
  expect(user.getProjectsArray()).toHaveLength(1);
  user.removeProjectFromList(p);
  expect(user.getProjectsArray()).toHaveLength(0);
});
