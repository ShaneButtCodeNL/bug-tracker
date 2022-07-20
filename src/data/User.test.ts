import Project from "./Project";
import User from "./User";

const testName = "TestUser",
  testId = 5,
  testPassword = "TestPass";
const user = new User(testName, testId, testPassword);

test("Getters and defaults.", () => {
  expect(user.getId()).toBe(testId);
  expect(user.getName()).toBe(testName);
  expect(user.getPassword()).toBe(testPassword);
  expect(user.getProjectsArray()).toEqual([]);
});

test("Add/Remove projects", () => {
  const p = new Project("a", 9, ["a", "b"]);
  user.addProjectToList(p);
  expect(user.getProjectsArray()).toHaveLength(1);
  user.removeProjectFromList(p);
  expect(user.getProjectsArray()).toHaveLength(0);
});
