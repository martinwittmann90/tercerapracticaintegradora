import EErrors from '../error/enum.js';
import CustomError from '../error/customError.js';

export default (err, req, res, next) => {
  switch (err?.code) {
    case EErrors.PRODUCT_ALREADY_EXISTS:
      // Aquí puedes manejar el error de producto duplicado de manera específica
      res.status(400).json({ error: 'Product already exists', cause: err.cause });
      break;
    case EErrors.INVALID_TYPES_ERROR:
      // Aquí puedes manejar el error de tipos no válidos de manera específica
      res.status(400).json({ error: 'Invalid types', cause: err.cause });
      break;
    case EErrors.INVALID_REQUEST:
      // Aquí puedes manejar el error de solicitud no válida de manera específica
      res.status(400).json({ error: 'Invalid request', cause: err.cause });
      break;
    case EErrors.ADD_PRODUCT_ERR:
      // Aquí puedes manejar otros errores de manera específica
      res.status(500).json({ error: 'Internal server error', cause: err.cause });
      break;
    default:
      // En caso de otros errores no manejados específicamente, puedes responder con un error genérico
      res.status(500).json({ error: 'Internal server error', cause: err.cause });
      break;
  }
};
