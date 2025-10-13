import { validateForm } from './validation.js';
import { loginUser, registerUser, downloadUsersJSON } from './auth.js';
import { renderProductList, getProductById } from './products.js';

document.addEventListener('DOMContentLoaded', function() {
  updateNavigation();
  
  const downloadBtn = document.getElementById('downloadJson');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      downloadUsersJSON();
      alert('Файл users_backup.json скачивается!');
    });
  }
});

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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const { isValid } = validateForm(loginInput.value, passwordInput.value);
    if (!isValid) {
      alert('Ошибка валидации!');
      return;
    }

    try {
      if (isLoginMode) {
        const result = await loginUser(loginInput.value, passwordInput.value);
        
        if (result.success) {
          const user = result.user;
          alert(`Добро пожаловать, ${user.name || user.username}!`);

          if (user.role === 'admin') {
            window.location.href = 'admin.html';
          } else {
            window.location.href = 'index.html';
          }
        } else {
          alert(result.error);
        }
      } else {
        const result = await registerUser(loginInput.value, passwordInput.value, nameInput.value);
        if (result.success) {
          alert('Регистрация успешна! Файл users_updated.json скачан.');
          window.location.href = 'index.html';
        } else {
          alert(result.error);
        }
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при обработке запроса');
    }
  });
}

if (document.querySelector('.cards')) {
  const container = document.querySelector('.cards');
  renderProductList(container).catch(error => {
    console.error('Ошибка рендеринга товаров:', error);
    container.innerHTML = '<p>Ошибка загрузки товаров</p>';
  });
  
  const adminLink = document.getElementById('adminLink');
  if (adminLink) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.role === 'admin') {
      adminLink.style.display = 'inline-block';
    }
  }
}

if (document.querySelector('.product-page')) {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  if (productId) {
    getProductById(productId).then(product => {
      if (product) {
        document.querySelector('.product-page img').src = product.image;
        document.querySelector('.product-page img').alt = product.name;
        document.querySelector('.product-info h1').textContent = product.name;
        document.querySelector('.product-info p').textContent = product.description;
        document.querySelector('.product-info .price').textContent = `${product.price} ₽`;
        
        const bookButton = document.querySelector('.product-info button');
        if (bookButton) {
          bookButton.addEventListener('click', () => {
            alert(`Вы записались на "${product.name}"!`);
          });
        }
      } else {
        document.querySelector('.product-page').innerHTML = '<p>Товар не найден</p>';
      }
    }).catch(error => {
      console.error('Ошибка загрузки товара:', error);
      document.querySelector('.product-page').innerHTML = '<p>Ошибка загрузки товара</p>';
    });
  } else {
    document.querySelector('.product-page').innerHTML = '<p>ID товара не указан</p>';
  }
}

function updateNavigation() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const adminLink = document.getElementById('adminLink');
  const loginLink = document.querySelector('a[href="login.html"]');
  
  if (currentUser) {
    if (loginLink) {
      loginLink.textContent = 'Выйти';
      loginLink.href = '#';
      loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
      });
    }
    
    if (adminLink && currentUser.role === 'admin') {
      adminLink.style.display = 'inline-block';
    }
  } else {
    if (adminLink) {
      adminLink.style.display = 'none';
    }
    if (loginLink) {
      loginLink.textContent = 'Вход';
      loginLink.href = 'login.html';
    }
  }
}