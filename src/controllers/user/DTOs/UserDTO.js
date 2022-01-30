export default class UserDTO {
  constructor(user) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.address = user.address;
    this.createdBy = user.createdBy;
    this.updatedBy = user.updatedBy;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.subscription = {
      email: user.subscription.email,
      permission: {
        role: user.subscription.permission.role,
        level: user.subscription.permission.level,
      },
    };
  }
}
