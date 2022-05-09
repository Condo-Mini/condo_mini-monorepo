import UserInterface from './UserInterface';

export default class User implements UserInterface {
  name: string;
  lastName: string;
  age: number;

  constructor({ name, lastName, age }: UserInterface) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
  }

  getFullName(): string {
    return `${this.name} ${this.lastName}`;
  }
}
