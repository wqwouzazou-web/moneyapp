const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, enum:['in','out'], required: true },
  desc: { type: String },
  date: { type: Date, default: Date.now }
})

mongoose.model('Entry', entrySchema)
