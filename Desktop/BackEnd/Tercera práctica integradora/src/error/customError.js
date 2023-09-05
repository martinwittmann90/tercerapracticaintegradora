export default class CustomError extends Error {
  constructor({ name, cause, message, code }) {
    super(`${name}: ${message}`);
    this.cause = cause;
    this.name = name;
    this.code = code;
  }
}
