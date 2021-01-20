const { boolean } = require('joi')
const mongoose = require('mongoose')

const folderSchema = mongoose.Schema({
    folder: {type:String, required: true},
    color: {type: String, required: true},
    date: {type: Date, default: Date.now},
    userId: {type: String, required: true},
    does:[{
        task: String,
        complited: Boolean
    }]
})

module.exports = mongoose.model("Folder", folderSchema)