import { v4 as uuidv4 } from "uuid";

enum States {
  Open = 0,
  Testing,
  AwaitingApproval,
  Closed,
}
export default class Issue {
  static Open: number = States.Open;
  static Testing: number = States.Testing;
  static AwaitingApproval: number = States.AwaitingApproval;
  static Closed: number = States.Closed;
  private id: string;
  title: string;
  description: string;
  issueState: number;

  static makeIssueFromJSON(input: any) {
    if (
      !input ||
      !input.id ||
      !input.title ||
      !input.description ||
      isNaN(input.issueState) ||
      input.issueState < States.Open ||
      input.issueState > States.Closed
    )
      return null;
    let issue = new Issue(input.title, input.description);
    issue.setId(input.id);
    issue.setState(input.issueState);
    return issue;
  }

  constructor(title: string, description: string) {
    this.id = uuidv4();
    this.title = title;
    this.issueState = States.Open;
    this.description = description;
  }

  private setId(newId: string) {
    this.id = newId;
  }

  /**
   * Gets the id of an issue
   * @returns {number} The Id of the issue
   */
  getId(): string {
    return this.id;
  }
  /**
   * Gets the title of an issue
   * @returns {string} The Title of the issue
   */
  getTitle(): string {
    return this.title;
  }

  /**
   * Gets the description of the issue
   * @returns {string} The issue description
   */
  getDescription(): string {
    return this.description;
  }
  /**
   * Gets a numerical value of the state of the issue
   * @returns {number} Numerical value of the issue state
   */
  getStateValue(): number {
    return this.issueState;
  }
  /**
   * Gets the state of the issue
   * @returns {string} The state of the issue
   */
  getState(): string {
    return States[this.issueState];
  }

  setState(newState: number) {
    if (newState >= States.Open && newState <= States.Closed)
      this.issueState = newState;
  }

  getJSON(): object {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      issueState: this.issueState,
    };
  }

  getJSONString(): string {
    return JSON.stringify(this.getJSON());
  }
}
