const {Router} = require('express');
const router = Router();
// const randomNumbers = require('random-numbers');

router.get('/', (req, res) => {
    res.render('home', {
        isHome: true,
        title: 'Главная страница'
    })
})



module.exports = router;