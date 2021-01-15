"use strict";
const {Router} = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/courses', async (req, res) => {
    const courses = await Course.find().populate('userId', 'email name');

    console.log(courses);

    res.render('courses',{
        title: 'Список курсов',
        isCourses: true,
        courses
    });
});

router.get('/courses/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);
    res.render('course', {
        layout: 'empty',
        title: course.title,
        course
    });
});

router.get('/courses/:id/edit', async (req, res) => {

    if (!req.query.allow){
        return res.redirect('/');
    }
    const course = await Course.findById(req.params.id);
    res.render('edit',{
        title: course.title,
        course
    });
});

router.post('/courses/edit', async(req, res) =>{
    const {id} = req.body;
    delete req.body.id;
    await Course.findByIdAndUpdate(id, req.body);
    res.redirect('/courses');
});

router.post('/courses/remove', async(req, res) => {
    try {
        const {id} = req.body;
        await Course.deleteOne({_id : id});
        res.redirect('/courses');
    } catch (e) { console.log(e); }

});

module.exports = router;