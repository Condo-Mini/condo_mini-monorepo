export default class AddressDTO {
  constructor(address) {
    this.state = address.state;
    this.city = address.city;
    this.street = address.street;
    this.number = address.number;
    this.details = address.details;
    this.zipCode = address.zipCode;
    this.areaCode = address.areaCode;
    this.createdBy = address.createdBy;
    this.updatedBy = address.updatedBy;
    this.createdAt = address.createdAt;
    this.updatedAt = address.updatedAt;
  }
}
