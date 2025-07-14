# NicheVendor CRM Documentation Guide

This guide outlines the documentation standards for the NicheVendor CRM project. Consistent documentation improves code readability, maintainability, and onboarding for new team members.

## Documentation Standards

### File Headers

Every file should start with a JSDoc header describing its purpose:

```typescript
/**
 * @file ComponentName.tsx
 * @description Brief description of what this file contains and its purpose.
 * Include any important context about how it fits into the application.
 */
```

### Components

All React components should be documented:

```typescript
/**
 * Brief description of the component's purpose and functionality
 * @param {PropType} props - Component props
 * @returns {JSX.Element} Brief description of what's returned
 */
const ComponentName = ({ prop1, prop2 }: PropType) => {
  // Component implementation
};
```

### Interfaces and Types

All interfaces and types should be documented:

```typescript
/**
 * Interface description
 * @interface InterfaceName
 * @property {type} propertyName - Description of what this property is for
 * @property {type} [optionalProp] - Description of optional property
 */
interface ExampleInterface {
  propertyName: string;
  optionalProp?: number;
}
```

### Functions and Methods

All functions should have proper documentation:

```typescript
/**
 * Brief description of what this function does
 * @param {Type} param - Description of parameter
 * @returns {ReturnType} Description of what's returned
 * @throws {ErrorType} When this error might be thrown (if applicable)
 */
function exampleFunction(param: Type): ReturnType {
  // Function implementation
}
```

### Context Providers

Context providers should document their purpose and the data they provide:

```typescript
/**
 * Provider component that wraps the application and provides app data state
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to wrap with context
 * @returns {JSX.Element} Context provider component
 */
```

## Documentation Tools

We use ESLint with the JSDoc plugin to enforce documentation standards. The configuration can be found in `.eslintrc.json`.

To check documentation issues:

```bash
npm run lint
```

## When to Document

- **Always document** when creating new components, functions, interfaces, or files
- **Always update documentation** when changing the behavior or parameters of existing code
- **Use inline comments** for complex business logic or non-obvious implementations

## Additional Guidelines

1. Use clear, concise language
2. Explain "why" in addition to "what" for complex logic
3. Include examples for particularly complex functions
4. Keep documentation up-to-date when refactoring code
5. Document known limitations or edge cases

Following these guidelines ensures that our codebase remains maintainable as it grows.
