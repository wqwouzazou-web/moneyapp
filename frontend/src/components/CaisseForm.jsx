import React, {useState} from 'react'
import API from '../api'

export default function CaisseForm({onDone}){
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('in')
  const [desc, setDesc] = useState('')

  const submit = async (e)=>{
    e.preventDefault()
    const a = Number(amount)
    if(!a || a <= 0) return alert('Montant invalide')
    try{
      await API.post('/caisse', { amount: a, type, desc })
      setAmount(''); setDesc(''); setType('in')
      onDone()
    }catch(err){
      alert(err?.response?.data?.error || 'Erreur')
    }
  }

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-medium mb-2">Gestion de la caisse</h2>
      <div className="space-y-2">
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Montant" className="w-full p-2 border rounded" />
        <select value={type} onChange={e=>setType(e.target.value)} className="w-full p-2 border rounded">
          <option value="in">Entrée (ajouter)</option>
          <option value="out">Sortie (retirer)</option>
        </select>
        <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" className="w-full p-2 border rounded" />
        <div className="flex gap-2">
          <button type="submit" className="flex-1 py-2 rounded bg-green-500 text-white">Enregistrer</button>
          <button type="button" onClick={async ()=>{ if(confirm('Supprimer tout l\'historique de la caisse ?')){ await API.delete('/caisse'); onDone(); } }} className="py-2 px-3 rounded bg-red-100">Supprimer tout</button>
        </div>
      </div>
    </form>
  )
}
