const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

// connect
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(()=> console.log('MongoDB connected'))
  .catch(err=> console.error('Mongo connect error', err))

// models must be required before routes
require('./models/Entry')
require('./models/Commande')

app.use('/api/caisse', require('./routes/caisse'))
app.use('/api/commandes', require('./routes/commandes'))

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> console.log('Server running on', PORT))
