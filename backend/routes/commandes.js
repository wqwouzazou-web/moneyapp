const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Entry = mongoose.model('Entry')
const Commande = mongoose.model('Commande')

// GET commandes
router.get('/', async (req,res)=>{
  try{ const list = await Commande.find().sort({date:-1}); res.json(list) }catch(err){ res.status(500).json({error: 'Server error'}) }
})

// POST commande -> check balance and create
router.post('/', async (req,res)=>{
  try{
    const {client, amount, desc} = req.body
    if(!client || !amount) return res.status(400).json({error:'Données manquantes'})
    const entries = await Entry.find()
    const balance = entries.reduce((s,e)=> s + e.amount, 0)
    if(amount > balance) return res.status(400).json({error: 'Solde insuffisant'})

    const c = new Commande({ client, amount, desc })
    await c.save()

    const out = new Entry({ amount: -Math.abs(amount), type: 'out', desc: `Commande: ${client}` })
    await out.save()

    res.status(201).json({ commande: c, out });
  }catch(err){ console.error(err); res.status(500).json({error:'Server error'}) }
})

// PUT commande
router.put('/:id', async (req,res)=>{
  try{ const updated = await Commande.findByIdAndUpdate(req.params.id, req.body, {new:true}); res.json(updated) }catch(err){ res.status(500).json({error:'Server error'}) }
})

// DELETE commande (no auto-refund)
router.delete('/:id', async (req,res)=>{
  try{ await Commande.findByIdAndDelete(req.params.id); res.json({ok:true}) }catch(err){ res.status(500).json({error:'Server error'}) }
})

// DELETE all commandes
router.delete('/', async (req,res)=>{
  try{ await Commande.deleteMany({}); res.json({ok:true}) }catch(err){ res.status(500).json({error:'Server error'}) }
})

module.exports = router
