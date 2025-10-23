const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('../client'));

const USERS_FILE = path.join(__dirname, '../data/users.json');

app.post('/api/login', (req, res) => {
    console.log('LOGIN REQUEST:', req.body);
    
    const { login, password } = req.body;
    
    try {
        const usersData = fs.readFileSync(USERS_FILE, 'utf8');
        const users = JSON.parse(usersData);
        console.log('USERS IN FILE:', users);
        
        const user = users.find(u => u.username === login && u.password === password);
        
        if (user) {
            console.log('LOGIN SUCCESS');
            res.json({ 
                success: true, 
                user: user
            });
        } else {
            console.log('LOGIN FAILED');
            res.json({ success: false, error: 'Неверный логин или пароль' });
        }
    } catch (error) {
        console.error('ERROR:', error);
        res.json({ success: false, error: 'Ошибка сервера' });
    }
});

app.post('/api/register', (req, res) => {
    console.log('REGISTER REQUEST:', req.body);
    
    const { login, password, name } = req.body;
    
    try {
        const usersData = fs.readFileSync(USERS_FILE, 'utf8');
        const users = JSON.parse(usersData);
        
        if (users.find(u => u.username === login)) {
            return res.json({ success: false, error: 'Пользователь уже существует' });
        }

        const newUser = {
            id: users.length + 1,
            username: login,
            password: password,
            name: name || login,
            role: 'user'
        };

        users.push(newUser);
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
        
        res.json({ success: true, user: newUser });
        
    } catch (error) {
        console.error('ERROR:', error);
        res.json({ success: false, error: 'Ошибка сервера' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log(`Тестовый пользователь: admin / admin123`);
});