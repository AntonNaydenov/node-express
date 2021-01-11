const {Router} = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/courses', async (req, res) => {
    const courses = await Course.getAll();
    res.render('courses',{
        title: 'Список курсов',
        isCourses: true,
        courses
    });
});

router.get('/courses/:id', async (req, res) => {
    const course = await Course.getById(req.params.id);
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
    const course = await Course.getById(req.params.id);
    res.render('edit',{
        title: course.title,
        course
    });
});

router.post('/courses/edit', async(req, res) =>{
    await Course.update(req.body);
    res.redirect('/courses');
});


module.exports = router;