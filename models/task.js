const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    title: {
        required: true,
        type: String

    },
    details: {
        required: true,
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

})

mongoose.model('tasks', TaskSchema)