const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');
const ThoughtModel = require('./models/thought');

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/blog")
.then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

app.get('/getUsers',(req,res)=>{
    UserModel.find({})
    .then(users=> res.json(users))
    .catch(err=> res.json(err))
})

app.post("/createUser", (req,res)=>{
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getThought',(req,res)=>{
  ThoughtModel.find({})
  .then(thought=> res.json(thought))
  .catch(err=> res.json(err))
})

app.post("/createThought", (req,res)=>{
  ThoughtModel.create(req.body)
  .then(thought => res.json(thought))
  .catch(err => res.json(err))
})

app.put('/updateThought/:id', (req, res) => {
  ThoughtModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedThought => res.json(updatedThought))
      .catch(err => res.status(500).json(err));
});

app.delete('/deleteThought/:id', (req, res) => {
  ThoughtModel.findByIdAndDelete(req.params.id)
      .then(() => res.json({ message: 'Thought deleted' }))
      .catch(err => res.status(500).json(err));
});

app.listen(3001, ()=>{
    console.log("Server is running");
})
