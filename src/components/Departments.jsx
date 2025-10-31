import React, { useState } from 'react'
import { FolderOpen, Users, ChevronRight, Search } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'

function Departments({ contacts }) {
  const [selectedDept, setSelectedDept] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Group contacts by department
  const departmentGroups = contacts.reduce((acc, contact) => {
    const dept = contact.department || 'Uncategorized'
    if (!acc[dept]) {
      acc[dept] = []
    }
    acc[dept].push(contact)
    return acc
  }, {})

  const departments = Object.keys(departmentGroups).sort()

  const handleWhatsApp = (phone) => {
    let cleanNumber = phone.replace(/[^0-9]/g, '')
    if (!cleanNumber.startsWith('234') && cleanNumber.startsWith('0')) {
      cleanNumber = '234' + cleanNumber.substring(1)
    } else if (!cleanNumber.startsWith('234') && !cleanNumber.startsWith('+')) {
      cleanNumber = '234' + cleanNumber
    }
    window.open(`https://wa.me/${cleanNumber}`, '_blank')
  }

  // Filter contacts in selected department
  const filteredContacts = selectedDept
    ? departmentGroups[selectedDept].filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery)
      )
    : []

  if (selectedDept) {
    return (
      <div className="p-6 animate-fadeIn">
        {/* Back Button & Search */}
        <button
          onClick={() => {
            setSelectedDept(null)
            setSearchQuery('')
          }}
          className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-4"
        >
          <ChevronRight size={20} className="rotate-180" />
          Back to Departments
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <FolderOpen className="text-neon-purple" size={28} />
            {selectedDept}
          </h2>
          <p className="text-gray-400 text-sm">
            {departmentGroups[selectedDept].length} student{departmentGroups[selectedDept].length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search in department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 glass-effect border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-white placeholder-gray-600 text-sm"
          />
        </div>

        {/* Contacts List */}
        <div className="space-y-3">
          {filteredContacts.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No contacts found</p>
          ) : (
            filteredContacts.map(contact => (
              <div
                key={contact.id}
                className="glass-effect border border-white/10 rounded-xl p-4 hover:border-primary/30 transition-all transform hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-green to-neon-blue text-dark-900 flex items-center justify-center font-bold flex-shrink-0">
                    {contact.avatar}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white truncate">{contact.name}</h3>
                      {contact.hasWhatsApp && (
                        <WhatsAppIcon size={14} className="text-whatsapp flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-primary text-xs font-mono">{contact.phone}</p>
                    {contact.level && (
                      <p className="text-neon-blue text-xs mt-1">{contact.level}</p>
                    )}
                  </div>

                  {contact.hasWhatsApp && (
                    <button
                      onClick={() => handleWhatsApp(contact.phone)}
                      className="px-3 py-2 bg-whatsapp/20 text-whatsapp rounded-lg hover:bg-whatsapp/30 transition-all flex-shrink-0"
                    >
                      <WhatsAppIcon size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <FolderOpen className="text-neon-purple" size={28} />
          Departments
        </h2>
        <p className="text-gray-400 text-sm">Browse contacts by department</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="glass-effect rounded-xl p-4 border border-primary/20">
          <p className="text-xs text-gray-400 mb-1">Total Contacts</p>
          <p className="text-2xl font-bold text-primary">{contacts.length}</p>
        </div>
        <div className="glass-effect rounded-xl p-4 border border-neon-purple/20">
          <p className="text-xs text-gray-400 mb-1">Departments</p>
          <p className="text-2xl font-bold text-neon-purple">{departments.length}</p>
        </div>
      </div>

      {/* Department Cards */}
      <div className="space-y-3">
        {departments.length === 0 ? (
          <div className="text-center py-16">
            <FolderOpen size={64} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-500 text-lg">No departments yet</p>
            <p className="text-gray-600 text-sm mt-2">Add contacts to see departments</p>
          </div>
        ) : (
          departments.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className="w-full glass-effect border border-white/10 rounded-xl p-5 hover:border-neon-purple/50 transition-all transform hover:scale-105 text-left group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center">
                    <FolderOpen size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1 group-hover:text-neon-purple transition-colors">
                      {dept}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users size={14} />
                      <span>{departmentGroups[dept].length} student{departmentGroups[dept].length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight size={24} className="text-gray-400 group-hover:text-neon-purple group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}

export default Departments
