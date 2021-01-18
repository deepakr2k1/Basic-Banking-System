const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const User = require('./model/user');
const History = require('./model/history');

const app = express()

app.use(cookieParser());
app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', './views')
app.set('view engine', 'ejs')

// Mongo DB userSchema, connection, check
const dbURI = 'mongodb+srv://deepakrathore:S9ePxehjwSgUZXT7@cluster0.5ac7w.mongodb.net/money_transfer_website?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
const conn = mongoose.connection
conn.on('open', function() {
    console.log('connected to MongoDB')
})

// Welocome Page (login/register)
app.use('/user', require('./routes/userRoutes'))

app.get('/home', async(req, res) => {
    var user = {
        'name': req.cookies["name"],
        'email': req.cookies["email"],
    }
    if (user.email != null && user.email != "") {
        User.findOne({ email: user.email })
            .then((result) => {
                user.balance = result.balance;
                console.log(result)
                res.render('home', { 'user': user })
            })
            .catch((err) => {
                res.render('home', { 'user': user })
            })
    } else {
        res.render('home', { 'user': user })
    }
})

app.get('/pay', async(req, res) => {
    var user = {
        'name': req.cookies["name"],
        'email': req.cookies["email"],
    }
    User.findOne({ email: user.email })
        .then((result) => {
            user.balance = result.balance;
            res.render('pay', { 'user': user })
        })
})

app.get('/history/:sender', (req, res) => {
    var user = {
        'name': req.cookies["name"],
        'email': req.cookies["email"],
    }
    History.find({ $or: [{ sender: req.params.sender }, { receiver: req.params.sender }] }).sort({ date: -1 })
        .then((result) => {
            res.render('History', { 'user': user, 'history': result })
        })

})

app.post('/pay/:sender', async(req, res) => {
    var transferMoney = req.body;
    console.log(transferMoney)
    User.findOne({ email: transferMoney.email }).then((user) => {
        if (user) {
            user.balance += parseFloat(transferMoney.amount, 10);
            console.log(user.balance);
            user.save()
                .then(async(result) => {
                    console.log(result)
                    var history = new History({ sender: req.params.sender, receiver: transferMoney.email, amount: transferMoney.amount })
                    await history.save();
                    User.findOne({ email: req.params.sender })
                        .then(async(user) => {
                            user.balance -= parseFloat(transferMoney.amount, 10);
                            user.save()
                                .then((result) => {
                                    res.redirect('/home')
                                })
                        })
                        .catch((err) => {
                            console.log(err)
                            res.send('Some Error Occured')
                        })
                })
                .catch((err) => {
                    console.log(err)
                    res.send('Some Error Occured')
                })
        } else {
            console.log('No such User exists');
            res.send('No such User exists')
        }
    })
})

app.get('/logout', (req, res) => {
    res.cookie("name", "", { httpOnly: true });
    res.cookie("email", "", { httpOnly: true });
    res.redirect('/home')
})

const port = process.env.PORT || 80;
app.listen(80, console.log('Server is Listening...'))