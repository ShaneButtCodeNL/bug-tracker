import Project from "./Project";
import User from "./User";
const testName = "Test Name";
const testLanguages = ["HTML", "CSS", "JavaScript", "Python"];
const project = new Project(testName, testLanguages);
const testId = project.getId();

test("Check getters and defaults.", () => {
  expect(project.getName()).toBe(testName);
  expect(project.getMembers()).toEqual([]);
  expect(project.getLanguages()).toEqual([...testLanguages]);
});
test("toJSON method", () => {
  expect(project.getJSON()).toEqual({
    id: testId,
    name: testName,
    languages: testLanguages,
    members: [],
  });
});
test("Adding/Removing Members.", () => {
  let user1 = new User("user1", "pass1");
  let user2 = new User("user2", "pass2");
  project.addMember(user1);
  project.addMember(user2);
  expect(project.getMembers().length).toBe(2);
  project.removeMember(user1);
  expect(project.getMembers().length).toBe(1);
  expect(project.getMembers()).toEqual([user2.getName()]);
  project.removeMember(user1);
  expect(project.getMembers().length).toBe(1);
  expect(project.getMembers()).toEqual([user2.getName()]);
});
test("Adding/Removing Languages.", () => {
  project.removeLanguage("Python");
  expect(project.getLanguages()).toEqual(["HTML", "CSS", "JavaScript"]);
  expect(project.getLanguages()).toHaveLength(3);
  project.addLanguage("Java");
  expect(project.getLanguages()).toEqual(["HTML", "CSS", "JavaScript", "Java"]);
  expect(project.getLanguages()).toHaveLength(4);
  project.removeLanguage("Python");
  expect(project.getLanguages()).toEqual(["HTML", "CSS", "JavaScript", "Java"]);
  expect(project.getLanguages()).toHaveLength(4);
});
