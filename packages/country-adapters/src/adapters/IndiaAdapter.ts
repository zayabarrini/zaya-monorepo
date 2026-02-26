import type { ICountryAdapter } from '@zaya/core';
import { StripeProvider } from '@zaya/stripe';

export class IndiaAdapter implements ICountryAdapter {
  countryCode = 'IN';
  priority = 1;
  provider: StripeProvider;
  fallbackProviders = [];

  constructor() {
    this.provider = new StripeProvider(process.env.STRIPE_SECRET_KEY || '');
  }

  async getSupportedMethods(context) {
    const methods = await this.provider.getSupportedMethods(context);
    
    // India-specific methods will be added when you integrate Razorpay/CCAvenue
    return methods;
  }
}