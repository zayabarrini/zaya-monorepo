// packages/country-adapters/src/index.ts

// Re-export everything from your adapters
export * from './adapters/AustraliaAdapter';
export * from './adapters/IndiaAdapter';
export * from './adapters/SwitzerlandAdapter';
export * from './adapters/UKAdapter';

// Export the factory
export { PaymentProviderFactory } from './factory/PaymentProviderFactory';

// Export any types that might be needed
