import React from 'react'
import Dashboard from './components/Dashboard'

export default function App(){
  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-50 to-white p-6">
      <div className="max-w-5xl mx-auto">
        <Dashboard />
      </div>
    </div>
  )
}
