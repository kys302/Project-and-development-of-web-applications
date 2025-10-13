export async function getProducts() {
  let products = JSON.parse(localStorage.getItem('products'));

  if (!products || products.length === 0) {
    try {
      const response = await fetch('../data/products.json');
      if (!response.ok) {
        console.error('Ошибка загрузки products.json:', response.statusText);
        return [];
      }
      products = await response.json();
      localStorage.setItem('products', JSON.stringify(products));
      console.log('Продукты загружены из JSON:', products);
    } catch (error) {
      console.error('Ошибка загрузки products.json:', error);
      return [];
    }
  }

  return products;
}

export async function getProductById(id) {
  const products = await getProducts();
  // Пробуем разные варианты сравнения ID
  return products.find(p => 
    p.id === parseInt(id) || 
    String(p.id) === String(id) || 
    p.id == id
  );
}

export async function renderProductList(container) {
  try {
    const products = await getProducts();

    if (!products || !products.length) {
      container.innerHTML = '<p>Товары не найдены</p>';
      return;
    }

    container.innerHTML = products.map((p, i) => `
      <div class="card" 
           data-id="${p.id}" 
           style="animation-delay: ${i * 0.1}s">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="price">${p.price} ₽</p>
      </div>
    `).join('');

    container.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        window.location.href = `product.html?id=${id}`;
      });
    });
  } catch (error) {
    console.error('Ошибка рендеринга товаров:', error);
    container.innerHTML = '<p>Ошибка загрузки товаров</p>';
  }
}