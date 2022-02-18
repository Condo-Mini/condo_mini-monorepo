import viacepService from '../src/services/external/viacepService';

const zipCode = process.argv[2];

viacepService.workflows
  .getByZipCode({ zipCode })
  .then((data) => console.log(data));
