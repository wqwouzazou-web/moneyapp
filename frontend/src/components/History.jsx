import React from 'react'
import API from '../api'

export default function History({entries, commandes, onRefresh}){
  const delEntry = async (id)=>{ if(!confirm('Supprimer cette entrée ?')) return; await API.delete('/caisse/'+id); onRefresh(); }
  const delCommande = async (id)=>{ if(!confirm('Supprimer cette commande ?')) return; await API.delete('/commandes/'+id); onRefresh(); }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-medium mb-3">Historique</h2>

      <div className="mb-4">
        <h3 className="text-sm font-semibold">Entrées / Sorties</h3>
        <div className="space-y-2 mt-2">
          {entries.length===0 && <div className="text-sm text-gray-500">Aucune entrée</div>}
          {entries.map(e=> (
            <div key={e._id} className="flex items-center justify-between p-2 border rounded">
              <div>
                <div className="text-sm">{e.desc || (e.type==='in' ? 'Ajout' : 'Retrait')}</div>
                <div className="text-xs text-gray-500">{new Date(e.date).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`font-medium ${e.amount<0? 'text-red-600':'text-green-600'}`}>{e.amount} DA</div>
                <button onClick={()=>delEntry(e._id)} className="text-red-500 text-sm">Suppr</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold">Commandes</h3>
        <div className="space-y-2 mt-2">
          {commandes.length===0 && <div className="text-sm text-gray-500">Aucune commande</div>}
          {commandes.map(c=> (
            <div key={c._id} className="flex items-center justify-between p-2 border rounded">
              <div>
                <div className="text-sm">{c.client} — {c.desc || ''}</div>
                <div className="text-xs text-gray-500">{new Date(c.date).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="font-medium text-red-600">-{c.amount} DA</div>
                <button onClick={()=>delCommande(c._id)} className="text-red-500 text-sm">Suppr</button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <button onClick={async ()=>{ if(confirm('Supprimer toutes les commandes ?')){ await API.delete('/commandes'); onRefresh(); } }} className="py-2 px-3 bg-red-100 rounded">Supprimer toutes les commandes</button>
        </div>
      </div>
    </div>
  )
}
