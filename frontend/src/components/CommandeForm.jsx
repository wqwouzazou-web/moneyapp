import React, {useState} from 'react'
import API from '../api'

export default function CommandeForm({solde, onDone}){
  const [client, setClient] = useState('')
  const [amount, setAmount] = useState('')
  const [desc, setDesc] = useState('')

  const submit = async (e)=>{
    e.preventDefault()
    const a = Number(amount)
    if(!a || a <= 0) return alert('Montant invalide')
    if(a > solde) return alert('Solde insuffisant')
    try{
      await API.post('/commandes', { client, amount: a, desc })
      setClient(''); setAmount(''); setDesc('')
      onDone()
    }catch(err){
      alert(err?.response?.data?.error || 'Erreur')
    }
  }

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-medium mb-2">Passer une commande</h2>
      <div className="space-y-2">
        <input value={client} onChange={e=>setClient(e.target.value)} placeholder="Nom du client" className="w-full p-2 border rounded" />
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Montant" className="w-full p-2 border rounded" />
        <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description (optionnel)" className="w-full p-2 border rounded" />
        <div className="flex gap-2">
          <button type="submit" disabled={Number(amount) > solde} className="flex-1 py-2 rounded bg-indigo-600 text-white disabled:opacity-50">Passer commande</button>
          <div className="py-2 px-3 text-sm bg-gray-50 rounded">Solde: <strong>{solde} DA</strong></div>
        </div>
      </div>
    </form>
  )
}
