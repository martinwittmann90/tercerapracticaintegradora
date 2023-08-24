class CustomErrorMsg {
  generateProductErrorInfo = (product) => {
    let errorCause = `One or more product properties are not being received correctly:
      List of properties:
      * title: must be string. Received       : ${product.title}
      * description: must be string. Received : ${product.description}
      * price: must be number. Received       : ${product.price}
      * stock: must be number. Received       : ${product.stock}
      * code: must be string. Received        : ${product.code.toString()}
      * category: must be string. Received    : ${product.category}`;
    if (product.thumbnails !== undefined) {
      errorCause += `\n* thumbnails: must be string. Received  : ${product.thumbnails}`;
    }
    return {
      cause: errorCause,
    };
  };

  generateProductoErrorAlredyExists = (product) => {
    return {
      cause: `The product already exists.
        Received:
        * Product Name: ${product.title}
        * Product Code: ${product.code}`,
    };
  };
}

export const customErrorMsg = new CustomErrorMsg();
