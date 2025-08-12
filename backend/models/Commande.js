const mongoose = require('mongoose')

const commandeSchema = new mongoose.Schema({
  client: { type: String, required: true },
  amount: { type: Number, required: true },
  desc: { type: String },
  date: { type: Date, default: Date.now }
})

mongoose.model('Commande', commandeSchema)
