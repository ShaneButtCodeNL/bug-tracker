import Issue from "./Issue";

const issue = new Issue("Test Title", "Test Description", 5);
test("Title is correct?", () => {
  expect(issue.getTitle()).toBe("Test Title");
  expect(issue.title).toBe("Test Title");
});
test("Description is correct?", () => {
  expect(issue.getDescription()).toBe("Test Description");
  expect(issue.description).toBe("Test Description");
});
test("Id is correct?", () => {
  expect(issue.getId()).toBe(5);
});
test("Test state functions.", () => {
  expect(issue.getState()).toBe("Open");
  expect(issue.getStateValue()).toBe(Issue.Open);
  issue.setState(Issue.Closed);
  expect(issue.getState()).toBe("Closed");
  expect(issue.getStateValue()).toBe(Issue.Closed);
  issue.setState(10);
  expect(issue.getState()).toBe("Closed");
  expect(issue.getStateValue()).toBe(Issue.Closed);
});
