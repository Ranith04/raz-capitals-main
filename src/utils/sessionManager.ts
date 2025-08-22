import { supabase } from '@/lib/supabaseClient';

export interface TestUser {
  email: string;
  password: string;
  name?: string;
}

export const sessionManager = {
  // Initialize a test session
  async initializeTestSession(user: TestUser) {
    try {
      console.log('🔐 Initializing test session for:', user.email);
      
      // First, try to sign up (this will create a user if it doesn't exist)
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: {
            name: user.name || 'Test User',
            role: 'user'
          }
        }
      });

      if (signUpError) {
        console.log('⚠️ Sign up error (user might already exist):', signUpError.message);
      } else if (signUpData.user) {
        console.log('✅ Test user created successfully:', {
          id: signUpData.user.id,
          email: signUpData.user.email
        });
      }

      // Now try to sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password
      });

      if (signInError) {
        console.error('❌ Sign in failed:', signInError.message);
        return { success: false, error: signInError.message };
      }

      if (signInData.user && signInData.session) {
        console.log('✅ Test session initialized successfully:', {
          userId: signInData.user.id,
          email: signInData.user.email,
          sessionId: signInData.session.access_token ? 'Present' : 'Missing'
        });
        
        return { 
          success: true, 
          user: signInData.user, 
          session: signInData.session 
        };
      } else {
        console.error('❌ No user or session data returned');
        return { success: false, error: 'No user or session data' };
      }

    } catch (error) {
      console.error('❌ Session initialization failed:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Get current session status
  async getCurrentSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('❌ Error getting session:', error);
        return { success: false, error: error.message };
      }

      if (data.session) {
        console.log('✅ Current session found:', {
          userId: data.session.user.id,
          email: data.session.user.email,
          expiresAt: new Date(data.session.expires_at! * 1000).toISOString()
        });
        return { success: true, session: data.session, user: data.session.user };
      } else {
        console.log('⚠️ No current session');
        return { success: false, session: null, user: null };
      }
    } catch (error) {
      console.error('❌ Session check failed:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('❌ Sign out error:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ Signed out successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Sign out failed:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Check if user is authenticated
  async isAuthenticated() {
    const result = await this.getCurrentSession();
    return result.success && !!result.session;
  }
};
