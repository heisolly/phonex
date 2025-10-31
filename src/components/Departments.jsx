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
          className="flex items-center gap-2 text-amber-700 hover:text-amber-950 transition-colors mb-4 font-semibold"
        >
          <ChevronRight size={20} className="rotate-180" />
          Back to Departments
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-amber-950 mb-2 flex items-center gap-2">
            <FolderOpen className="text-purple-600" size={28} />
            {selectedDept}
          </h2>
          <p className="text-amber-700 text-sm font-semibold">
            {departmentGroups[selectedDept].length} student{departmentGroups[selectedDept].length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600" size={18} />
          <input
            type="text"
            placeholder="Search in department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-amber-100 border-2 border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-amber-950 placeholder-amber-500 text-sm shadow-md"
          />
        </div>

        {/* Contacts List */}
        <div className="space-y-3">
          {filteredContacts.length === 0 ? (
            <p className="text-center text-amber-700 py-8 font-semibold">No contacts found</p>
          ) : (
            filteredContacts.map(contact => (
              <div
                key={contact.id}
                className="bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-300 rounded-xl p-4 hover:border-amber-500 hover:shadow-lg transition-all transform hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                    {contact.avatar}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-amber-950 truncate">{contact.name}</h3>
                      {contact.hasWhatsApp && (
                        <WhatsAppIcon size={14} className="text-green-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-amber-800 text-xs font-mono font-semibold">{contact.phone}</p>
                    {contact.level && (
                      <p className="text-blue-700 text-xs mt-1 font-semibold">{contact.level}</p>
                    )}
                  </div>

                  {contact.hasWhatsApp && (
                    <button
                      onClick={() => handleWhatsApp(contact.phone)}
                      className="px-3 py-2 bg-green-200 text-green-800 rounded-lg hover:bg-green-300 transition-all flex-shrink-0 border-2 border-green-400"
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
        <h2 className="text-2xl font-bold text-amber-950 mb-2 flex items-center gap-2">
          <FolderOpen className="text-purple-600" size={28} />
          Departments
        </h2>
        <p className="text-amber-700 text-sm font-semibold">Browse contacts by department</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-gradient-to-br from-amber-200 to-orange-200 rounded-xl p-4 border-2 border-amber-400 shadow-md">
          <p className="text-xs text-amber-700 mb-1 font-semibold">Total Contacts</p>
          <p className="text-2xl font-bold text-amber-950">{contacts.length}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl p-4 border-2 border-purple-400 shadow-md">
          <p className="text-xs text-purple-700 mb-1 font-semibold">Departments</p>
          <p className="text-2xl font-bold text-purple-950">{departments.length}</p>
        </div>
      </div>

      {/* Department Cards */}
      <div className="space-y-3">
        {departments.length === 0 ? (
          <div className="text-center py-16">
            <FolderOpen size={64} className="mx-auto text-amber-400 mb-4" />
            <p className="text-amber-700 text-lg font-semibold">No departments yet</p>
            <p className="text-amber-600 text-sm mt-2">Add contacts to see departments</p>
          </div>
        ) : (
          departments.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className="w-full bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-300 rounded-xl p-5 hover:border-purple-500 hover:shadow-lg transition-all transform hover:scale-105 text-left group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-md">
                    <FolderOpen size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-amber-950 text-lg mb-1 group-hover:text-purple-700 transition-colors">
                      {dept}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-amber-700 font-semibold">
                      <Users size={14} />
                      <span>{departmentGroups[dept].length} student{departmentGroups[dept].length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight size={24} className="text-amber-600 group-hover:text-purple-700 group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}

export default Departments
