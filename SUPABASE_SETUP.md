# Supabase Integration for RAZ CAPITALS

This document outlines the complete Supabase integration for user authentication and profile management in the RAZ CAPITALS application.

## 🚀 What's Been Created

### 1. **Supabase Client** (`src/lib/supabaseClient.ts`)
- Configured with your Supabase project credentials
- Uses environment variables from `.env.local`
- Exports both typed and untyped Supabase clients

### 2. **Data Models** (`src/types/user.ts`)
- **AuthUser**: Supabase auth user interface
- **UserProfile**: Custom users table interface matching your schema
- **SignUpData**: Complete signup data structure
- **Step-by-step interfaces**: For multi-step signup process
- **AuthState**: Authentication state management

### 3. **Authentication Service** (`src/lib/authService.ts`)
- **createUserAccount()**: Creates user in Supabase auth.users
- **addBasicProfile()**: Stores step 2 data (first_name, last_name)
- **addPersonalDetails()**: Stores step 3 data (dob, gender)
- **addContactInfo()**: Stores step 4 data (phone_no, country_of_birth)
- **addAdditionalDetails()**: Stores step 5 data (middle_name, residential_address)
- **completeRegistration()**: Final step - saves all data to custom users table
- **getCurrentUser()**: Retrieves current authenticated user
- **getUserProfile()**: Gets user profile from custom table
- **signOut()**: Signs out user and clears session

### 4. **Signup Flow Hook** (`src/hooks/useSignupFlow.ts`)
- Manages state across all signup steps
- Handles navigation between steps
- Validates step progression
- Manages session storage for multi-step process

### 5. **Updated SignUpForm Component**
- Integrated with Supabase auth service
- Real-time validation
- Loading states and error handling
- Automatic navigation to next step on success

## 🔧 Environment Variables

Your `.env.local` file contains:
```env
NEXT_PUBLIC_SUPABASE_URL=https://scrrsnhctbmjvujfpxdf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📊 Database Schema

### Supabase Auth Table (`auth.users`)
- `id` (UUID) - Primary key, auto-generated
- `email` - User's email address
- `email_confirmed_at` - Email verification timestamp
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp

### Custom Users Table (`users`)
- `id` (int8) - Auto-incrementing primary key
- `user_uuid` (UUID) - Foreign key to auth.users.id
- `created_at` (timestamptz) - Profile creation timestamp
- `first_name` (varchar) - Required field
- `email` (varchar) - Required field
- `updated_at` (timestamptz) - Last update timestamp
- `password` (varchar) - Optional, stored separately
- `last_name` (varchar) - Optional
- `dob` (text) - Date of birth, optional
- `middle_name` (text) - Optional
- `phone_no` (text) - Optional
- `country_of_birth` (text) - Optional
- `gender` (text) - Optional
- `residential_address` (text) - Optional

## 🔄 Signup Flow

### Step 1: Account Creation
1. User enters email and password
2. `AuthService.createUserAccount()` called
3. User created in `auth.users` table
4. UUID generated and stored in sessionStorage
5. User navigated to step 2

### Step 2: Basic Profile
1. User enters first_name and last_name
2. Data stored in sessionStorage
3. User navigated to step 3

### Step 3: Personal Details
1. User enters date of birth and gender
2. Data stored in sessionStorage
3. User navigated to step 4

### Step 4: Contact Information
1. User enters phone number and country of birth
2. Data stored in sessionStorage
3. User navigated to step 5

### Step 5: Additional Details
1. User enters middle name and residential address
2. Data stored in sessionStorage
3. User completes registration

### Final Step: Database Insertion
1. All collected data combined
2. Complete profile inserted into custom `users` table
3. `user_uuid` links to `auth.users.id`
4. SessionStorage cleared
5. User redirected to dashboard

## 🎯 Usage Examples

### Basic Signup
```typescript
import { AuthService } from '@/lib/authService';

const handleSignup = async () => {
  const result = await AuthService.createUserAccount({
    email: 'user@example.com',
    password: 'securepassword'
  });
  
  if (result.success) {
    console.log('User UUID:', result.userUuid);
    // Navigate to next step
  }
};
```

### Complete Registration
```typescript
const handleCompleteRegistration = async () => {
  const result = await AuthService.completeRegistration();
  
  if (result.success) {
    console.log('Registration complete!');
    console.log('User Profile:', result.userProfile);
    // Redirect to dashboard
  }
};
```

### Get Current User
```typescript
const currentUser = await AuthService.getCurrentUser();
if (currentUser) {
  console.log('User ID:', currentUser.id);
  console.log('Email:', currentUser.email);
}
```

## 🛡️ Security Features

- **Password Validation**: Minimum 6 characters required
- **Email Validation**: Proper email format validation
- **Session Management**: Secure sessionStorage usage
- **Error Handling**: Comprehensive error logging and user feedback
- **Type Safety**: Full TypeScript support with strict typing

## 🚨 Error Handling

The system handles various error scenarios:
- Invalid email/password format
- Supabase authentication errors
- Database insertion failures
- Network connectivity issues
- Session storage errors

All errors are logged to console and displayed to users via alerts (can be enhanced with toast notifications).

## 🔮 Future Enhancements

- **Email Verification**: Implement email confirmation flow
- **Password Reset**: Add forgot password functionality
- **Social Login**: Integrate Google, Facebook, etc.
- **Profile Updates**: Allow users to edit their profiles
- **Admin Panel**: User management interface
- **Audit Logging**: Track user actions and changes

## 📝 Notes

- The system uses sessionStorage for multi-step signup data persistence
- All database operations are handled through Supabase client
- The custom users table maintains referential integrity with auth.users
- The system is designed to be scalable and maintainable
- All functions are properly typed and documented

## 🆘 Troubleshooting

### Common Issues:
1. **Environment Variables**: Ensure `.env.local` is properly configured
2. **Supabase Connection**: Verify your Supabase project is active
3. **Table Permissions**: Check RLS policies on your users table
4. **CORS Issues**: Ensure your domain is whitelisted in Supabase

### Debug Mode:
Enable console logging by checking browser console for detailed error messages and operation logs.
