import Project from "./Project";
import ProjectList from "./ProjectList";
import User from "./User";
import UserList from "./UserList";
test("Defaults", () => {
  expect(ProjectList.getListOfProjects()).toEqual([]);
});
const user = new User("uName", 1, "uPass");
UserList.makeUser(user.name, user.getPassword());
const project = new Project("pName", 66, ["Java"]);
test("Add project to list,get project", () => {
  ProjectList.addProjectToList(project);
  expect(ProjectList.getListOfProjects()).toHaveLength(1);
  expect(ProjectList.getProject(project.getId())).toBe(project);
});
test("Project Modifiers", () => {
  ProjectList.addMember(project.getId(), user.name);
  let memList = ProjectList.getProject(project.getId())?.getMembers();
  expect(memList ? memList : []).toHaveLength(1);
  expect(memList ? memList[0].getName() : "fail").toBe(user.getName());
  expect(memList ? memList[0].getPassword() : "fail").toBe(user.getPassword());
  ProjectList.removeMember(project.getId(), user.name);
  memList = ProjectList.getProject(project.getId())?.getMembers();
  expect(memList ? memList : []).toHaveLength(0);
  expect(memList && memList.length > 0 ? memList[0].getName() : "pass").toBe(
    "pass"
  );
  expect(
    memList && memList.length > 0 ? memList[0].getPassword() : "pass"
  ).toBe("pass");

  ProjectList.addLanguage(project.getId(), "SCALA");
  let langList = ProjectList.getProject(project.getId())?.getLanguages();
  expect(langList ? langList : []).toHaveLength(2);
  expect(langList ? langList : []).toEqual(["Java", "SCALA"]);
  ProjectList.removeLanguage(project.getId(), "SCALA");
  langList = ProjectList.getProject(project.getId())?.getLanguages();
  expect(langList ? langList : []).toHaveLength(1);
  expect(langList ? langList : []).toEqual(["Java"]);
});
