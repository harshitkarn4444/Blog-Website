const mongoose =require('mongoose')

const ThoughtSchema = new mongoose.Schema({
    heading:String,
    subheading:String,
    content:String,
    author:String
})

const ThoughtModel = mongoose.model("thoughts",ThoughtSchema)
module.exports = ThoughtModel