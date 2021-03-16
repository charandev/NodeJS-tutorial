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

// Getting one by ID

app.get('/programmer/:id', getProgrammer, (req, res) => {

    res.send(res.programmer)

})

// Updating One
app.patch('/programmer/:id', getProgrammer, async (req, res) => {
    let existingProgrammer = res.programmer
    console.log(existingProgrammer);
    if (req.body.name !== null) {
        existingProgrammer.name = req.body.name
    }
    if (req.body.age !== null) {
        existingProgrammer.age = req.body.age
    }
    if (req.body.skill !== null) {
        existingProgrammer.skill = req.body.skill
    }
    if (req.body.hasJob !== null) {
        existingProgrammer.hasJob = req.body.hasJob
    }

    try {
        const updatedProgrammer = await res.programmer.save()
        res.send(updatedProgrammer)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Delete 
app.delete('/programmer/:id', getProgrammer, async (req, res) => {
    try {
        await res.programmer.remove()
        res.json({ message: 'Deleted Subscriber' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getProgrammer(req, res, next) {
    var id = req.params.id
    console.log(id);
    let programmer = ''
    try {
        programmer = await Programmer.findById(id)
        if (programmer == null) {
            return res.status(404).json({ message: 'Cannot find programmer' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.programmer = programmer
    next()
}