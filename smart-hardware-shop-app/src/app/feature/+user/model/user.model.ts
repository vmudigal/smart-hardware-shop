export class Name {
  firstName: string;
  lastName: string;

  constructor(name?: Name) {
    if (!name) {
      this.firstName = '';
      this.lastName = '';
    } else {
      this.firstName = name.firstName;
      this.lastName = name.lastName;
    }
  }
}

export class User {
  id: number;
  name: Name;
  role: string;

  constructor(user?: User) {
    if (!user) {
      this.id = 0;
      this.name = new Name();
      this.role = 'CUSTOMER';
    } else {
      this.id = user.id || 0;
      this.name = user.name || new Name();
      this.role = user.role || 'CUSTOMER';
    }
  }
}
