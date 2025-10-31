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
    <div className="w-full h-screen max-w-md mx-auto bg-dark-800 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple p-6">
        <h1 className="text-3xl font-bold text-center text-dark-900">PHONEX</h1>
        <p className="text-center text-sm text-dark-800 mt-1 font-medium">Student Contact Collector</p>
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

      {/* Single Bottom Navigation Bar */}
      <div className="glass-effect border-t border-white/10">
        <div className="grid grid-cols-3 max-w-md mx-auto">
          {tabs.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 py-3 transition-all ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                <Icon size={20} className={isActive ? 'neon-glow' : ''} />
                <span className="text-xs font-semibold">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
