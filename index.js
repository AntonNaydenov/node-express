"use strict";
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const homeRoutes = require('./routes/home');
const cardRoutes = require('./routes/card');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const path = require('path');
const {mongo} = require('./config.json')


const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.use(homeRoutes);
app.use(addRoutes);
app.use(coursesRoutes);
app.use('/card', cardRoutes);

const PORT = process.env.PORT || 3000;

async function start() {

    const url = mongo;
    await mongoose.connect(url, {useNewUrlParser: true});
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
}

start();
