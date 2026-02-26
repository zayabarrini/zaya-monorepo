import type { IPaymentProvider, ICountryAdapter, IPaymentFactory, PaymentContext, PaymentMethod, CountrySpecificRule, Order, PaymentResult } from '@zaya/core';
import { StripeProvider } from '@zaya/stripe';
import { SwitzerlandAdapter } from '../adapters/SwitzerlandAdapter';
import { IndiaAdapter } from '../adapters/IndiaAdapter';
import { UKAdapter } from '../adapters/UKAdapter';
import { AustraliaAdapter } from '../adapters/AustraliaAdapter';

export class PaymentProviderFactory implements IPaymentFactory {
  private static instance: PaymentProviderFactory;
  private adapters: Map<string, ICountryAdapter> = new Map();
  private fallbackProvider: IPaymentProvider;

  private constructor() {
    this.fallbackProvider = new StripeProvider(process.env.STRIPE_SECRET_KEY || '');
    this.registerAdapters();
  }

  static getInstance(): PaymentProviderFactory {
    if (!PaymentProviderFactory.instance) {
      PaymentProviderFactory.instance = new PaymentProviderFactory();
    }
    return PaymentProviderFactory.instance;
  }

  private registerAdapters(): void {
    const adapters: ICountryAdapter[] = [
      new SwitzerlandAdapter(),
      new IndiaAdapter(),
      new UKAdapter(),
      new AustraliaAdapter()
    ];

    adapters.forEach(adapter => {
      this.adapters.set(adapter.countryCode, adapter);
    });
  }

  async getProvider(country: string): Promise<IPaymentProvider> {
    const adapter = this.adapters.get(country);
    
    if (adapter) {
      return {
        createPayment: async (order: Order): Promise<PaymentResult> => {
          try {
            return await adapter.provider.createPayment(order);
          } catch (error) {
            // Try fallback providers
            if (adapter.fallbackProviders?.length) {
              for (const fallback of adapter.fallbackProviders) {
                try {
                  return await fallback.createPayment(order);
                } catch (fallbackError) {
                  continue;
                }
              }
            }
            throw error;
          }
        },
        getSupportedMethods: async (context: PaymentContext): Promise<PaymentMethod[]> => {
          const methods = await adapter.provider.getSupportedMethods(context);
          
          // Apply country-specific rules
          if (adapter.rules) {
            return this.applyRules(methods, context, adapter.rules);
          }
          
          return methods;
        },
        getProviderConfig: () => adapter.provider.getProviderConfig()
      };
    }
    
    return this.fallbackProvider;
  }

  async getAdapter(country: string): Promise<ICountryAdapter | null> {
    return this.adapters.get(country) || null;
  }

  registerAdapter(adapter: ICountryAdapter): void {
    this.adapters.set(adapter.countryCode, adapter);
  }

  private applyRules(
    methods: PaymentMethod[], 
    context: PaymentContext, 
    rules: CountrySpecificRule[]
  ): PaymentMethod[] {
    let filtered = [...methods];
    
    rules.forEach(rule => {
      if (rule.condition(context)) {
        switch (rule.action) {
          case 'exclude':
            filtered = filtered.filter(m => !rule.methods?.includes(m.id));
            break;
          case 'include':
            // Add methods not already present
            rule.methods?.forEach(methodId => {
              if (!filtered.some(m => m.id === methodId)) {
                // Create a basic method entry
                filtered.push({
                  id: methodId,
                  type: 'stripe',
                  name: methodId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                  icon: `/icons/payment/${methodId}.svg`
                });
              }
            });
            break;
          case 'reorder':
            // Custom ordering logic - sort by priority
            filtered.sort((a, b) => {
              const aIndex = rule.methods?.indexOf(a.id) ?? -1;
              const bIndex = rule.methods?.indexOf(b.id) ?? -1;
              if (aIndex === -1 && bIndex === -1) return 0;
              if (aIndex === -1) return 1;
              if (bIndex === -1) return -1;
              return aIndex - bIndex;
            });
            break;
        }
      }
    });
    
    return filtered;
  }
}