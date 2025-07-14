# Contributing to NicheVendor CRM

Thank you for your interest in contributing to NicheVendor CRM! This document provides guidelines and instructions for contributing to the project.

## Development Setup

1. **Fork and clone the repository**

```bash
git clone https://github.com/yourusername/nichevendor.git
cd nichevendor
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

## Branching Strategy

- `main` - Production-ready code
- `develop` - Development branch for integration
- `feature/feature-name` - For new features
- `bugfix/bug-description` - For bug fixes

## Pull Request Process

1. Create a branch from `develop` for your changes
2. Implement your changes
3. Ensure code passes linting (`npm run lint`)
4. Push your branch and create a pull request against `develop`
5. Update the CHANGELOG.md with details of changes

## Versioning

We use [Semantic Versioning](https://semver.org/). The version bump script can be run with:

```bash
npm run version:bump [patch|minor|major]
```

## Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Write tests for new features
- Document complex logic

## License

By contributing, you agree that your contributions will be licensed under the project's license.
