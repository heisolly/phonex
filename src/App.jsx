import React, { useState } from 'react'
import { Phone, Users, FolderOpen } from 'lucide-react'
import Dialer from './components/Dialer'
import Contacts from './components/Contacts'
import Departments from './components/Departments'
import { useSupabaseContacts } from './hooks/useSupabaseContacts'

function App() {
  const [activeTab, setActiveTab] = useState('dialer')
  
  // Use Supabase hook for contacts management
  const { 
    contacts, 
    loading, 
    error, 
    addContact: addContactToSupabase, 
    updateContact: updateContactInSupabase, 
    deleteContact: deleteContactFromSupabase 
  } = useSupabaseContacts()

  // Wrapper functions to handle responses
  const addContact = async (contact) => {
    const result = await addContactToSupabase(contact)
    if (result.success) {
      return result.data
    } else {
      alert('Error adding contact: ' + result.error)
      return null
    }
  }

  const updateContact = async (id, updatedContact) => {
    const result = await updateContactInSupabase(id, updatedContact)
    if (!result.success) {
      alert('Error updating contact: ' + result.error)
    }
  }

  const deleteContact = async (id) => {
    const result = await deleteContactFromSupabase(id)
    if (!result.success) {
      alert('Error deleting contact: ' + result.error)
    }
  }

  const tabs = [
    { id: 'dialer', label: 'Add Contact', icon: Phone },
    { id: 'contacts', label: 'All Contacts', icon: Users },
    { id: 'departments', label: 'Departments', icon: FolderOpen }
  ]

  return (
    <div className="w-full h-screen max-w-md mx-auto bg-amber-100 overflow-hidden flex flex-col relative">
      {/* Darker Header */}
      <div className="bg-amber-100 p-6 relative z-10 border-b-2 border-amber-300">
        <h1 className="text-3xl font-bold text-center text-amber-950">PHONEX</h1>
        <p className="text-center text-sm text-amber-800 mt-1 font-medium">Student Contact Collector</p>
      </div>

      {/* Content with bottom padding for fixed nav */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
        {loading && activeTab !== 'dialer' ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-amber-300 border-t-amber-700 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-amber-800 font-semibold">Loading contacts...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full p-6">
            <div className="bg-red-100 border-2 border-red-400 rounded-2xl p-6 text-center">
              <p className="text-red-800 font-bold mb-2">Connection Error</p>
              <p className="text-red-700 text-sm">{error}</p>
              <p className="text-red-600 text-xs mt-2">Check your .env file and Supabase setup</p>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>

      {/* Modern Fixed Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-md mx-auto">
          {/* Navigation Container with Glow Effect */}
          <div className="relative">
            {/* Glow Background */}
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 blur-xl opacity-20 -z-10"></div>
            
            {/* Main Nav Bar */}
            <div className="relative bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 backdrop-blur-2xl border-t-2 border-amber-300 shadow-2xl overflow-hidden">
              {/* Active Tab Indicator Background */}
              <div 
                className="absolute top-0 h-full bg-gradient-to-br from-amber-600 to-amber-700 transition-all duration-500 ease-out"
                style={{
                  width: '33.333%',
                  left: activeTab === 'dialer' ? '0%' : activeTab === 'contacts' ? '33.333%' : '66.666%',
                  transform: 'translateX(0)'
                }}
              />
              
              {/* Navigation Buttons */}
              <div className="relative flex items-center justify-around py-2 px-1">
                {tabs.map(tab => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="relative flex-1 flex flex-col items-center gap-1 py-2 px-2 transition-all duration-300 active:scale-95 group"
                    >
                      {/* Icon with Animation */}
                      <div className={`transition-all duration-300 ${isActive ? 'scale-105' : 'scale-100'}`}>
                        <Icon 
                          size={20} 
                          className={`transition-all duration-300 ${
                            isActive 
                              ? 'text-white drop-shadow-lg' 
                              : 'text-amber-700 group-hover:text-amber-900'
                          }`}
                          strokeWidth={isActive ? 2.5 : 2}
                        />
                      </div>
                      
                      {/* Label */}
                      <span className={`text-[10px] font-bold transition-all duration-300 ${
                        isActive 
                          ? 'text-white opacity-100' 
                          : 'text-amber-700 opacity-70 group-hover:opacity-100'
                      }`}>
                        {tab.label.split(' ')[0]}
                      </span>
                      
                      {/* Active Dot Indicator */}
                      {isActive && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-0.5 bg-white"></div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
