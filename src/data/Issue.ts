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
  private id: number;
  title: string;
  description: string;
  issueState: number;

  constructor(title: string, description: string, id: number) {
    this.id = id;
    this.title = title;
    this.issueState = States.Open;
    this.description = description;
  }

  /**
   * Gets the id of an issue
   * @returns {number} The Id of the issue
   */
  getId(): number {
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
}
