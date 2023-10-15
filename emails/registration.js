module.exports = function(email)
{
    return {
        from: 'rinatabstest@gmail.com',
        to: email,
        subject: 'Аккаунт создан',
        html: `
            <h1>Добро пожаловать в наш магазин</h1>
                <p>Вы успешно создали ваш аккаунт с E-mail - <b>${email}</b> </p>
                <hr/>
            <a href="http://localhost:3000">Онлайн тесты</a>
        ` 
    }
}