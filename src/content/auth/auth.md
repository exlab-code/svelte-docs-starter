# Authentication

Svelte Firekit provides a comprehensive authentication system through the `firekitAuth` singleton, offering various authentication methods and user management features.

## Basic Usage

```typescript
import { firekitAuth } from 'svelte-firekit';
```

## Authentication Methods

### Google Authentication

```typescript
await firekitAuth.signInWithGoogle();
```

### Email/Password Authentication

```typescript
// Sign in
await firekitAuth.signInWithEmail(email, password);

// Register
await firekitAuth.registerWithEmail(email, password, displayName);

// Sign out
await firekitAuth.logOut();
```

## User Management

### Password Management

```typescript
// Send password reset email
await firekitAuth.sendPasswordReset(email);

// Update password (requires reauthentication)
await firekitAuth.updateUserPassword(newPassword, currentPassword);
```

### Profile Management

```typescript
// Update user profile
await firekitAuth.updateUserProfile({
  displayName: "New Name",
  photoURL: "https://example.com/photo.jpg"
});
```

### Email Verification

```typescript
// Send verification email
await firekitAuth.sendEmailVerificationToUser();
```

### Account Deletion

```typescript
// Delete user account
await firekitAuth.deleteUserAccount();
```

## Automatic Firestore Integration

The authentication system automatically maintains a user document in Firestore with the following information:
- User ID
- Email
- Email verification status
- Display name
- Photo URL
- Authentication provider information
- Anonymous status

## Error Handling

All methods include proper error handling and return appropriate error messages. For example, password updates will return:

```typescript
{
  success: boolean;
  message: string;
  code?: string; // In case of errors
}
```

## Features

- 🔐 Multiple authentication providers
- 📝 Automatic user profile management
- 🔄 Password reset and update functionality
- ✉️ Email verification
- 🗑️ Account deletion
- 🔄 Reauthentication support
- 📚 Automatic Firestore user document management
- ⚡ Type-safe operations

## Important Notes

1. User data is automatically synchronized with Firestore
2. Password updates require current password verification
3. Account deletion removes both authentication and Firestore data
4. All operations are fully typed for TypeScript support

Would you like me to add more details about any particular aspect of the authentication system?