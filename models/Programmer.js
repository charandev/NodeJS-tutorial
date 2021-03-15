const mongoose = require('mongoose')

const ProgrammerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
   skill: {
    type: String,
    required: true
  },
  hasJob : {
    type: Boolean,
    required: true,
  }
})

module.exports = mongoose.model('Programmer', ProgrammerSchema)