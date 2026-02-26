import type { ICountryAdapter } from '@zaya/core';
import { StripeProvider } from '@zaya/stripe';

export class SwitzerlandAdapter implements ICountryAdapter {
  countryCode = 'CH';
  priority = 1;
  provider: StripeProvider;
  fallbackProviders = [];

  constructor() {
    this.provider = new StripeProvider(process.env.STRIPE_SECRET_KEY || '');
  }

  rules = [
    {
      name: 'Swiss Franc Only',
      condition: (context) => context.currency !== 'CHF',
      action: 'exclude' as const,
      methods: ['card', 'apple_pay', 'google_pay']
    }
  ];
}