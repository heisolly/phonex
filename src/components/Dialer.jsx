import React, { useState, useEffect } from 'react'
import { Save, Delete, X, User, GraduationCap, BookOpen, Instagram, Facebook, Music, Mail, Sparkles, Users as UsersIcon, Lock, MessageSquare, CheckCircle2, Loader2, Phone, UserCircle, Grid3x3, Settings } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'

function Dialer({ contacts, addContact }) {
  const [number, setNumber] = useState('')
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    level: '',
    department: '',
    instagram: '',
    facebook: '',
    tiktok: '',
    email: '',
    hasWhatsApp: true,
    groupPreference: 'both' // 'both', 'group', or 'private'
  })

  // Verification states
  const [verification, setVerification] = useState({
    instagram: { status: 'idle', checking: false }, // idle, valid, invalid
    facebook: { status: 'idle', checking: false },
    tiktok: { status: 'idle', checking: false },
    email: { status: 'idle', checking: false }
  })

  // Verification functions (simulated backend check)
  const verifyUsername = async (platform, username) => {
    if (!username || username.length < 3) {
      setVerification(prev => ({
        ...prev,
        [platform]: { status: 'idle', checking: false }
      }))
      return
    }

    // Set checking state
    setVerification(prev => ({
      ...prev,
      [platform]: { status: 'idle', checking: true }
    }))

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Simulated validation rules (in real app, this would be an API call)
    const isValid = username.length >= 3 && /^[a-zA-Z0-9._]+$/.test(username)

    setVerification(prev => ({
      ...prev,
      [platform]: { status: isValid ? 'valid' : 'invalid', checking: false }
    }))
  }

  const verifyEmail = async (email) => {
    if (!email) {
      setVerification(prev => ({
        ...prev,
        email: { status: 'idle', checking: false }
      }))
      return
    }

    setVerification(prev => ({
      ...prev,
      email: { status: 'idle', checking: true }
    }))

    await new Promise(resolve => setTimeout(resolve, 800))

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValid = emailRegex.test(email)

    setVerification(prev => ({
      ...prev,
      email: { status: isValid ? 'valid' : 'invalid', checking: false }
    }))
  }

  const handleNumberClick = (digit) => {
    setNumber(prev => prev + digit)
  }

  const handleDelete = () => {
    setNumber(prev => prev.slice(0, -1))
  }

  const handleSaveClick = () => {
    if (number.trim()) {
      // Check if contact already exists
      const existingContact = contacts.find(c => c.phone === number)
      if (existingContact) {
        alert('This number is already saved!')
        return
      }
      setFormData({ ...formData, phone: number })
      setShowSaveModal(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addContact(formData)
    setShowSaveModal(false)
    setCurrentStep(1)
    setNumber('')
    setFormData({
      name: '',
      phone: '',
      level: '',
      department: '',
      instagram: '',
      facebook: '',
      tiktok: '',
      email: '',
      hasWhatsApp: true,
      groupPreference: 'both'
    })
    alert('Contact saved successfully! ✅')
  }

  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  const resetForm = () => {
    setShowSaveModal(false)
    setCurrentStep(1)
    setFormData({
      name: '',
      phone: '',
      level: '',
      department: '',
      instagram: '',
      facebook: '',
      tiktok: '',
      email: '',
      hasWhatsApp: true,
      groupPreference: 'both'
    })
  }

  const handleWhatsApp = () => {
    if (number.trim()) {
      let cleanNumber = number.replace(/[^0-9]/g, '')
      // Add country code if not present (assuming Nigeria +234 as default)
      if (!cleanNumber.startsWith('234') && cleanNumber.startsWith('0')) {
        cleanNumber = '234' + cleanNumber.substring(1)
      } else if (!cleanNumber.startsWith('234') && !cleanNumber.startsWith('+')) {
        cleanNumber = '234' + cleanNumber
      }
      window.open(`https://wa.me/${cleanNumber}`, '_blank')
    }
  }

  const dialPad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#']
  ]

  const levels = ['100 Level', '200 Level', '300 Level', '400 Level', '500 Level', 'Graduate']

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 px-4 pt-4 pb-4 relative overflow-hidden">
        {/* Darker Cream Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d97706_1px,transparent_1px),linear-gradient(to_bottom,#d97706_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-10"></div>
        
        {/* Warm Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-300/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-300/20 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-sm mx-auto relative z-10">
          {/* Darker Cream Input Display */}
          <div className="mb-5 animate-slideUp">
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-6 shadow-xl border-2 border-amber-300">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-xs font-semibold text-amber-900 uppercase tracking-wide flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-700"></div>
                    Phone Number
                  </label>
                  <div className="text-xs text-amber-700 font-medium">Contact #{Math.floor(Math.random() * 9999)}</div>
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    value={number}
                    readOnly
                    placeholder="Enter phone number"
                    className="w-full text-3xl font-bold text-amber-950 bg-transparent border-none focus:outline-none placeholder-amber-400 mb-4 tracking-wide"
                  />
                  {number && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 -mt-2">
                      <div className="w-8 h-8 rounded-full bg-amber-700/30 flex items-center justify-center">
                        <Phone size={16} className="text-amber-800" />
                      </div>
                    </div>
                  )}
                </div>
                
                {number ? (
                  <div className="flex items-center justify-between pt-4 border-t border-amber-300">
                    <div className="flex items-center gap-2 text-xs text-amber-800 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-700 animate-pulse"></div>
                      <span>{number.length} digits</span>
                    </div>
                    <div className="text-xs text-amber-800 font-medium px-3 py-1.5 bg-amber-200 rounded-full border border-amber-400">
                      {number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-amber-300">
                    <p className="text-xs text-amber-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      Start dialing to enter a number
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Darker Cream Dial Pad */}
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            {dialPad.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {row.map(digit => (
                  <button
                    key={digit}
                    onClick={() => handleNumberClick(digit)}
                    className="aspect-square rounded-2xl bg-gradient-to-br from-amber-200 to-orange-200 hover:from-amber-300 hover:to-orange-300 border-2 border-amber-400 hover:border-amber-600 transition-all duration-200 flex items-center justify-center text-2xl font-bold text-amber-950 active:scale-95 shadow-lg hover:shadow-xl touch-manipulation"
                  >
                    {digit}
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>

          {/* Darker Cream Action Buttons */}
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            <button
              onClick={handleDelete}
              disabled={!number}
              className="py-3.5 rounded-2xl bg-gradient-to-br from-red-200 to-red-300 hover:from-red-300 hover:to-red-400 border-2 border-red-400 hover:border-red-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex flex-col items-center justify-center gap-1.5 text-red-800 hover:text-red-900 active:scale-95 disabled:hover:scale-100 shadow-lg hover:shadow-xl touch-manipulation"
            >
              <Delete size={18} />
              <span className="text-[10px] font-bold uppercase tracking-wide">Clear</span>
            </button>
            
            <button
              onClick={handleSaveClick}
              disabled={!number}
              className="py-3.5 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex flex-col items-center justify-center gap-1.5 text-white font-bold active:scale-95 disabled:hover:scale-100 shadow-xl hover:shadow-2xl touch-manipulation"
            >
              <Save size={20} />
              <span className="text-[10px] font-bold uppercase tracking-wide">Save</span>
            </button>

            <button
              onClick={handleWhatsApp}
              disabled={!number}
              className="py-3.5 rounded-2xl bg-gradient-to-br from-green-200 to-green-300 hover:from-green-300 hover:to-green-400 border-2 border-green-400 hover:border-green-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex flex-col items-center justify-center gap-1.5 text-green-800 hover:text-green-900 active:scale-95 disabled:hover:scale-100 shadow-lg hover:shadow-xl touch-manipulation"
            >
              <WhatsAppIcon size={18} />
              <span className="text-[10px] font-bold uppercase tracking-wide">Chat</span>
            </button>
          </div>

          {/* Darker Cream Info Panel */}
          <div className="bg-gradient-to-br from-amber-200 to-yellow-200 rounded-2xl p-4 border-2 border-amber-400 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-700 flex items-center justify-center flex-shrink-0 shadow-md">
                <Sparkles size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold text-amber-950 mb-1 flex items-center gap-2">
                  Advanced Profiles
                  <span className="text-[9px] px-2 py-0.5 bg-amber-700 text-white rounded-full font-bold">NEW</span>
                </h3>
                <p className="text-[10px] text-amber-900 leading-relaxed">
                  Store comprehensive data: academic level, department, social networks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cream Theme Multi-Step Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-amber-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn overflow-y-auto">
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-6 md:p-8 w-full max-w-md border-2 border-amber-400 animate-slideUp my-auto max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Progress Bar */}
            <div className="mb-6 sticky top-0 bg-amber-100/95 backdrop-blur-sm -mx-6 md:-mx-8 px-6 md:px-8 py-4 z-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-amber-800 font-semibold">Step {currentStep} of 10</span>
                <button
                  onClick={resetForm}
                  className="text-amber-700 hover:text-amber-900 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="h-2 bg-amber-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-700 transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / 10) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Name & Phone */}
              {currentStep === 1 && (
                <div className="animate-fadeIn space-y-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-600 flex items-center justify-center shadow-lg">
                      <User size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-amber-950 mb-2">What's their name?</h3>
                    <p className="text-amber-700 text-sm">Let's start with the basics</p>
                  </div>
                  
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 bg-amber-50 border-2 border-amber-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-amber-950 text-lg placeholder-amber-400 transition-all"
                    placeholder="Enter full name"
                    autoFocus
                  />

                  <div className="bg-amber-200 p-4 rounded-xl border-2 border-amber-400">
                    <p className="text-xs text-amber-800 mb-1 font-semibold">Phone Number</p>
                    <p className="text-amber-950 font-mono text-lg font-bold">{formData.phone}</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!formData.name}
                    className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg"
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 2: Level Selection */}
              {currentStep === 2 && (
                <div className="animate-fadeIn space-y-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-600 flex items-center justify-center shadow-lg">
                      <GraduationCap size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-amber-950 mb-2">What level?</h3>
                    <p className="text-amber-700 text-sm">Select their current level</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {levels.map(level => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, level })
                          setTimeout(handleNextStep, 300)
                        }}
                        className={`p-4 rounded-2xl font-semibold transition-all transform hover:scale-105 ${
                          formData.level === level
                            ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-lg'
                            : 'bg-amber-200 border-2 border-amber-400 text-amber-900 hover:border-amber-600'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="w-full py-3 bg-amber-200 border-2 border-amber-400 rounded-xl font-semibold hover:bg-amber-300 transition-all text-amber-900"
                  >
                    ← Back
                  </button>
                </div>
              )}

              {/* Step 3: Department */}
              {currentStep === 3 && (
                <div className="animate-fadeIn space-y-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-600 flex items-center justify-center shadow-lg">
                      <BookOpen size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-amber-950 mb-2">Department?</h3>
                    <p className="text-amber-700 text-sm">What are you studying?</p>
                  </div>

                  <input
                    type="text"
                    required
                    list="departments"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value.toUpperCase() })}
                    className="w-full px-6 py-4 bg-amber-50 border-2 border-amber-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-amber-950 text-lg placeholder-amber-400 transition-all"
                    placeholder="Type or select your department..."
                    autoFocus
                  />
                  <datalist id="departments">
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

                  <p className="text-center text-xs text-amber-600">Start typing to search</p>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex-1 py-3 bg-amber-200 border-2 border-amber-400 rounded-xl font-semibold hover:bg-amber-300 transition-all text-amber-900"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={!formData.department}
                      className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Instagram */}
              {currentStep === 4 && (
                <div className="animate-fadeIn space-y-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <Instagram size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-amber-950 mb-2">Instagram?</h3>
                    <p className="text-amber-700 text-sm">Let's connect on Instagram</p>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => {
                        let value = e.target.value.replace(/[^a-zA-Z0-9._]/g, '').replace(/^@/, '')
                        setFormData({ ...formData, instagram: value })
                      }}
                      onBlur={() => verifyUsername('instagram', formData.instagram)}
                      className="w-full px-6 py-4 pr-14 bg-amber-50 border-2 border-pink-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-amber-950 text-lg placeholder-amber-400 transition-all"
                      placeholder="username (without @)"
                      autoFocus
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      {verification.instagram.checking && (
                        <Loader2 size={20} className="text-gray-400 animate-spin" />
                      )}
                      {verification.instagram.status === 'valid' && (
                        <CheckCircle2 size={20} className="text-green-500" />
                      )}
                      {verification.instagram.status === 'invalid' && (
                        <X size={20} className="text-red-500" />
                      )}
                    </div>
                  </div>

                  {verification.instagram.status === 'valid' && (
                    <p className="text-center text-xs text-green-700 flex items-center justify-center gap-1 font-semibold">
                      <CheckCircle2 size={14} /> Username looks good!
                    </p>
                  )}
                  {verification.instagram.status === 'invalid' && (
                    <p className="text-center text-xs text-red-700 font-semibold">Username format invalid</p>
                  )}
                  {verification.instagram.status === 'idle' && !verification.instagram.checking && (
                    <p className="text-center text-xs text-amber-600">Optional - helps us connect better</p>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex-1 py-3 bg-amber-200 border-2 border-amber-400 rounded-xl font-semibold hover:bg-amber-300 transition-all text-amber-900"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
                    >
                      {formData.instagram ? 'Next →' : 'Skip →'}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Facebook */}
              {currentStep === 5 && (
                <div className="animate-fadeIn space-y-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg">
                      <Facebook size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-amber-950 mb-2">Facebook?</h3>
                    <p className="text-amber-700 text-sm">Share your Facebook profile</p>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={formData.facebook}
                      onChange={(e) => {
                        let value = e.target.value.replace(/[^a-zA-Z0-9.]/g, '')
                        setFormData({ ...formData, facebook: value })
                      }}
                      onBlur={() => verifyUsername('facebook', formData.facebook)}
                      className="w-full px-6 py-4 pr-14 bg-amber-50 border-2 border-blue-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-amber-950 text-lg placeholder-amber-400 transition-all"
                      placeholder="username or profile name"
                      autoFocus
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      {verification.facebook.checking && (
                        <Loader2 size={20} className="text-gray-400 animate-spin" />
                      )}
                      {verification.facebook.status === 'valid' && (
                        <CheckCircle2 size={20} className="text-green-500" />
                      )}
                      {verification.facebook.status === 'invalid' && (
                        <X size={20} className="text-red-500" />
                      )}
                    </div>
                  </div>

                  {verification.facebook.status === 'valid' && (
                    <p className="text-center text-xs text-green-700 flex items-center justify-center gap-1 font-semibold">
                      <CheckCircle2 size={14} /> Username verified!
                    </p>
                  )}
                  {verification.facebook.status === 'invalid' && (
                    <p className="text-center text-xs text-red-700 font-semibold">Username format invalid</p>
                  )}
                  {verification.facebook.status === 'idle' && !verification.facebook.checking && (
                    <p className="text-center text-xs text-amber-600">Optional - for group updates</p>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex-1 py-3 bg-amber-200 border-2 border-amber-400 rounded-xl font-semibold hover:bg-amber-300 transition-all text-amber-900"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
                    >
                      {formData.facebook ? 'Next →' : 'Skip →'}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 6: TikTok */}
              {currentStep === 6 && (
                <div className="animate-fadeIn space-y-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-800 flex items-center justify-center shadow-lg">
                      <Music size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-amber-950 mb-2">TikTok?</h3>
                    <p className="text-amber-700 text-sm">Your TikTok handle</p>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={formData.tiktok}
                      onChange={(e) => {
                        let value = e.target.value.replace(/[^a-zA-Z0-9._]/g, '').replace(/^@/, '')
                        setFormData({ ...formData, tiktok: value })
                      }}
                      onBlur={() => verifyUsername('tiktok', formData.tiktok)}
                      className="w-full px-6 py-4 pr-14 bg-amber-50 border-2 border-amber-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 text-amber-950 text-lg placeholder-amber-400 transition-all"
                      placeholder="username (without @)"
                      autoFocus
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      {verification.tiktok.checking && (
                        <Loader2 size={20} className="text-gray-400 animate-spin" />
                      )}
                      {verification.tiktok.status === 'valid' && (
                        <CheckCircle2 size={20} className="text-green-500" />
                      )}
                      {verification.tiktok.status === 'invalid' && (
                        <X size={20} className="text-red-500" />
                      )}
                    </div>
                  </div>

                  {verification.tiktok.status === 'valid' && (
                    <p className="text-center text-xs text-green-700 flex items-center justify-center gap-1 font-semibold">
                      <CheckCircle2 size={14} /> Username verified!
                    </p>
                  )}
                  {verification.tiktok.status === 'invalid' && (
                    <p className="text-center text-xs text-red-700 font-semibold">Username format invalid</p>
                  )}
                  {verification.tiktok.status === 'idle' && !verification.tiktok.checking && (
                    <p className="text-center text-xs text-amber-600">Optional - share your content</p>
                  )}

                  <div className="flex gap-3">
                    <button type="button" onClick={handlePrevStep} className="flex-1 py-3 bg-amber-200 border-2 border-amber-400 rounded-xl font-semibold hover:bg-amber-300 transition-all text-amber-900">← Back</button>
                    <button type="button" onClick={handleNextStep} className="flex-1 py-3 bg-gray-700 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all">
                      {formData.tiktok ? 'Next →' : 'Skip →'}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 7: Email */}
              {currentStep === 7 && (
                <div className="animate-fadeIn space-y-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg">
                      <Mail size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-amber-950 mb-2">Email?</h3>
                    <p className="text-amber-700 text-sm">For important updates</p>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onBlur={() => verifyEmail(formData.email)}
                      className="w-full px-6 py-4 pr-14 bg-amber-50 border-2 border-green-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 text-amber-950 text-lg placeholder-amber-400 transition-all"
                      placeholder="your@email.com"
                      autoFocus
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      {verification.email.checking && (
                        <Loader2 size={20} className="text-gray-400 animate-spin" />
                      )}
                      {verification.email.status === 'valid' && (
                        <CheckCircle2 size={20} className="text-green-500" />
                      )}
                      {verification.email.status === 'invalid' && (
                        <X size={20} className="text-red-500" />
                      )}
                    </div>
                  </div>

                  {verification.email.status === 'valid' && (
                    <p className="text-center text-xs text-green-700 flex items-center justify-center gap-1 font-semibold">
                      <CheckCircle2 size={14} /> Email format is valid!
                    </p>
                  )}
                  {verification.email.status === 'invalid' && (
                    <p className="text-center text-xs text-red-700 font-semibold">Please enter a valid email</p>
                  )}
                  {verification.email.status === 'idle' && !verification.email.checking && (
                    <p className="text-center text-xs text-amber-600">Optional - for announcements</p>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex-1 py-3 bg-amber-200 border-2 border-amber-400 rounded-xl font-semibold hover:bg-amber-300 transition-all text-amber-900"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
                    >
                      {formData.email ? 'Next →' : 'Skip →'}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 8: WhatsApp Confirmation */}
              {currentStep === 8 && (
                <div className="animate-fadeIn space-y-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg">
                      <WhatsAppIcon size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-amber-950 mb-2">Do You have WhatsApp?</h3>
                    <p className="text-amber-700 text-sm">This helps us connect better</p>
                  </div>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, hasWhatsApp: true })
                        setTimeout(handleNextStep, 300)
                      }}
                      className={`w-full p-5 rounded-2xl transition-all transform hover:scale-105 ${
                        formData.hasWhatsApp
                          ? 'bg-green-600 text-white font-bold shadow-lg'
                          : 'bg-amber-200 border-2 border-green-400 text-amber-900'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <WhatsAppIcon size={24} />
                        <div className="text-center">
                          <p className="font-bold text-lg">Yes, I have WhatsApp</p>
                          <p className="text-xs opacity-80">We can chat easily</p>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, hasWhatsApp: false })
                        setTimeout(handleNextStep, 300)
                      }}
                      className={`w-full p-5 rounded-2xl transition-all transform hover:scale-105 ${
                        !formData.hasWhatsApp
                          ? 'bg-gray-700 text-white font-bold shadow-lg'
                          : 'bg-amber-200 border-2 border-amber-400 text-amber-900'
                      }`}
                    >
                      <div className="text-center">
                        <p className="font-semibold">No WhatsApp</p>
                        <p className="text-xs opacity-70">That's okay!</p>
                      </div>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="w-full py-3 bg-amber-200 border-2 border-amber-400 rounded-xl font-semibold hover:bg-amber-300 transition-all text-amber-900"
                  >
                    ← Back
                  </button>
                </div>
              )}

              {/* Step 9: Group Preference */}
              {currentStep === 9 && (
                <div className="animate-fadeIn space-y-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-600 flex items-center justify-center shadow-lg">
                      <MessageSquare size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-amber-950 mb-2">How should we connect?</h3>
                    <p className="text-amber-700 text-sm">You can choose both!</p>
                  </div>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, groupPreference: 'both' })
                        setTimeout(handleNextStep, 300)
                      }}
                      className={`w-full p-5 rounded-2xl transition-all transform hover:scale-105 ${
                        formData.groupPreference === 'both'
                          ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold shadow-xl'
                          : 'bg-amber-200 border-2 border-amber-400 text-amber-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          <UsersIcon size={24} className="relative z-10" />
                          <MessageSquare size={24} className="relative" />
                        </div>
                        <div className="text-left flex-1">
                          <p className="font-bold text-lg">Both - Group & Private</p>
                          <p className="text-sm opacity-80">Add me to groups + private chats</p>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, groupPreference: 'group' })
                        setTimeout(handleNextStep, 300)
                      }}
                      className={`w-full p-5 rounded-2xl transition-all transform hover:scale-105 ${
                        formData.groupPreference === 'group'
                          ? 'bg-gradient-to-r from-green-600 to-green-700 text-white font-bold shadow-xl'
                          : 'bg-amber-200 border-2 border-green-400 text-amber-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <UsersIcon size={28} />
                        <div className="text-left flex-1">
                          <p className="font-bold text-lg">Only Groups</p>
                          <p className="text-sm opacity-80">Join student groups only</p>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, groupPreference: 'private' })
                        setTimeout(handleNextStep, 300)
                      }}
                      className={`w-full p-5 rounded-2xl transition-all transform hover:scale-105 ${
                        formData.groupPreference === 'private'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-xl'
                          : 'bg-amber-200 border-2 border-purple-400 text-amber-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Lock size={28} />
                        <div className="text-left flex-1">
                          <p className="font-bold text-lg">Only Private Chat</p>
                          <p className="text-sm opacity-80">One-on-one only, no groups</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="w-full py-3 bg-amber-200 border-2 border-amber-400 rounded-xl font-semibold hover:bg-amber-300 transition-all text-amber-900"
                  >
                    ← Back
                  </button>
                </div>
              )}

              {/* Step 10: Final Overview */}
              {currentStep === 10 && (
                <div className="animate-fadeIn space-y-5 pb-4">
                  <div className="text-center mb-4">
                    <div className="relative inline-block">
                      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-amber-600 to-amber-700 text-white flex items-center justify-center font-bold text-3xl mb-4 shadow-2xl">
                        {formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                      {formData.hasWhatsApp && (
                        <div className="absolute -bottom-1 -right-1 bg-green-600 rounded-full p-2 shadow-lg">
                          <WhatsAppIcon size={16} className="text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-3xl font-bold text-amber-950 mb-2">
                      All Set!
                    </h3>
                    <p className="text-amber-700 text-sm">Review and confirm</p>
                  </div>

                  {/* Compact Info Grid */}
                  <div className="bg-amber-200 rounded-2xl p-4 border-2 border-amber-400 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-amber-700 mb-1 font-semibold">Name</p>
                        <p className="text-amber-950 font-bold text-sm truncate">{formData.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-amber-700 mb-1 font-semibold">Phone</p>
                        <p className="text-amber-900 font-mono text-xs truncate">{formData.phone}</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-amber-400 pt-3 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-amber-700 mb-1 font-semibold">Level</p>
                        <p className="text-amber-950 font-semibold text-sm">{formData.level}</p>
                      </div>
                      <div>
                        <p className="text-xs text-amber-700 mb-1 font-semibold">Department</p>
                        <p className="text-amber-950 font-semibold text-xs truncate">{formData.department}</p>
                      </div>
                    </div>

                    {(formData.instagram || formData.facebook || formData.tiktok || formData.email) && (
                      <div className="border-t border-amber-400 pt-3">
                        <p className="text-xs text-amber-700 mb-2 flex items-center gap-1 font-semibold">
                          <Sparkles size={12} className="text-amber-600" />
                          Social
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {formData.instagram && (
                            <span className="px-2 py-1 bg-pink-200 text-pink-700 rounded-lg text-xs flex items-center gap-1 font-semibold">
                              <Instagram size={10} /> @{formData.instagram}
                            </span>
                          )}
                          {formData.facebook && (
                            <span className="px-2 py-1 bg-blue-200 text-blue-700 rounded-lg text-xs flex items-center gap-1 font-semibold">
                              <Facebook size={10} /> {formData.facebook}
                            </span>
                          )}
                          {formData.tiktok && (
                            <span className="px-2 py-1 bg-gray-300 text-gray-800 rounded-lg text-xs flex items-center gap-1 font-semibold">
                              <Music size={10} /> @{formData.tiktok}
                            </span>
                          )}
                          {formData.email && (
                            <span className="px-2 py-1 bg-green-200 text-green-800 rounded-lg text-xs flex items-center gap-1 col-span-2 font-semibold">
                              <Mail size={10} /> {formData.email}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="border-t border-amber-400 pt-3 flex items-center justify-between">
                      <span className="text-xs text-amber-700 font-semibold">Preference</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        formData.groupPreference === 'both'
                          ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white'
                          : formData.groupPreference === 'group'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-purple-200 text-purple-800'
                      }`}>
                        {formData.groupPreference === 'both' ? '👥💬 Both' : formData.groupPreference === 'group' ? '👥 Group' : '🔒 Private'}
                      </span>
                    </div>
                  </div>

                  {/* Privacy Notice */}
                  <div className="bg-amber-200 rounded-xl p-3 border-2 border-amber-400">
                    <div className="flex items-start gap-2">
                      <Lock size={14} className="text-amber-700 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-amber-800 leading-relaxed">
                        🔒 <span className="font-bold text-amber-950">Your info stays safe.</span> We'll only use it to connect with other students and won't share it outside our group.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex-1 py-3 bg-amber-200 border-2 border-amber-400 rounded-xl font-semibold hover:bg-amber-300 transition-all text-amber-900"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
                    >
                      Save Contact ✓
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Dialer
