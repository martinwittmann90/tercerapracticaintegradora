let locateCartById = document.getElementsByClassName('cartInfo')[0];
let userCart = document.getElementsByClassName('infoCart')[0];
let productInfo = document.getElementsByClassName('infoProduct')[0];
let API_URL;
if (window.location.hostname === 'localhost' && window.location.port === '3000') {
  API_URL = 'http://localhost:3000/api';
} else {
  API_URL = 'http://localhost:8080/api';
}
let API_URL_FORDELETE;
if (window.location.hostname === 'localhost' && window.location.port === '3000') {
  API_URL_FORDELETE = 'http://localhost:3000/api';
} else {
  API_URL_FORDELETE = 'http://localhost:8080/api';
}

/*------------------------ADD PRODUCTS TO CART---------------------*/
function putIntoCart(_id) {
  const cartIdValue = locateCartById?.getAttribute('id');
  if (cartIdValue === undefined) {
    window.location.href = '/api/sessions/current';
  }
  const url = API_URL + '/carts/' + cartIdValue + '/product/' + _id;
  const data = {};
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((res) => {
      alert('Product add to cart');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert(JSON.stringify(error));
    });
}
/*------------------------REMOVE PRODUCTS FROM CART---------------------*/
function removeProductFromCart(_id) {
  const userCartRemove = userCart?.getAttribute('id');
  const productInfoRemove = productInfo?.getAttribute('id');
  const url = API_URL + '/carts/delete/' + userCartRemove + '/product/' + productInfoRemove;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  fetch(url, options)
    .then((response) => response.json())
    .then((res) => {
      alert('Product removed from cart');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert(JSON.stringify(error));
    });
  window.location.href = window.location.href;
}

/*------------------------EMPTY CART---------------------*/
function clearCart() {
  const userCartEmpty = userCart?.getAttribute('id');
  const url = API_URL_FORDELETE + '/carts/empty/' + userCartEmpty;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  fetch(url, options)
    .then((response) => response.json())
    .then((res) => {
      alert('Cart cleared successfully');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert(JSON.stringify(error));
    });
  window.location.href = window.location.href;
}
