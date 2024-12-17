---
slug: docs
title: Welcome to Svelte Firekit
description: a comprehensive library integrating SvelteKit and Firebase for building robust micro SaaS applications.
---

## Introduction to Svelte Firekit

Svelte Firekit is a powerful Firebase toolkit for SvelteKit applications, providing a comprehensive set of utilities, stores, and components for seamless Firebase integration. Whether you're building a micro SaaS, web application, or any Firebase-powered project, Svelte Firekit streamlines your development process.

## Installation

```bash
npm install firebase svelte-firekit
```

## Configuration

Svelte Firekit automatically manages your Firebase configuration through environment variables. Create a `.env` file in your project root with the following variables:

```env
PUBLIC_FIREBASE_API_KEY=your_api_key
PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
PUBLIC_FIREBASE_PROJECT_ID=your_project_id
PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
PUBLIC_FIREBASE_APP_ID=your_app_id
PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

The configuration is automatically handled by Firekit - no manual setup required. If any required environment variables are missing, Firekit will throw a helpful error indicating which variables need to be set.

## Usage Example

Here's a simple example showing how to display the current user's name:

```svelte
<script>
  import { firekitUser } from 'svelte-firekit';
</script>

Hello {firekitUser.displayName}
```

The `firekitUser` store provides access to the current user's information and authentication state.

## Core Features

### 🔥 Firebase Integration
- Zero-config Firebase setup through environment variables
- Automatic initialization and app management
- Built-in error handling and connection state management
- Type-safe configuration management

### 🔐 Authentication
- Complete authentication system with built-in components
- Support for multiple authentication providers:
  - Email/Password
  - Google
  - GitHub
  - Custom providers
- User state management and persistence through `firekitUser` store

### 📚 Firestore Integration
- Reactive data stores for real-time updates
- Simplified CRUD operations
- Batch operations and transactions
- Type-safe document references
- Automatic data serialization/deserialization

### 📦 Storage Management
- File upload and download utilities
- Progress tracking and status updates
- Storage security rules helpers
- Image optimization utilities

### ⚡ Server-Side Rendering
- Full SSR compatibility
- Hydration support
- Server-side data fetching
- SEO-friendly rendering

### 🎯 Type Safety
- Built with TypeScript
- Complete type definitions
- Intelligent autocomplete
- Runtime type checking
- Type-safe Firestore operations

## Why Svelte Firekit?

- **Zero Configuration**: Automatic Firebase setup through environment variables
- **Type Safety**: Full TypeScript support with built-in type checking
- **Rapid Development**: Get your Firebase-powered SvelteKit application up and running in minutes
- **Best Practices**: Built following Firebase and SvelteKit best practices
- **Production Ready**: Battle-tested in production environments
- **Active Community**: Regular updates and active community support
- **Extensible**: Easy to customize and extend for your specific needs

## Next Steps

- Check out our [Getting Started](/getting-started) guide
- Explore the [API Reference](/api)
- View [Examples](/examples)
- Join our [Community](/community)

## Contributing

We welcome contributions! Please see our [Contributing Guide](/contributing) for more details.

## License

Svelte Firekit is released under the MIT License. See the [LICENSE](/license) file for more details.