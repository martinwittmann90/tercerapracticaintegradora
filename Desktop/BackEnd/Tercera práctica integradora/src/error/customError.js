export default class CustomError {
  static createError({ name, cause, message, code }) {
    const error = new Error(`${name}: ${message}`);
    error.cause = cause;
    error.name = name;
    error.code = code;
    throw error;
  }
}
