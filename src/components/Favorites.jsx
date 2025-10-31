import React from 'react'
import { Star, Phone, MessageCircle, Mail } from 'lucide-react'

function Favorites({ contacts, toggleFavorite }) {
  const handleWhatsApp = (phone) => {
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank')
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Star className="text-yellow-500 fill-yellow-500" size={28} />
        Favorite Contacts
      </h2>

      {contacts.length === 0 ? (
        <div className="text-center py-16">
          <Star size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-400 text-lg">No favorite contacts yet</p>
          <p className="text-gray-400 text-sm mt-2">
            Star contacts to add them to favorites
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {contacts.map(contact => (
            <div
              key={contact.id}
              className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-4 hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold text-xl mb-3">
                  {contact.avatar}
                </div>
                
                <h3 className="font-semibold text-center mb-1 truncate w-full">
                  {contact.name}
                </h3>
                
                <p className="text-xs text-gray-600 mb-3 truncate w-full text-center">
                  {contact.phone}
                </p>

                {contact.email && (
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                    <Mail size={12} />
                    <span className="truncate max-w-[120px]">{contact.email}</span>
                  </div>
                )}

                <div className="flex gap-2 w-full">
                  <button
                    onClick={() => alert(`Calling ${contact.name}...`)}
                    className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                    title="Call"
                  >
                    <Phone size={16} />
                  </button>
                  
                  {contact.hasWhatsApp && (
                    <button
                      onClick={() => handleWhatsApp(contact.phone)}
                      className="flex-1 py-2 bg-whatsapp text-white rounded-lg hover:bg-green-500 transition-colors flex items-center justify-center"
                      title="WhatsApp"
                    >
                      <MessageCircle size={16} />
                    </button>
                  )}
                  
                  <button
                    onClick={() => toggleFavorite(contact.id)}
                    className="px-3 py-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-colors"
                    title="Remove from favorites"
                  >
                    <Star size={16} className="fill-current" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
