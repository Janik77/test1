module.exports = function(email)
{
    return {
        from: 'rinatabstest@gmail.com',
        to: email,
        subject: 'Успешная смена пароля',
        html: `
            <h1>Ваш пароль  к профилю <a href="http://localhost:3000">Online tests</a> успешно изменен</h1>
            <hr/>
            <a href="http://localhost:3000">Онлайн тесты</a>
        `
    
    }
}