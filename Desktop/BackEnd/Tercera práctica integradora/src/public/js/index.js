form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      const responseData = await response.json();
      console.log('Producto creado:', responseData);
      window.location.href = '/realtimeproducts';
    } else {
      console.error('Error al crear el producto:', response.statusText);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
});
async function deleteProduct(productId) {
  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      window.location.href = '/realtimeproducts';
    } else {
      const responseData = await response.json();
      console.error('Error deleting product:', responseData.msg);
    }
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}

/*LOGICA SOCKET */
/* const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || JSON.parse(sessionStorage.getItem('loggedInUser'));
const socket = io();
socket.on('connect', () => {
  socket.emit('user_connected', loggedInUser);
});
socket.on('user_connected', (user) => {
  console.log('Usuario conectado:', user);
}); */
/* let newProduct = {};
const formProducts = document.getElementById('formProducts');
formProducts.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = formProducts.elements.title.value;
  const description = formProducts.elements.description.value;
  const price = formProducts.elements.price.value;
  const thumbnailUrl = formProducts.elements.thumbnailUrl.value;
  const thumbnailFile = formProducts.elements.thumbnailFile.files[0];
  const code = formProducts.elements.code.value;
  const stock = formProducts.elements.stock.value;
  const category = formProducts.elements.category.value;
  const status = formProducts.elements.status.value;
  const thumbnail = thumbnailUrl || thumbnailFile;
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || JSON.parse(sessionStorage.getItem('loggedInUser'));
  newProductIncorporate = {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
    status,
    owner: loggedInUser.email,
  };
  socket.emit('product_front_to_back', newProductIncorporate);
  formProducts.reset();
}); */

/* document.querySelectorAll('.delete-button').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const id = button.dataset.productId;
    socket.emit('deleteProduct_front_to_back', id);
  });
}); */

/* socket.on('products_back_to_front', (newProduct) => {
  const cardContainer = document.getElementById('cardContainer');
  let newCard = document.createElement('div');
  newCard.id = newProduct.id;
  newCard.style.display = 'inline-block';
  newCard.style.margin = '10px';
  newCard.style.border = '5px solid black';

  newCard.innerHTML = `
    <h2>${newProduct.title}</h2>
    <p>${newProduct.description}</p>
    <p>Precio: ${newProduct.price}</p>
    <p>Code: ${newProduct.code}</p>
    <p>Stock: ${newProduct.stock}</p>
    <p>Category: ${newProduct.category}</p>
    <img src="${newProduct.thumbnail}">
    `;
  cardContainer.appendChild(newCard);
  window.location.reload();
}); */
