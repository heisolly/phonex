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
      <div className="min-h-screen bg-black p-4 md:p-6 relative overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-md mx-auto relative z-10">
          {/* Futuristic Display */}
          <div className="mb-6 animate-slideUp">
            <div className="relative group">
              {/* Glow border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl opacity-20 group-hover:opacity-30 blur transition duration-300"></div>
              
              <div className="relative bg-gradient-to-br from-zinc-900 to-black rounded-3xl p-6 border border-cyan-500/20 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse"></div>
                    INPUT STREAM
                  </label>
                  <div className="text-xs text-gray-600 font-mono">ID: #{Math.floor(Math.random() * 9999)}</div>
                </div>
                
                <input
                  type="text"
                  value={number}
                  readOnly
                  placeholder="_ _ _ _ _ _ _ _ _ _"
                  className="w-full text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400 bg-transparent border-none focus:outline-none placeholder-gray-800 mb-4 tracking-wider font-mono"
                />
                
                {number ? (
                  <div className="flex items-center justify-between pt-4 border-t border-cyan-500/10">
                    <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                      <span>ACTIVE • {number.length} CHARS</span>
                    </div>
                    <div className="text-xs text-gray-600 font-mono px-2 py-1 bg-cyan-500/5 rounded border border-cyan-500/20">
                      {number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-xs text-gray-700 font-mono flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                      AWAITING INPUT...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cyberpunk Dial Pad */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {dialPad.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {row.map(digit => (
                  <button
                    key={digit}
                    onClick={() => handleNumberClick(digit)}
                    className="relative group aspect-square rounded-xl bg-gradient-to-br from-zinc-900 to-black hover:from-zinc-800 hover:to-zinc-900 border border-white/10 hover:border-cyan-500/50 transition-all duration-200 flex items-center justify-center text-2xl font-bold text-white active:scale-95 overflow-hidden"
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300"></div>
                    <span className="relative z-10 group-hover:text-cyan-400 transition-colors font-mono">{digit}</span>
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>

          {/* Tech Action Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button
              onClick={handleDelete}
              disabled={!number}
              className="relative group py-4 rounded-xl bg-gradient-to-br from-red-950 to-black border border-red-500/30 hover:border-red-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex flex-col items-center justify-center gap-2 text-red-400 hover:text-red-300 active:scale-95 disabled:hover:scale-100 overflow-hidden"
            >
              <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 transition-all"></div>
              <Delete size={20} className="relative z-10" />
              <span className="text-xs font-bold uppercase tracking-wide relative z-10">Clear</span>
            </button>
            
            <button
              onClick={handleSaveClick}
              disabled={!number}
              className="relative group py-4 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex flex-col items-center justify-center gap-2 text-white font-bold active:scale-95 disabled:hover:scale-100 shadow-lg shadow-cyan-500/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all"></div>
              <Save size={22} className="relative z-10" />
              <span className="text-xs font-bold uppercase tracking-wide relative z-10">Save</span>
            </button>

            <button
              onClick={handleWhatsApp}
              disabled={!number}
              className="relative group py-4 rounded-xl bg-gradient-to-br from-green-950 to-black border border-green-500/30 hover:border-green-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex flex-col items-center justify-center gap-2 text-green-400 hover:text-green-300 active:scale-95 disabled:hover:scale-100 overflow-hidden"
            >
              <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 transition-all"></div>
              <WhatsAppIcon size={20} className="relative z-10" />
              <span className="text-xs font-bold uppercase tracking-wide relative z-10">Chat</span>
            </button>
          </div>

          {/* Tech Info Panel */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-5 border border-cyan-500/20 backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                  <Sparkles size={18} className="text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    ADVANCED PROFILES
                    <span className="text-[10px] px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 rounded border border-cyan-500/30">NEW</span>
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-mono">
                    Store comprehensive data: academic level, department, social networks.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="mt-6 mb-24 flex items-center justify-center gap-4 text-xs text-gray-700 font-mono">
            <span className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-green-500"></div>
              SECURE
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-cyan-500"></div>
              ENCRYPTED
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-blue-500"></div>
              ONLINE
            </span>
          </div>
        </div>

        {/* Rounded Centered Bottom Navigation */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
          <div className="flex items-center gap-2 px-6 py-4 rounded-full bg-zinc-900/90 backdrop-blur-xl border border-white/10 shadow-2xl">
            <button className="relative group p-3 rounded-full hover:bg-white/5 transition-all active:scale-95">
              <Phone size={20} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            
            <button className="relative group p-3 rounded-full hover:bg-white/5 transition-all active:scale-95">
              <UsersIcon size={20} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            <button className="relative p-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all active:scale-95">
              <Grid3x3 size={22} className="text-white" />
            </button>

            <button className="relative group p-3 rounded-full hover:bg-white/5 transition-all active:scale-95">
              <UserCircle size={20} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            <button className="relative group p-3 rounded-full hover:bg-white/5 transition-all active:scale-95">
              <Settings size={20} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Multi-Step Save Contact Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn overflow-y-auto">
          <div className="glass-effect rounded-3xl p-6 md:p-8 w-full max-w-md border-2 border-primary/30 animate-slideUp my-auto max-h-[90vh] overflow-y-auto">
            {/* Progress Bar */}
            <div className="mb-6 sticky top-0 bg-dark-800/95 backdrop-blur-sm -mx-6 md:-mx-8 px-6 md:px-8 py-4 z-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-400">Step {currentStep} of 10</span>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="h-1 bg-dark-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-neon-green to-neon-blue transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / 10) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Name & Phone */}
              {currentStep === 1 && (
                <div className="animate-fadeIn space-y-6">
                  <div className="text-center mb-6">
                    <User size={48} className="mx-auto text-primary mb-3" />
                    <h3 className="text-2xl font-bold text-white mb-2">What's their name?</h3>
                    <p className="text-gray-400 text-sm">Let's start with the basics</p>
                  </div>
                  
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 glass-effect border-2 border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-transparent text-white text-lg placeholder-gray-500 transition-all"
                    placeholder="Enter full name"
                    autoFocus
                  />

                  <div className="glass-effect p-4 rounded-xl border border-primary/20">
                    <p className="text-xs text-gray-400 mb-1">Phone Number</p>
                    <p className="text-primary font-mono text-lg">{formData.phone}</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!formData.name}
                    className="w-full py-4 bg-gradient-to-r from-neon-green to-neon-blue text-dark-900 rounded-2xl font-bold hover:shadow-lg hover:scale-105 transition-all neon-glow disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 2: Level Selection */}
              {currentStep === 2 && (
                <div className="animate-fadeIn space-y-6">
                  <div className="text-center mb-6">
                    <GraduationCap size={48} className="mx-auto text-neon-blue mb-3" />
                    <h3 className="text-2xl font-bold text-white mb-2">What level?</h3>
                    <p className="text-gray-400 text-sm">Select their current level</p>
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
                            ? 'bg-gradient-to-br from-neon-blue to-neon-purple text-white neon-glow'
                            : 'glass-effect border border-white/10 text-gray-300 hover:border-neon-blue/50'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="w-full py-3 glass-effect border border-white/20 rounded-xl font-semibold hover:bg-white/10 transition-all text-gray-300"
                  >
                    ← Back
                  </button>
                </div>
              )}

              {/* Step 3: Department */}
              {currentStep === 3 && (
                <div className="animate-fadeIn space-y-6">
                  <div className="text-center mb-6">
                    <BookOpen size={48} className="mx-auto text-neon-purple mb-3" />
                    <h3 className="text-2xl font-bold text-white mb-2">Department?</h3>
                    <p className="text-gray-400 text-sm">What are you studying?</p>
                  </div>

                  <input
                    type="text"
                    required
                    list="departments"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value.toUpperCase() })}
                    className="w-full px-6 py-4 glass-effect border-2 border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-transparent text-white text-lg placeholder-gray-500 transition-all"
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

                  <p className="text-center text-xs text-gray-500">Start typing to search</p>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex-1 py-3 glass-effect border border-white/20 rounded-xl font-semibold hover:bg-white/10 transition-all text-gray-300"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={!formData.department}
                      className="flex-1 py-3 bg-gradient-to-r from-neon-green to-neon-blue text-dark-900 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all neon-glow disabled:opacity-50"
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
                    <Instagram size={56} className="mx-auto text-pink-500 mb-3" />
                    <h3 className="text-2xl font-bold text-white mb-2">Instagram?</h3>
                    <p className="text-gray-400 text-sm">Let's connect on Instagram</p>
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
                      className="w-full px-6 py-4 pr-14 glass-effect border-2 border-pink-500/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 bg-transparent text-white text-lg placeholder-gray-500 transition-all"
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
                    <p className="text-center text-xs text-green-500 flex items-center justify-center gap-1">
                      <CheckCircle2 size={14} /> Username looks good!
                    </p>
                  )}
                  {verification.instagram.status === 'invalid' && (
                    <p className="text-center text-xs text-red-400">Username format invalid</p>
                  )}
                  {verification.instagram.status === 'idle' && !verification.instagram.checking && (
                    <p className="text-center text-xs text-gray-500">Optional - helps us connect better</p>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex-1 py-3 glass-effect border border-white/20 rounded-xl font-semibold hover:bg-white/10 transition-all text-gray-300"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all"
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
                    <Facebook size={56} className="mx-auto text-blue-500 mb-3" />
                    <h3 className="text-2xl font-bold text-white mb-2">Facebook?</h3>
                    <p className="text-gray-400 text-sm">Share your Facebook profile</p>
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
                      className="w-full px-6 py-4 pr-14 glass-effect border-2 border-blue-500/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-white text-lg placeholder-gray-500 transition-all"
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
                    <p className="text-center text-xs text-green-500 flex items-center justify-center gap-1">
                      <CheckCircle2 size={14} /> Username verified!
                    </p>
                  )}
                  {verification.facebook.status === 'invalid' && (
                    <p className="text-center text-xs text-red-400">Username format invalid</p>
                  )}
                  {verification.facebook.status === 'idle' && !verification.facebook.checking && (
                    <p className="text-center text-xs text-gray-500">Optional - for group updates</p>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex-1 py-3 glass-effect border border-white/20 rounded-xl font-semibold hover:bg-white/10 transition-all text-gray-300"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all"
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
                    <Music size={56} className="mx-auto text-gray-300 mb-3" />
                    <h3 className="text-2xl font-bold text-white mb-2">TikTok?</h3>
                    <p className="text-gray-400 text-sm">Your TikTok handle</p>
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
                      className="w-full px-6 py-4 pr-14 glass-effect border-2 border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-400 bg-transparent text-white text-lg placeholder-gray-500 transition-all"
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
                    <p className="text-center text-xs text-green-500 flex items-center justify-center gap-1">
                      <CheckCircle2 size={14} /> Username verified!
                    </p>
                  )}
                  {verification.tiktok.status === 'invalid' && (
                    <p className="text-center text-xs text-red-400">Username format invalid</p>
                  )}
                  {verification.tiktok.status === 'idle' && !verification.tiktok.checking && (
                    <p className="text-center text-xs text-gray-500">Optional - share your content</p>
                  )}

                  <div className="flex gap-3">
                    <button type="button" onClick={handlePrevStep} className="flex-1 py-3 glass-effect border border-white/20 rounded-xl font-semibold hover:bg-white/10 transition-all text-gray-300">← Back</button>
                    <button type="button" onClick={handleNextStep} className="flex-1 py-3 bg-gray-700 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all">
                      {formData.tiktok ? 'Next →' : 'Skip →'}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 7: Email */}
              {currentStep === 7 && (
                <div className="animate-fadeIn space-y-6">
                  <div className="text-center mb-6">
                    <Mail size={56} className="mx-auto text-neon-green mb-3" />
                    <h3 className="text-2xl font-bold text-white mb-2">Email?</h3>
                    <p className="text-gray-400 text-sm">For important updates</p>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onBlur={() => verifyEmail(formData.email)}
                      className="w-full px-6 py-4 pr-14 glass-effect border-2 border-neon-green/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-white text-lg placeholder-gray-500 transition-all"
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
                    <p className="text-center text-xs text-green-500 flex items-center justify-center gap-1">
                      <CheckCircle2 size={14} /> Email format is valid!
                    </p>
                  )}
                  {verification.email.status === 'invalid' && (
                    <p className="text-center text-xs text-red-400">Please enter a valid email</p>
                  )}
                  {verification.email.status === 'idle' && !verification.email.checking && (
                    <p className="text-center text-xs text-gray-500">Optional - for announcements</p>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex-1 py-3 glass-effect border border-white/20 rounded-xl font-semibold hover:bg-white/10 transition-all text-gray-300"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 py-3 bg-gradient-to-r from-neon-green to-neon-blue text-dark-900 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all neon-glow"
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
                    <WhatsAppIcon size={56} className="mx-auto text-whatsapp mb-3" />
                    <h3 className="text-2xl font-bold text-white mb-2">Do You have WhatsApp?</h3>
                    <p className="text-gray-400 text-sm">This helps us connect better</p>
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
                          ? 'bg-whatsapp text-white font-bold shadow-lg'
                          : 'glass-effect border-2 border-whatsapp/30 text-gray-300'
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
                          ? 'bg-gray-700 text-white font-bold'
                          : 'glass-effect border border-white/10 text-gray-300'
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
                    className="w-full py-3 glass-effect border border-white/20 rounded-xl font-semibold hover:bg-white/10 transition-all text-gray-300"
                  >
                    ← Back
                  </button>
                </div>
              )}

              {/* Step 9: Group Preference */}
              {currentStep === 9 && (
                <div className="animate-fadeIn space-y-6">
                  <div className="text-center mb-6">
                    <MessageSquare size={56} className="mx-auto text-primary mb-3" />
                    <h3 className="text-2xl font-bold text-white mb-2">How should we connect?</h3>
                    <p className="text-gray-400 text-sm">You can choose both!</p>
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
                          ? 'bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple text-white font-bold neon-glow shadow-2xl'
                          : 'glass-effect border-2 border-primary/30 text-gray-300'
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
                          ? 'bg-gradient-to-r from-neon-green to-neon-blue text-dark-900 font-bold neon-glow'
                          : 'glass-effect border-2 border-neon-green/30 text-gray-300'
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
                          ? 'bg-gradient-to-r from-neon-purple to-pink-500 text-white font-bold'
                          : 'glass-effect border-2 border-neon-purple/30 text-gray-300'
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
                    className="w-full py-3 glass-effect border border-white/20 rounded-xl font-semibold hover:bg-white/10 transition-all text-gray-300"
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
                      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-neon-green via-neon-blue to-neon-purple text-dark-900 flex items-center justify-center font-bold text-3xl mb-4 shadow-2xl neon-glow animate-pulse">
                        {formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                      {formData.hasWhatsApp && (
                        <div className="absolute -bottom-1 -right-1 bg-whatsapp rounded-full p-2 shadow-lg">
                          <WhatsAppIcon size={16} className="text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple mb-2">
                      All Set!
                    </h3>
                    <p className="text-gray-400 text-sm">Review and confirm</p>
                  </div>

                  {/* Compact Info Grid */}
                  <div className="glass-effect rounded-2xl p-4 border border-primary/20 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Name</p>
                        <p className="text-white font-bold text-sm truncate">{formData.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Phone</p>
                        <p className="text-primary font-mono text-xs truncate">{formData.phone}</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-white/10 pt-3 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Level</p>
                        <p className="text-neon-blue font-semibold text-sm">{formData.level}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Department</p>
                        <p className="text-neon-purple font-semibold text-xs truncate">{formData.department}</p>
                      </div>
                    </div>

                    {(formData.instagram || formData.facebook || formData.tiktok || formData.email) && (
                      <div className="border-t border-white/10 pt-3">
                        <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                          <Sparkles size={12} className="text-primary" />
                          Social
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {formData.instagram && (
                            <span className="px-2 py-1 bg-pink-500/20 text-pink-500 rounded-lg text-xs flex items-center gap-1">
                              <Instagram size={10} /> @{formData.instagram}
                            </span>
                          )}
                          {formData.facebook && (
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-500 rounded-lg text-xs flex items-center gap-1">
                              <Facebook size={10} /> {formData.facebook}
                            </span>
                          )}
                          {formData.tiktok && (
                            <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded-lg text-xs flex items-center gap-1">
                              <Music size={10} /> @{formData.tiktok}
                            </span>
                          )}
                          {formData.email && (
                            <span className="px-2 py-1 bg-neon-green/20 text-neon-green rounded-lg text-xs flex items-center gap-1 col-span-2">
                              <Mail size={10} /> {formData.email}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-400">Preference</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        formData.groupPreference === 'both'
                          ? 'bg-gradient-to-r from-neon-green to-neon-purple text-white'
                          : formData.groupPreference === 'group'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-neon-purple/20 text-neon-purple'
                      }`}>
                        {formData.groupPreference === 'both' ? '👥💬 Both' : formData.groupPreference === 'group' ? '👥 Group' : '🔒 Private'}
                      </span>
                    </div>
                  </div>

                  {/* Privacy Notice */}
                  <div className="glass-effect rounded-xl p-3 border border-primary/10">
                    <div className="flex items-start gap-2">
                      <Lock size={14} className="text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-400 leading-relaxed">
                        🔒 <span className="font-semibold text-gray-300">Your info stays safe.</span> We'll only use it to connect with other students and won't share it outside our group.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex-1 py-3 glass-effect border border-white/20 rounded-xl font-semibold hover:bg-white/10 transition-all text-gray-300"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple text-white rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all neon-glow"
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
