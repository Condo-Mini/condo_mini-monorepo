export default class BaseWorkflow {
  format() {
    throw new Error('Not implemented');
  }

  async validate() {
    throw new Error('Not implemented');
  }

  async process() {
    throw new Error('Not implemented');
  }

  handler = async (rawInput) => {
    const input = this.format(rawInput);

    await this.validate(input);

    return this.process(input);
  };
}
