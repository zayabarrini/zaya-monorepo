import type { ICountryAdapter, PaymentContext, PaymentMethod } from '@zaya/core';
import { StripeProvider } from '@zaya/stripe';

export class AustraliaAdapter implements ICountryAdapter {
  countryCode = 'AU';
  priority = 1;
  provider: StripeProvider;
  fallbackProviders = [];

  constructor() {
    this.provider = new StripeProvider(process.env.STRIPE_SECRET_KEY || '');
  }

  rules = [
    {
      name: 'Afterpay Only for AU',
      condition: (context: PaymentContext) => context.currency === 'AUD',
      action: 'include' as const,
      methods: ['afterpay_clearpay']
    }
  ];

  async getSupportedMethods(context: PaymentContext): Promise<PaymentMethod[]> {
    const methods = await this.provider.getSupportedMethods(context);
    
    // Add Australia-specific payment methods
    return [
      ...methods,
      {
        id: 'afterpay_clearpay',
        type: 'bnpl',
        name: 'Afterpay',
        icon: '/icons/payment/afterpay.svg',
        minimumAmount: 35,
        maximumAmount: 2000,
        processingTime: 'Instant'
      }
    ];
  }
}