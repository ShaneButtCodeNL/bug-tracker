import Project from "./Project";
import User from "./User";
const testName = "Test Name";
const testId = 5;
const testLanguages = ["HTML", "CSS", "JavaScript", "Python"];
const project = new Project(testName, testId, testLanguages);
test("Check getters and defaults.", () => {
  expect(project.getId()).toBe(testId);
  expect(project.getName()).toBe(testName);
  expect(project.getMembers()).toEqual([]);
  expect(project.getLanguages()).toEqual([...testLanguages]);
});
test("toJSON method", () => {
  expect(project.toJSON()).toEqual({
    id: testId,
    name: testName,
    languages: testLanguages,
    members: [],
  });
});
test("Adding/Removing Members.", () => {
  project.addMember(new User("user1", 1, "pass1"));
  project.addMember(new User("user2", 2, "pass2"));
  expect(project.getMembers().length).toBe(2);
  project.removeMember(new User("user1", 1, "pass1"));
  expect(project.getMembers().length).toBe(1);
  expect(project.getMembers()).toEqual([new User("user2", 2, "pass2")]);
  project.removeMember(new User("user1", 1, "pass1"));
  expect(project.getMembers().length).toBe(1);
  expect(project.getMembers()).toEqual([new User("user2", 2, "pass2")]);
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
