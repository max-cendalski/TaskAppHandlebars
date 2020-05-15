const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/task')
const Task = mongoose.model('tasks')




// Add Task Form
router.get('/add', (req, res) => {
    res.render('tasks/add')
})

// Edit Task Form
router.get('/edit/:id', (req, res) => {
    Task.findOne({
            _id: req.params.id
        })
        .then(task => {
            res.render('tasks/edit', {
                task: task
            })
        })
})

// Get Tasks
router.get('/', (req, res) => {
    Task.find({})
        .sort({ date: 'desc' })
        .then(tasks => {
            res.render('tasks/index', {
                tasks: tasks
            })
        })
})

// Process Form
router.post('/', async(req, res) => {
        const task = new Task(req.body)
        try {
            await task.save()
            res.redirect('/tasks')
        } catch (e) {
            res.send(e)
        }
    })
    /* app.post('/tasks', (req, res) => {
        let errors = []
        console.log(req.body)

        if (!req.body.title) {
            errors.push({ text: 'Please add title' })
        }
        if (!req.body.details) {
            errors.push({ text: 'Please add details' })
        }
        if (errors.length > 0) {
            res.render('tasks/add', {
                errors: errors,
                title: req.body.title,
                details: req.body.details,
            })
        } else {
            const newTask = {
                title: req.body.title,
                details: req.body.details

            }
            new Task(newTask)

            .save()
                .then(task => {
                    res.redirect('tasks')
                })
        }
    }) */

// Edit Form Process
router.put('/:id', async(req, res) => {
        try {
            task = await Task.findOne({ _id: req.params.id })
            task.title = req.body.title
            task.details = req.body.details
            task.save()
            res.redirect('/tasks')
        } catch (e) {
            res.status(500).send(e)
        }
        /* Task.findOne({
                _id: req.params.id
            })
            .then(task => {
                task.title = req.body.title,
                    task.details = req.body.details
                task.save()
                    .then(task => {
                        res.redirect('/tasks')
                    })
            }) */
    })
    // try {
    //     const task = await Task.findOne({ _id, owner: req.user._id })
    //     if (!task) {
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // } catch (e) {
    //     res.status(500).send(e)
    // }

// Delete Task
router.delete('/:id', async(req, res) => {
    await Task.deleteOne({ _id: req.params.id })
    res.redirect('/tasks')
})





module.exports = router