import React, {useEffect, useState} from 'react'
import API from '../api'
import CaisseForm from './CaisseForm'
import CommandeForm from './CommandeForm'
import History from './History'

export default function Dashboard(){
  const [caisse, setCaisse] = useState(0)
  const [entries, setEntries] = useState([])
  const [commandes, setCommandes] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchAll = async ()=>{
    try{
      setLoading(true)
      const r1 = await API.get('/caisse')
      const r2 = await API.get('/commandes')
      setCaisse(r1.data.balance)
      setEntries(r1.data.entries)
      setCommandes(r2.data)
    }catch(err){
      console.error(err)
      alert(err?.response?.data?.error || 'Erreur de connexion')
    }finally{setLoading(false)}
  }

  useEffect(()=>{ fetchAll() },[])

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">MoneyApp — CoffreFort</h1>
        <div className="bg-white p-3 rounded-lg shadow">Solde: <strong>{caisse} DA</strong></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CaisseForm onDone={fetchAll} />
        <CommandeForm solde={caisse} onDone={fetchAll} />
      </div>

      <History entries={entries} commandes={commandes} onRefresh={fetchAll} />

      {loading && <div className="text-sm text-gray-500">Chargement...</div>}
    </div>
  )
}
