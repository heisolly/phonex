import React, { useState, useEffect } from 'react'
import { Phone, Users, FolderOpen } from 'lucide-react'
import Dialer from './components/Dialer'
import Contacts from './components/Contacts'
import Departments from './components/Departments'

function App() {
  const [activeTab, setActiveTab] = useState('dialer')
  const [contacts, setContacts] = useState([])

  // Load contacts from localStorage on mount
  useEffect(() => {
    const savedContacts = localStorage.getItem('phonex-contacts')
    
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts))
    }
  }, [])

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('phonex-contacts', JSON.stringify(contacts))
  }, [contacts])

  const addContact = (contact) => {
    const newContact = {
      ...contact,
      id: Date.now().toString(),
      avatar: contact.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }
    setContacts([...contacts, newContact])
    return newContact
  }

  const updateContact = (id, updatedContact) => {
    setContacts(contacts.map(c => c.id === id ? { 
      ...updatedContact, 
      id,
      avatar: updatedContact.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    } : c))
  }

  const deleteContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id))
  }

  const tabs = [
    { id: 'dialer', label: 'Add Contact', icon: Phone },
    { id: 'contacts', label: 'All Contacts', icon: Users },
    { id: 'departments', label: 'Departments', icon: FolderOpen }
  ]

  return (
    <div className="w-full h-screen max-w-md mx-auto bg-black overflow-hidden flex flex-col relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 p-6 relative z-10">
        <h1 className="text-3xl font-bold text-center text-black">PHONEX</h1>
        <p className="text-center text-sm text-black/80 mt-1 font-medium">Student Contact Collector</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {activeTab === 'dialer' && (
          <Dialer contacts={contacts} addContact={addContact} />
        )}
        {activeTab === 'contacts' && (
          <Contacts
            contacts={contacts}
            updateContact={updateContact}
            deleteContact={deleteContact}
          />
        )}
        {activeTab === 'departments' && (
          <Departments contacts={contacts} />
        )}
      </div>

      {/* Futuristic Bottom Navigation - 3 Tabs */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
        <div className="flex items-center gap-2 px-6 py-4 rounded-full bg-zinc-900/90 backdrop-blur-xl border border-white/10 shadow-2xl">
          {tabs.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative p-4 rounded-full transition-all active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30'
                    : 'hover:bg-white/5'
                }`}
              >
                <Icon 
                  size={22} 
                  className={`transition-colors ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-cyan-400'
                  }`} 
                />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400"></div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
