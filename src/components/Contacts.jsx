import React, { useState } from 'react'
import { Search, Edit, Trash2, X, GraduationCap, BookOpen, Mail } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'

function Contacts({ contacts, updateContact, deleteContact }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    level: '',
    department: '',
    hasWhatsApp: false
  })

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery) ||
    (contact.department && contact.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (contact.level && contact.level.toLowerCase().includes(searchQuery.toLowerCase()))
  ).sort((a, b) => a.name.localeCompare(b.name))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingContact) {
      updateContact(editingContact.id, formData)
      alert('Contact updated successfully! ✅')
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      level: '',
      department: '',
      hasWhatsApp: false
    })
    setShowAddModal(false)
    setEditingContact(null)
  }

  const handleEdit = (contact) => {
    setEditingContact(contact)
    setFormData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email || '',
      level: contact.level || '',
      department: contact.department || '',
      hasWhatsApp: contact.hasWhatsApp || false
    })
    setShowAddModal(true)
  }

  const handleWhatsApp = (phone) => {
    let cleanNumber = phone.replace(/[^0-9]/g, '')
    // Add country code if not present (assuming Nigeria +234 as default)
    if (!cleanNumber.startsWith('234') && cleanNumber.startsWith('0')) {
      cleanNumber = '234' + cleanNumber.substring(1)
    } else if (!cleanNumber.startsWith('234') && !cleanNumber.startsWith('+')) {
      cleanNumber = '234' + cleanNumber
    }
    window.open(`https://wa.me/${cleanNumber}`, '_blank')
  }

  const levels = ['100 Level', '200 Level', '300 Level', '400 Level', '500 Level', 'Graduate']

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600" size={20} />
        <input
          type="text"
          placeholder="Search by name, phone, level, or department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-amber-100 border-2 border-amber-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-amber-950 placeholder-amber-500 shadow-md"
        />
      </div>

      {/* Stats */}
      <div className="mb-6 bg-gradient-to-br from-amber-200 to-orange-200 rounded-2xl p-4 border-2 border-amber-400 shadow-md">
        <p className="text-center text-amber-800">
          Total Contacts: <span className="text-amber-950 font-bold text-xl">{contacts.length}</span>
        </p>
      </div>

      {/* Contacts List */}
      <div className="space-y-3">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-amber-700 text-lg font-semibold">No contacts found</p>
            <p className="text-amber-600 text-sm mt-2">Add contacts from the Add Contact tab</p>
          </div>
        ) : (
          filteredContacts.map(contact => (
            <div
              key={contact.id}
              className="bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-300 rounded-2xl p-4 hover:border-amber-500 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-md">
                  {contact.avatar}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg truncate text-amber-950">{contact.name}</h3>
                    {contact.hasWhatsApp && (
                      <WhatsAppIcon size={16} className="text-green-600 flex-shrink-0" />
                    )}
                  </div>
                  
                  <p className="text-amber-800 text-sm font-mono mb-2 font-semibold">{contact.phone}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {contact.level && (
                      <span className="flex items-center gap-1 text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-lg font-semibold">
                        <GraduationCap size={12} />
                        {contact.level}
                      </span>
                    )}
                    {contact.department && (
                      <span className="flex items-center gap-1 text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-lg font-semibold">
                        <BookOpen size={12} />
                        {contact.department}
                      </span>
                    )}
                  </div>
                  
                  {contact.email && (
                    <div className="flex items-center gap-2 text-amber-700 text-xs mb-3">
                      <Mail size={12} />
                      <span className="truncate">{contact.email}</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {/* WhatsApp button - always show */}
                    <button
                      onClick={() => handleWhatsApp(contact.phone)}
                      className="flex-1 py-2 bg-green-200 text-green-800 rounded-xl text-sm font-semibold hover:bg-green-300 transition-all flex items-center justify-center gap-2 border-2 border-green-400"
                      title="Open in WhatsApp"
                    >
                      <WhatsAppIcon size={16} />
                      WhatsApp
                    </button>
                    
                    <button
                      onClick={() => handleEdit(contact)}
                      className="px-4 py-2 bg-blue-200 text-blue-800 rounded-xl hover:bg-blue-300 transition-all border-2 border-blue-400"
                      title="Edit contact"
                    >
                      <Edit size={16} />
                    </button>
                    
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete ${contact.name}?`)) {
                          deleteContact(contact.id)
                        }
                      }}
                      className="px-4 py-2 bg-red-200 text-red-800 rounded-xl hover:bg-red-300 transition-all border-2 border-red-400"
                      title="Delete contact"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-amber-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-6 w-full max-w-md border-2 border-amber-400 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-amber-950">
                Edit Contact
              </h2>
              <button
                onClick={resetForm}
                className="text-amber-700 hover:text-amber-900"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-amber-800 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-amber-950 placeholder-amber-400"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-amber-800 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-amber-950 placeholder-amber-400"
                  placeholder="+1234567890"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-amber-800 mb-2">
                  <GraduationCap size={16} />
                  Level *
                </label>
                <select
                  required
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-amber-950"
                >
                  <option value="" className="bg-amber-50">Select Level</option>
                  {levels.map(level => (
                    <option key={level} value={level} className="bg-amber-50">{level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-amber-800 mb-2">
                  <BookOpen size={16} />
                  Department *
                </label>
                <input
                  type="text"
                  required
                  list="departments-edit"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-amber-950 placeholder-amber-400"
                  placeholder="Type or select department..."
                />
                <datalist id="departments-edit">
                  <option value="ACCOUNTING">Accounting</option>
                  <option value="AGRIC EXTENSION AND RURAL DEVELOPMENT">Agric Extension and Rural Development</option>
                  <option value="AGRICULTURAL ECONOMICS">Agricultural Economics</option>
                  <option value="AGRICULTURAL ENGINEERING">Agricultural Engineering</option>
                  <option value="AGRICULTURE">Agriculture</option>
                  <option value="BANKING AND FINANCE">Banking and Finance</option>
                  <option value="BIOCHEMISTRY">Biochemistry</option>
                  <option value="BIOLOGY">Biology</option>
                  <option value="BUSINESS ADMINISTRATION">Business Administration</option>
                  <option value="CHEMICAL ENGINEERING">Chemical Engineering</option>
                  <option value="CIVIL ENGINEERING">Civil Engineering</option>
                  <option value="COMPUTER SCIENCE">Computer Science</option>
                  <option value="ECONOMICS">Economics</option>
                  <option value="ELECTRICAL AND INFORMATION ENGINEERING">Electrical and Information Engineering</option>
                  <option value="INDUSTRIAL CHEMISTRY">Industrial Chemistry</option>
                  <option value="INTERNATIONAL RELATIONS">International Relations</option>
                  <option value="MATHEMATICS">Mathematics</option>
                  <option value="MECHANICAL ENGINEERING">Mechanical Engineering</option>
                  <option value="MECHATRONICS">Mechatronics</option>
                  <option value="MICROBIOLOGY">Microbiology</option>
                  <option value="PHYSICS">Physics</option>
                  <option value="POLITICAL SCIENCE">Political Science</option>
                  <option value="SOCIOLOGY">Sociology</option>
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-semibold text-amber-800 mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-amber-950 placeholder-amber-400"
                  placeholder="student@university.edu"
                />
              </div>

              <div className="flex items-center gap-3 bg-amber-200 p-4 rounded-xl border-2 border-amber-400">
                <input
                  type="checkbox"
                  id="hasWhatsApp"
                  checked={formData.hasWhatsApp}
                  onChange={(e) => setFormData({ ...formData, hasWhatsApp: e.target.checked })}
                  className="w-5 h-5 accent-green-600"
                />
                <label htmlFor="hasWhatsApp" className="text-sm font-medium text-amber-900 flex items-center gap-2">
                  <WhatsAppIcon size={18} className="text-green-600" />
                  Has WhatsApp
                </label>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-3 bg-amber-200 border-2 border-amber-400 rounded-xl font-semibold hover:bg-amber-300 transition-all text-amber-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contacts
