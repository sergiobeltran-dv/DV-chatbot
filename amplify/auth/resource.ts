import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    username: false,
    phone: false
  },
  // Cognito User Pool configuration
  userAttributes: {
    // Required attributes
    email: {
      required: true,
      mutable: true
    },
    // Optional attributes
    name: {
      required: false,
      mutable: true
    },
    // Custom attributes
    company: {
      required: false,
      mutable: true
    },
    role: {
      required: false,
      mutable: true
    }
  },
  // Multi-factor authentication settings
  multifactor: {
    mode: 'OPTIONAL',
    sms: true,
    totp: true
  },
  // Password policy
  passwordPolicy: {
    minLength: 8,
    requireLowercase: true,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialCharacters: true
  },
  // Email verification
  verification: {
    email: {
      emailSubject: 'Welcome to Datavail AI - Verify your email',
      emailBody: 'Thanks for signing up! Your verification code is: {####}',
      emailStyle: 'CODE'
    }
  },
  // Session management
  sessionManagement: {
    requiresUserPresence: true,
    timeoutInMinutes: 60
  },
  // Advanced security features
  advancedSecurityMode: 'AUDIT',
  // Account recovery
  accountRecovery: 'EMAIL_ONLY',
  // Sign-up settings
  signUpVerification: {
    attributesToVerify: ['email'],
    verificationEmailStyle: 'CODE'
  }
});
