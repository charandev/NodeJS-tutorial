const express = require('express')
const mongoose = require('mongoose')
const Programmer = require('./models/Programmer')

const app = express()

const url = 'mongodb://localhost/ProgrammerDB'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const con = mongoose.connection

con.on('open', () => {
    console.log('Connection Established');
})

app.listen('9000', () => {
    console.log('Server Started')
})

app.use(express.json())

//API's

app.get('/test', (req, res) => {
    res.send('Hello world')
})

// Creating one
app.post('/programmer', async (req, res) => {
    const programmer = new Programmer({
        name: req.body.name,
        age: req.body.age,
        skill: req.body.skill,
        hasJob: req.body.hasJob
    })
    try {
        const newProgrammer = await programmer.save()
        res.status(201).json(newProgrammer)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Getting all
app.get('/programmers', async (req, res) => {
  try {
    const programmers = await Programmer.find()
    res.json(programmers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
