import Stripe from 'stripe';
import type { 
  IPaymentProvider, 
  Order, 
  PaymentContext, 
  PaymentMethod, 
  PaymentResult,
  ProviderConfig 
} from '@zaya/core';

export class StripeProvider implements IPaymentProvider {
  private stripe: Stripe;
  private config: ProviderConfig;

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey, {
      apiVersion: '2025-02-24.acacia'
    });
    
    this.config = {
      name: 'Stripe',
      apiVersion: '2025-02-24.acacia',
      supportedCountries: ['US', 'GB', 'CA', 'AU', 'JP', 'SG', 'MX', 'BR', 'EU'],
      supportedCurrencies: ['USD', 'GBP', 'CAD', 'AUD', 'JPY', 'SGD', 'MXN', 'BRL', 'EUR']
    };
  }

  async createPayment(order: Order): Promise<PaymentResult> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(order.amount * 100), // Convert to cents
        currency: order.currency.toLowerCase(),
        payment_method_types: this.getPaymentMethodTypes(order.context),
        metadata: {
          country: order.context.country,
          orderId: order.id || 'temp',
          ...order.metadata
        }
      });

      return {
        provider: 'stripe',
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret || undefined,
        status: paymentIntent.status,
        metadata: paymentIntent.metadata
      };
    } catch (error) {
      throw new Error(`Stripe payment failed: ${error.message}`);
    }
  }

  async getSupportedMethods(context: PaymentContext): Promise<PaymentMethod[]> {
    const countryConfig = this.getCountryConfig(context.country);
    
    return countryConfig.methods.map(method => ({
      id: method,
      type: 'stripe',
      name: this.getDisplayName(method, context.country),
      icon: `/icons/payment/${method}.svg`,
      minimumAmount: this.getMinimumAmount(method),
      maximumAmount: this.getMaximumAmount(method)
    }));
  }

  getProviderConfig(): ProviderConfig {
    return this.config;
  }

  private getPaymentMethodTypes(context: PaymentContext): string[] {
    const baseMethods = ['card'];
    
    switch (context.country) {
      case 'GB':
        return [...baseMethods, 'bancontact', 'ideal', 'fpx'];
      case 'AU':
        return [...baseMethods, 'afterpay_clearpay'];
      case 'JP':
        return [...baseMethods, 'konbini'];
      case 'MX':
        return [...baseMethods, 'oxxo'];
      case 'BR':
        return [...baseMethods, 'boleto'];
      default:
        return baseMethods;
    }
  }

  private getCountryConfig(country: string) {
    const configs = {
      'US': { methods: ['card', 'apple_pay', 'google_pay'], currency: 'USD' },
      'GB': { methods: ['card', 'apple_pay', 'google_pay', 'bancontact', 'ideal'], currency: 'GBP' },
      'AU': { methods: ['card', 'apple_pay', 'google_pay', 'afterpay_clearpay'], currency: 'AUD' },
      'JP': { methods: ['card', 'konbini'], currency: 'JPY' },
      'default': { methods: ['card'], currency: 'USD' }
    };
    
    return configs[country] || configs.default;
  }

  private getDisplayName(method: string, country: string): string {
    const names = {
      'card': 'Credit/Debit Card',
      'apple_pay': 'Apple Pay',
      'google_pay': 'Google Pay',
      'afterpay_clearpay': country === 'US' ? 'Clearpay' : 'Afterpay',
      'bancontact': 'Bancontact',
      'ideal': 'iDEAL',
      'fpx': 'FPX',
      'konbini': 'Konbini',
      'oxxo': 'OXXO',
      'boleto': 'Boleto'
    };
    
    return names[method] || method;
  }

  private getMinimumAmount(method: string): number {
    const minimums = {
      'card': 0.50,
      'afterpay_clearpay': 35,
      'default': 1
    };
    return minimums[method] || minimums.default;
  }

  private getMaximumAmount(method: string): number {
    const maximums = {
      'card': 999999,
      'afterpay_clearpay': 2000,
      'default': 999999
    };
    return maximums[method] || maximums.default;
  }
}