export default class AddressDTO {
  constructor(address) {
    this.city = address.city;
    this.state = address.state;
    this.notes = address.notes;
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
