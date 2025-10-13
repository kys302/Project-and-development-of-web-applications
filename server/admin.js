const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || currentUser.role !== 'admin') {
  alert('Доступ запрещён!');
  window.location.href = '../client/index.html';
}

function getProducts() {
  return JSON.parse(localStorage.getItem('products')) || [];
}

function saveProducts(products) {
  localStorage.setItem('products', JSON.stringify(products));
}

function renderProducts() {
  const products = getProducts();
  const tableBody = document.querySelector('#productTable tbody');

  if (!products.length) {
    tableBody.innerHTML = '<tr><td colspan="5">Товаров нет</td></tr>';
    return;
  }

  tableBody.innerHTML = products.map((p, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><img src="${p.image}" alt="${p.name}" width="50"></td>
      <td>${p.name}</td>
      <td>${p.price} ₽</td>
      <td>
        <button class="edit-btn" data-id="${p.id}">✏️</button>
        <button class="delete-btn" data-id="${p.id}">🗑️</button>
      </td>
    </tr>
  `).join('');

  document.querySelectorAll('.delete-btn').forEach(btn =>
    btn.addEventListener('click', () => deleteProduct(btn.dataset.id))
  );

  document.querySelectorAll('.edit-btn').forEach(btn =>
    btn.addEventListener('click', () => editProduct(btn.dataset.id))
  );
}

function addProduct(e) {
  e.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const price = document.querySelector('#price').value.trim();
  const image = document.querySelector('#image').value.trim();

  if (!name || !price || !image) {
    alert('Заполните все поля!');
    return;
  }

  const products = getProducts();
  const newProduct = {
    id: Date.now(),
    name,
    price: Number(price),
    image
  };

  products.push(newProduct);
  saveProducts(products);
  renderProducts();
  e.target.reset();
}

function deleteProduct(id) {
  let products = getProducts();
  products = products.filter(p => String(p.id) !== String(id));
  saveProducts(products);
  renderProducts();
}

function editProduct(id) {
  const products = getProducts();
  const product = products.find(p => String(p.id) === String(id));

  if (!product) return;

  const name = prompt('Новое название:', product.name);
  const price = prompt('Новая цена:', product.price);
  const image = prompt('Новая ссылка на фото:', product.image);

  if (name && price && image) {
    product.name = name;
    product.price = Number(price);
    product.image = image;
    saveProducts(products);
    renderProducts();
  }
}

document.querySelector('#productForm').addEventListener('submit', addProduct);

renderProducts();
