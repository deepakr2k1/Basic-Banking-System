const User = require('../model/user')
const bcrypt = require('bcrypt')

welcome_page = (req, res) => {
    res.render('welcome', { name: "", email: "", errors: [] })
}

register = async(req, res) => {
    const { name, email, password } = req.body
    let errors = []

    if (password.length < 6) {
        errors.push({ msg: 'Password must have at least 6 characters' })
        res.render('welcome', { name: name, email: email, errors: errors })
    } else {
        User.findOne({ email: email }).then(async user => {
            if (user) {
                let errors = []
                errors.push({ msg: 'Email already Regsitered' })
                res.render('welcome', { name: name, email: email, errors: errors })
            }
        })
        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            console.log(hashedPassword)
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword
            })
            await user.save()
            res.cookie("name", name, { httpOnly: true });
            res.cookie("email", email, { httpOnly: true });
            res.redirect('/home')
        } catch (err) {
            let errors = []
            errors.push({ msg: 'Some Error occured, Please try again' })
            res.render('welcome', { name: name, email: email, errors: errors })
        }
    }
}

login = async(req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }).then(async user => {
        if (!user) {
            let errors = []
            errors.push({ msg: 'Email not Regsitered' })
            res.render('welcome', { name: "", email: email, errors: errors })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                res.cookie("name", user.name, { httpOnly: true });
                res.cookie("email", email, { httpOnly: true });
                res.redirect('/home')
            } else {
                let errors = []
                errors.push({ msg: 'Incorrect Password' })
                res.render('welcome', { name: "", email: email, errors: errors })
            }
        } catch {
            let errors = []
            errors.push({ msg: 'Some Error occured, Please try again' })
            res.render('welcome', { name: "", email: email, errors: errors })
        }
    })
}

module.exports = {
    'welcome_page': welcome_page,
    'register': register,
    'login': login,
}