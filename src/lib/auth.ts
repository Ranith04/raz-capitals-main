import { supabase } from './supabaseClient'

export interface SignUpResult {
  success: boolean
  message: string
  userUuid?: string
}

/**
 * Signs up a new user with Supabase Auth and stores additional user details in the custom users table
 * 
 * Flow:
 * 1. Creates user in Supabase auth.users table (generates UUID)
 * 2. Inserts user details into custom users table using the generated UUID as user_uuid
 * 
 * Table relationships:
 * - auth.users.id (UUID) → users.user_uuid (UUID, foreign key)
 * - users.id (int8) is auto-incrementing primary key for the custom table
 */
export const signUpUser = async (
  email: string,
  password: string
): Promise<SignUpResult> => {
  try {
    // Step 1: Sign up the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      console.error('Auth signup error:', authError)
      return {
        success: false,
        message: authError.message || 'Failed to create user account',
      }
    }

    if (!authData.user?.id) {
      return {
        success: false,
        message: 'User account created but no user ID returned',
      }
    }

    const userId = authData.user.id

    // Step 2: Insert user data into custom users table
    const { error: insertError } = await supabase
      .from('users')
      .insert({
        user_uuid: userId,  // This references auth.users.id (UUID)
        email: email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

    if (insertError) {
      console.error('Database insertion error:', insertError)
      
      // Note: The user account was created in auth.users but failed to insert in custom table
      // In a production app, you might want to handle this differently
      return {
        success: false,
        message: 'Account created but failed to save user profile. Please contact support.',
        userUuid: userId,
      }
    }

    // Success: Both auth signup and database insertion succeeded
    return {
      success: true,
      message: 'Account created successfully! Please check your email to verify your account.',
      userUuid: userId,
    }

  } catch (error) {
    console.error('Unexpected error during signup:', error)
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    }
  }
}
