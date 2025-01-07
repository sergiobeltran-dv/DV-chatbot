import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    // Add additional authentication methods as needed
    // phone: true,
    // socialProviders: ['google', 'facebook']
  },
  // Optional: Configure multi-factor authentication
  multiFactor: {
    mode: 'OPTIONAL',
  },
  // Optional: Configure password policies
  passwordPolicy: {
    minLength: 8,
    requireNumbers: true,
    requireSpecialCharacters: true,
    requireUppercase: true,
    requireLowercase: true,
  },
});
