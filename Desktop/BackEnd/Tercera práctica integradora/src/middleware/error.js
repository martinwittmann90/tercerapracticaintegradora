import  EErros from '../error/enum.js';

export default (err, req, res, next) => {
  switch (err?.code) {
    case EErros.PRODUCT_ALREADY_EXISTS:
        break
    case EErros.INVALID_TYPES_ERROR:
        break;
    case EErros.INVALID_REQUEST:
        break;
    case EErros.ADD_PRODUCT_ERR:
        res.status(500).json({ Error: `${err}` });
        break;
    default:
        res.status(500).json({ Error: `${err}` });
        break;
    }
};