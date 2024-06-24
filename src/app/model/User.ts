export class User {
  // Private fields for user details
  #username: string;
  #password: string;
  #role: string;
  #email: string; 
  #civilstatus: string;
  #gender: string;
  #newsletter: string[];
  #conditions: boolean;

  // Constructor to initialize the user with the provided details.
  constructor(
    username: string,
    password: string,
    role: string,
    email: string, 
    civilstatus: string,
    gender: string,
    newsletter: string[],
    conditions: boolean
  ) {
    this.#username = username;
    this.#password = password; // Note: Storing passwords in plain text is not secure.
    this.#role = role;
    this.#email = email;
    this.#civilstatus = civilstatus;
    this.#gender = gender;
    this.#newsletter = newsletter;
    this.#conditions = conditions;
  }

  // Public getters to allow external read access to the private fields

  // Returns the username of the user
  public get username(): string {
    return this.#username;
  }

  public get password(): string {
  return this.#password;
  }


  // Returns the role of the user
  public get role(): string {
    return this.#role;
  }

  // Returns the email of the user
  public get email(): string {
    return this.#email;
  }

  // Returns the civil status of the user
  public get civilstatus(): string {
    return this.#civilstatus;
  }

  // Returns the gender of the user
  public get gender(): string {
    return this.#gender;
  }

  // Returns the list of newsletters the user is subscribed to
  public get newsletter(): string[] {
    return this.#newsletter;
  }

  // Returns whether the user has accepted the conditions
  public get conditions(): boolean {
    return this.#conditions;
  }

  // Public setter to allow external write access to update the username

  // Sets the username of the user
  public set username(username: string) {
    this.#username = username;
  }

  // Note: It's generally not advisable to have setters for sensitive information like passwords without proper security measures.
}
