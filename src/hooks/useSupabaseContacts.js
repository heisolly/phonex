import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useSupabaseContacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch all contacts
  const fetchContacts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('name', { ascending: true })

      if (error) throw error
      
      // Transform data to match app format
      const transformedContacts = data.map(contact => ({
        ...contact,
        avatar: contact.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      }))
      
      setContacts(transformedContacts)
      setError(null)
    } catch (err) {
      console.error('Error fetching contacts:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Add new contact
  const addContact = async (contactData) => {
    try {
      // Build data object with only fields that have values
      const cleanData = {
        name: contactData.name || '',
        phone: contactData.phone || ''
      }

      // Safely add optional fields only if they exist
      // Only include fields that are confirmed to exist in your database
      const optionalFields = ['email', 'level', 'department']
      optionalFields.forEach(field => {
        if (contactData[field]) {
          cleanData[field] = contactData[field]
        }
      })

      // Skip social media fields and groupPreference until columns are added to database
      // To enable these, run the SQL in STORAGE_STATUS.md

      console.log('💾 Saving contact to Supabase:', cleanData)

      const { data, error } = await supabase
        .from('contacts')
        .insert([cleanData])
        .select()
        .single()

      if (error) {
        console.error('❌ Supabase error:', error)
        throw error
      }

      console.log('✅ Contact saved successfully:', data)

      const newContact = {
        ...data,
        avatar: data.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      }
      
      setContacts(prev => [...prev, newContact].sort((a, b) => a.name.localeCompare(b.name)))
      return { success: true, data: newContact }
    } catch (err) {
      console.error('❌ Error adding contact:', err)
      // Return detailed error message
      return { 
        success: false, 
        error: err.message || 'Failed to add contact',
        details: err
      }
    }
  }

  // Update contact
  const updateContact = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      const updatedContact = {
        ...data,
        avatar: data.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      }

      setContacts(prev =>
        prev.map(c => c.id === id ? updatedContact : c).sort((a, b) => a.name.localeCompare(b.name))
      )
      return { success: true, data: updatedContact }
    } catch (err) {
      console.error('Error updating contact:', err)
      return { success: false, error: err.message }
    }
  }

  // Delete contact
  const deleteContact = async (id) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id)

      if (error) throw error

      setContacts(prev => prev.filter(c => c.id !== id))
      return { success: true }
    } catch (err) {
      console.error('Error deleting contact:', err)
      return { success: false, error: err.message }
    }
  }

  // Subscribe to real-time changes
  useEffect(() => {
    fetchContacts()

    // Set up real-time subscription
    const subscription = supabase
      .channel('contacts_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'contacts' },
        (payload) => {
          console.log('Real-time change:', payload)
          fetchContacts() // Refetch on any change
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return {
    contacts,
    loading,
    error,
    addContact,
    updateContact,
    deleteContact,
    refetch: fetchContacts
  }
}
