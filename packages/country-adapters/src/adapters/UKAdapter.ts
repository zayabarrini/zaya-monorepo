import type { ICountryAdapter, PaymentContext, PaymentMethod } from '@zaya/core';
import { StripeProvider } from '@zaya/stripe';

export class UKAdapter implements ICountryAdapter {
  countryCode = 'GB';
  priority = 1;
  provider: StripeProvider;
  fallbackProviders = [];

  constructor() {
    this.provider = new StripeProvider(process.env.STRIPE_SECRET_KEY || '');
  }

  rules = [
    {
      name: 'UK Specific Methods',
      condition: (context: PaymentContext) => true,
      action: 'include' as const,
      methods: ['bancontact', 'ideal', 'fpx']
    }
  ];

  async getSupportedMethods(context: PaymentContext): Promise<PaymentMethod[]> {
    const methods = await this.provider.getSupportedMethods(context);
    
    // Add UK-specific payment methods
    return [
      ...methods,
      {
        id: 'uk_direct_debit',
        type: 'direct_debit',
        name: 'UK Direct Debit',
        icon: '/icons/payment/direct-debit.svg',
        processingTime: '3-5 business days'
      }
    ];
  }
}