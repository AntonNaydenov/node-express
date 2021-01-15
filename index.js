"use strict";
const express = require('express');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const homeRoutes = require('./routes/home');
const cardRoutes = require('./routes/card');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const path = require('path');
const {mongo} = require('./config.json');
const User = require('./models/user');


const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('60019e5502cdee15344769cb');
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
    }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.use(homeRoutes);
app.use(addRoutes);
app.use(coursesRoutes);
app.use('/card', cardRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await mongoose.connect(mongo, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        const candidate = await User.findOne();
        if (!candidate){
            const user = new User({
                email: 'naydenov@rumex.ru',
                name: 'Anton',
                cart: {items: []}
            });
            await user.save();
        }
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }

}

start();
