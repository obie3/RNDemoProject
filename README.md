# React Native Production Demo

This repository demonstrates how I structure and maintain a production-style React Native application.

The goal of this project is not to build a feature-rich product, but to show clear architecture, defensive coding practices, and patterns I’ve used in real-world mobile applications.

## What this app does

A simple authenticated mobile app that allows a user to sign in, view a profile screen, and manage basic settings. The app handles network failures gracefully and persists sensitive data securely.

## Why this project exists

Most of my professional work has been on proprietary systems that cannot be shared publicly. This repository is a clean, IP-safe example of how I approach mobile application structure, state management, and reliability.

## Key focus areas

- Feature-based project structure
- Predictable state management
- Secure handling of sensitive data
- Error handling and defensive coding
- Production-minded folder organization

## Tech stack

- React Native
- TypeScript
- Redux Toolkit
- React Navigation
- Secure storage abstraction
- REST-style API client

## Project structure

- `features/` – feature-first organization (auth, profile, settings)
- `services/` – API client, secure storage, analytics
- `utils/` – logging and error handling
- `tests/` – basic unit tests for critical logic
- `components/` – basic elements used to the app functional

## Security notes

Sensitive values are never stored in plain AsyncStorage. A simple secure storage abstraction is used to reflect how secrets are handled in production apps.

## Running locally

```bash
git clone https://github.com/obie3/RNDemoProject.git
cd RNDemoProject
npm install
npx yarn start
```
