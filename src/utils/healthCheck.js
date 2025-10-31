import { supabase } from '../lib/supabase'

/**
 * Health check for Supabase connection and database
 * Run this in browser console: import('/src/utils/healthCheck.js').then(m => m.runHealthCheck())
 */
export async function runHealthCheck() {
  console.log('🏥 Running Supabase Health Check...\n')
  
  const results = {
    connection: false,
    database: false,
    schema: [],
    permissions: false,
    realtime: false
  }

  try {
    // 1. Check connection
    console.log('1️⃣ Checking connection...')
    const { data: connectionTest, error: connError } = await supabase
      .from('contacts')
      .select('count')
      .limit(1)
    
    if (!connError) {
      results.connection = true
      console.log('✅ Connection: OK')
    } else {
      console.error('❌ Connection: FAILED', connError)
    }

    // 2. Check database access
    console.log('\n2️⃣ Checking database access...')
    const { data: contacts, error: dbError } = await supabase
      .from('contacts')
      .select('*')
      .limit(1)
    
    if (!dbError) {
      results.database = true
      console.log('✅ Database: OK')
      console.log(`   Found ${contacts?.length || 0} contacts`)
    } else {
      console.error('❌ Database: FAILED', dbError)
    }

    // 3. Check schema (which columns exist)
    console.log('\n3️⃣ Checking table schema...')
    if (contacts && contacts.length > 0) {
      results.schema = Object.keys(contacts[0])
      console.log('✅ Schema columns:', results.schema.join(', '))
    } else {
      console.log('⚠️  No contacts to check schema (table might be empty)')
      // Try to get schema from error message or metadata
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .limit(0)
      if (data !== null) {
        console.log('✅ Table exists but is empty')
      }
    }

    // 4. Check write permissions
    console.log('\n4️⃣ Checking write permissions...')
    const testContact = {
      name: 'Health Check Test',
      phone: '0000000000'
    }
    
    const { data: insertTest, error: insertError } = await supabase
      .from('contacts')
      .insert([testContact])
      .select()
      .single()
    
    if (!insertError && insertTest) {
      results.permissions = true
      console.log('✅ Write permissions: OK')
      
      // Clean up test contact
      await supabase.from('contacts').delete().eq('id', insertTest.id)
      console.log('   (Test contact cleaned up)')
    } else {
      console.error('❌ Write permissions: FAILED', insertError)
    }

    // 5. Check realtime
    console.log('\n5️⃣ Checking realtime...')
    const channel = supabase.channel('health_check')
    const subscription = channel
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'contacts' },
        () => {}
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          results.realtime = true
          console.log('✅ Realtime: OK')
        } else {
          console.log('⚠️  Realtime status:', status)
        }
      })
    
    // Wait a bit for subscription
    await new Promise(resolve => setTimeout(resolve, 2000))
    await supabase.removeChannel(channel)

  } catch (error) {
    console.error('❌ Health check failed:', error)
  }

  // Summary
  console.log('\n📊 HEALTH CHECK SUMMARY')
  console.log('========================')
  console.log(`Connection:     ${results.connection ? '✅ OK' : '❌ FAILED'}`)
  console.log(`Database:       ${results.database ? '✅ OK' : '❌ FAILED'}`)
  console.log(`Schema:         ${results.schema.length > 0 ? '✅ OK' : '⚠️  EMPTY'}`)
  console.log(`Permissions:    ${results.permissions ? '✅ OK' : '❌ FAILED'}`)
  console.log(`Realtime:       ${results.realtime ? '✅ OK' : '⚠️  CHECK'}`)
  
  const allGood = results.connection && results.database && results.permissions
  console.log(`\n${allGood ? '🎉 ALL SYSTEMS GO!' : '⚠️  SOME ISSUES DETECTED'}`)
  
  return results
}

// Auto-run in development
if (import.meta.env.DEV) {
  console.log('💡 Tip: Run runHealthCheck() in console to test Supabase connection')
}
