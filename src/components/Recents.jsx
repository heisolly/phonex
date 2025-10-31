import React from 'react'
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Clock } from 'lucide-react'

function Recents({ recents, contacts }) {
  const getCallIcon = (type) => {
    switch (type) {
      case 'incoming':
        return <PhoneIncoming size={16} className="text-green-600" />
      case 'outgoing':
        return <PhoneOutgoing size={16} className="text-blue-600" />
      case 'missed':
        return <PhoneMissed size={16} className="text-red-600" />
      default:
        return <Phone size={16} className="text-gray-600" />
    }
  }

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getContactInfo = (number) => {
    const contact = contacts.find(c => c.phone === number)
    return contact || { name: 'Unknown', avatar: '?' }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Clock size={28} />
        Recent Calls
      </h2>

      {recents.length === 0 ? (
        <div className="text-center py-16">
          <Clock size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-400 text-lg">No recent calls</p>
          <p className="text-gray-400 text-sm mt-2">
            Your call history will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {recents.map(call => {
            const contactInfo = getContactInfo(call.number)
            return (
              <div
                key={call.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-semibold flex-shrink-0">
                    {contactInfo.avatar}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {getCallIcon(call.type)}
                      <h3 className="font-semibold truncate">{call.name}</h3>
                    </div>
                    
                    <p className="text-sm text-gray-600">{call.number}</p>
                    
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500">
                        {formatTime(call.timestamp)}
                      </span>
                      {call.duration && (
                        <>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">
                            {formatDuration(call.duration)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => alert(`Calling ${call.name}...`)}
                    className="w-10 h-10 rounded-full bg-primary text-white hover:bg-green-600 transition-colors flex items-center justify-center flex-shrink-0"
                  >
                    <Phone size={18} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Recents
