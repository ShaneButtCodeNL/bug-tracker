import Project from "./Project";
import ProjectList from "./ProjectList";
import User from "./User";
import UserList from "./UserList";
const testProject = new Project("test1", ["Java"]);
UserList.makeUser("testUser", "testPass");
const testUser = UserList.getUser("testUser") || new User("failllll", "Pass");
test("Defaults", () => {
  expect(ProjectList.getListOfProjects()).toEqual([]);
});
//const user = new User("uName", "uPass");
UserList.makeUser(testUser.name, testUser.getPassword());
//const project = new Project("pName", ["Java"]);
test("Add project to list,get project", () => {
  ProjectList.addProjectToList(testProject, null);
  expect(ProjectList.getListOfProjects()).toHaveLength(1);

  expect(ProjectList.getProject(testProject.getId())).toStrictEqual(
    testProject
  );
});
test("Project Modifiers", () => {
  ProjectList.addMember(testProject.getId(), testUser.name);
  // console.debug("user", testUser);
  // console.debug("1", ProjectList.getProject(testProject.getId()));
  // console.debug("2", ProjectList.getProject(testProject.getId()));
  let memList = ProjectList.getMemberList(testProject.getId());
  console.debug("MEMLIST:", memList);
  //console.debug("TESTUSER:", testUser);
  expect(memList ? memList : []).toHaveLength(1);
  expect(memList ? memList[0]?.getName() : "fail").toBe(testUser.getName());
  expect(memList ? memList[0]?.getPassword() : "fail").toBe(
    testUser.getPassword()
  );
  ProjectList.removeMember(testProject.getId(), testUser.name);
  memList = ProjectList.getMemberList(testProject.getId());
  console.debug("MEMLIST:", memList);

  expect(memList ? memList : []).toHaveLength(0);
  expect(memList && memList.length > 0 ? memList[0]?.getName() : "pass").toBe(
    "pass"
  );
  expect(
    memList && memList.length > 0 ? memList[0]?.getPassword() : "pass"
  ).toBe("pass");

  ProjectList.addLanguage(testProject.getId(), "SCALA");
  let langList = ProjectList.getProject(testProject.getId())?.getLanguages();
  expect(langList ? langList : []).toHaveLength(2);
  expect(langList ? langList : []).toEqual(["Java", "SCALA"]);
  ProjectList.removeLanguage(testProject.getId(), "SCALA");
  langList = ProjectList.getProject(testProject.getId())?.getLanguages();
  expect(langList ? langList : []).toHaveLength(1);
  expect(langList ? langList : []).toEqual(["Java"]);
});
