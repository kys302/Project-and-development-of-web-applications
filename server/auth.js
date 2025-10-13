async function loadUsers() {
  try {
    const response = await fetch('../data/users.json');
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Ошибка загрузки users.json:', error);
    return [];
  }
}

async function saveUsers(users) {
  console.log('Данные для сохранения в JSON:', JSON.stringify(users, null, 2));
  
  const blob = new Blob([JSON.stringify(users, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'users_updated.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  return true;
}

export async function registerUser(login, password, name) {
  const users = await loadUsers();

  if (users.find(u => u.username === login)) {
    return { success: false, error: 'Пользователь уже существует' };
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    username: login,
    password: password,
    name: name || login,
    role: users.length === 0 ? 'admin' : 'user'
  };

  users.push(newUser);
  await saveUsers(users);
  
  return { success: true };
}

export async function loginUser(username, password) {
  const users = await loadUsers();
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return { success: false, error: 'Неверный логин или пароль' };
  }

  localStorage.setItem('currentUser', JSON.stringify(user));
  return { success: true, user };
}

export function downloadUsersJSON() {
  loadUsers().then(users => {
    const blob = new Blob([JSON.stringify(users, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users_backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}