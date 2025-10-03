import { validateForm } from './validation.js';
import { loginUser, registerUser } from './auth.js';
import { renderProductList, getProductById } from './products.js';






if (document.querySelector('.form-container')) {
  const form = document.querySelector('form');
  const loginInput = form.querySelector('input[name="login"]');
  const passwordInput = form.querySelector('input[name="password"]');
  const nameInput = form.querySelector('input[name="name"]');
  const switchModeBtn = document.querySelector('#switchMode');
  let isLoginMode = true;

  switchModeBtn.addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    nameInput.parentElement.style.display = isLoginMode ? 'none' : 'block';
    form.querySelector('button').textContent = isLoginMode ? 'Войти' : 'Зарегистрироваться';
    switchModeBtn.textContent = isLoginMode ? 'Нет аккаунта? Регистрация' : 'Уже есть аккаунт? Войти';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { isValid, loginError, passwordError } = validateForm(loginInput.value, passwordInput.value);
    if (!isValid) {
      alert(`${loginError || ''} ${passwordError || ''}`);
      return;
    }

    if (isLoginMode) {
      const result = loginUser(loginInput.value, passwordInput.value);
      if (result.success) {
        alert('Вы успешно вошли в свой аккаунт!');
        window.location.href = 'index.html';
      } else {
        alert(result.error);
      }
    } else {
      const result = registerUser(loginInput.value, passwordInput.value, nameInput.value);
      if (result.success) {
        alert('Вы успешно зарегестрировались!');
        window.location.href = 'index.html';
      } else {
        alert(result.error);
      }
    }
  });
}






if (document.querySelector('.cards')) {
  const container = document.querySelector('.cards');
  renderProductList(container);
}


if (document.querySelector('.product-page')) {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  if (productId) {
    const product = getProductById(productId);
    if (product) {
      document.querySelector('.product-page img').src = product.image;
      document.querySelector('.product-info h1').textContent = product.name;
      document.querySelector('.product-info p').textContent = product.description;
      document.querySelector('.product-info .price').textContent = `${product.price} ₽`;
    }
  }
}
