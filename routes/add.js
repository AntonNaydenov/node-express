const {Router} = require('express');
const { route } = require('./home');
const Course = require('../models/course');
const router = Router();

router.get('/add', (req, res) => {
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true
    });
});

router.post('/add', async (req, res) => {
    console.log(req.body);
    const course = new Course(req.body.title, req.body.price, req.body.img);

    await course.save();

    res.redirect('/courses');
});

module.exports = router;