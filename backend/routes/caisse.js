const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Entry = mongoose.model('Entry')

// GET /api/caisse => balance + entries
router.get('/', async (req,res)=>{
  try{
    const entries = await Entry.find().sort({date:-1})
    const balance = entries.reduce((s,e)=> s + e.amount, 0)
    res.json({ balance, entries })
  }catch(err){ res.status(500).json({error: 'Server error'}) }
})

// POST add entry
router.post('/', async (req,res)=>{
  try{
    const {amount, type, desc} = req.body
    if(!amount || amount <= 0) return res.status(400).json({error: 'Montant requis > 0'})
    if(!['in','out'].includes(type)) return res.status(400).json({error: 'Type invalide'})
    const signed = type === 'out' ? -Math.abs(amount) : Math.abs(amount)
    const e = new Entry({ amount: signed, type, desc })
    await e.save()
    res.status(201).json(e)
  }catch(err){ console.error(err); res.status(500).json({error:'Server error'}) }
})

// PUT update entry
router.put('/:id', async (req,res)=>{
  try{
    const doc = await Entry.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.json(doc)
  }catch(err){ res.status(500).json({error:'Server error'}) }
})

// DELETE entry
router.delete('/:id', async (req,res)=>{
  try{ await Entry.findByIdAndDelete(req.params.id); res.json({ok:true}) }catch(err){ res.status(500).json({error:'Server error'}) }
})

// DELETE all
router.delete('/', async (req,res)=>{
  try{ await Entry.deleteMany({}); res.json({ok:true}) }catch(err){ res.status(500).json({error:'Server error'}) }
})

module.exports = router
