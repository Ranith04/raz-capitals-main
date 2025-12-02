import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from './config';

// Use hardcoded config instead of environment variables
const supabaseUrl = supabaseConfig.url;
const supabaseAnonKey = supabaseConfig.anonKey;

console.log('🔌 Initializing Supabase client (NO AUTH REQUIRED FOR TESTING)...');
console.log('   URL:', supabaseUrl);
console.log('   Anon Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'Not set');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Simple connection test (no auth required)
console.log('🔍 Testing Supabase connection...');

// Test a simple database query to verify connection (no auth required)
(async () => {
  try {
    console.log('🔍 Testing database connection to users table...');
    const { count, error } = await supabase.from('users').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Database connection test failed:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      
      // Try to get more info about the error
      if (error.message.includes('relation') || error.message.includes('does not exist')) {
        console.error('   💡 This suggests the table structure might be different');
        console.error('   💡 Check if your Supabase tables match the expected names');
      }
    } else {
      console.log('✅ Database connection test successful (NO AUTH)');
      console.log('   Users table accessible, count:', count);
    }
  } catch (err: unknown) {
    console.error('❌ Database test failed with exception:', err);
  }
})();

// Check what tables actually exist in the database
(async () => {
  try {
    console.log('🔍 Checking available tables in database...');
    
    // Try to query information_schema to see available tables
    const { data: tables, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_type', 'BASE TABLE');
    
    if (error) {
      console.log('⚠️ Could not query information_schema:', error.message);
      console.log('   This is normal for some Supabase setups');
    } else if (tables && tables.length > 0) {
      console.log('📋 Available tables in database:');
      tables.forEach(table => {
        console.log(`   - ${table.table_name}`);
      });
    } else {
      console.log('📋 No tables found in information_schema');
    }
    
    // Try some common table names to see what exists
    console.log('🔍 Testing common table names...');
    const commonTables = ['users', 'kyc_documents', 'tradingAccounts', 'transactions'];
    
    for (const tableName of commonTables) {
      try {
        const { error } = await supabase.from(tableName).select('count', { count: 'exact', head: true });
        if (error) {
          console.log(`   ❌ Table '${tableName}': ${error.message}`);
        } else {
          console.log(`   ✅ Table '${tableName}': EXISTS`);
        }
      } catch (err) {
        console.log(`   ❌ Table '${tableName}': Exception - ${err}`);
      }
    }
    
  } catch (err: unknown) {
    console.error('❌ Table check failed:', err);
  }
})();

// Basic session check (informational only - no blocking)
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.log('⚠️ Session check error (expected during testing):', error.message);
  } else {
    console.log('ℹ️ Session status:', data.session ? 'Active session' : 'No active session (expected for testing)');
    
    if (data.session) {
      console.log('   User details:', {
        id: data.session.user.id,
        email: data.session.user.email
      });
    }
  }
}).catch(err => {
  console.log('ℹ️ Session check failed (expected during testing):', err);
});

console.log('✅ Supabase client ready for testing (NO AUTH REQUIRED)');

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: number;
          user_uuid: string;
          email: string;
          name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_uuid: string;
          email: string;
          name: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_uuid?: string;
          email?: string;
          name?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      kyc_documents: {
        Row: {
          id: number;
          user_id: string;
          document_type: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          document_type: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          document_type?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      tradingAccounts: {
        Row: {
          id: number;
          account_uid: string;
          account_password: string;
          levarage: number;
          balance: number;
          currency: string;
          status: 'active' | 'inactive' | 'suspended' | 'pending' | 'expired';
          created_at: string;
          free_margin: number;
          equity: number;
          user_id: string;
          margin: number;
          watchlist: string[];
          account_type: 'real' | 'standard' | 'premium' | 'vip' | 'demo' | 'demo_30' | 'demo_60' | 'demo_90' | 'demo_unlimited';
        };
        Insert: {
          id?: number;
          account_uid: string;
          account_password: string;
          levarage?: number;
          balance?: number;
          currency?: string;
          status?: 'active' | 'inactive' | 'suspended' | 'pending' | 'expired';
          created_at?: string;
          free_margin?: number;
          equity?: number;
          user_id: string;
          margin?: number;
          watchlist?: string[];
          account_type?: 'standard' | 'premium' | 'vip' | 'demo' | 'demo_30' | 'demo_60' | 'demo_90' | 'demo_unlimited';
        };
        Update: {
          id?: number;
          account_uid?: string;
          account_password?: string;
          levarage?: number;
          balance?: number;
          currency?: string;
          status?: 'active' | 'inactive' | 'suspended' | 'pending' | 'expired';
          created_at?: string;
          free_margin?: number;
          equity?: number;
          user_id?: string;
          margin?: number;
          watchlist?: string[];
          account_type?: 'standard' | 'premium' | 'vip' | 'demo' | 'demo_30' | 'demo_60' | 'demo_90' | 'demo_unlimited';
        };
      };
      transactions: {
        Row: {
          id: number;
          user_id: string;
          type: string;
          amount: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          type: string;
          amount: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          type?: string;
          amount?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
