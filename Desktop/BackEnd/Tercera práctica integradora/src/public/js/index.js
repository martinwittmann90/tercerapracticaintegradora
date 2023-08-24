const socket = io();
let newProduct = {};
const formProducts = document.getElementById('formProducts');
formProducts.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = formProducts.elements.title.value;
  const description = formProducts.elements.description.value;
  const price = formProducts.elements.price.value;
  const thumbnail = formProducts.elements.thumbnail.value;
  const code = formProducts.elements.code.value;
  const stock = formProducts.elements.stock.value;
  const category = formProducts.elements.category.value;
  const status = formProducts.elements.status.value;

  newProductIncorporate = {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
    status,
  };
  socket.emit('product_front_to_back', newProductIncorporate);
  formProducts.reset();
});

document.querySelectorAll('.delete-button').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const id = button.dataset.productId;
    socket.emit('deleteProduct_front_to_back', id);
  });
});

socket.on('products_back_to_front', (newProduct) => {
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
});
