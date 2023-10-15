const { Router } = require('express');
const router = Router();
const { validationResult } = require('express-validator');
const { registerValidators } = require('../utils/validators');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'onlinetestkazakh@gmail.com',
        pass: 'jite jgbe ujzs okzg'
    }
});
const mailReg = require('../emails/registration');

const user = new User();

router.get('/', (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('register', {
        title: 'Регистрация',
        isRegister: true,
        registerError: req.flash('registerError')
    })
});

router.post('/', registerValidators, async (req, res) => {
    try {
        const errors = validationResult(req);
        const { email, name, azs_number, password, role } = req.body;

        if (!errors.isEmpty()) {
            req.flash('registerError', errors.array()[0].msg);
            return res.status(422).redirect('/register')
        }

        await user.addUser(email, name, azs_number, password, role);
        await transporter.sendMail(mailReg(email));
        return res.redirect('/login');
    }
    catch (e) {
        console.log(e)
    }
});

module.exports = router;