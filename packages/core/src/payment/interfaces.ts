import type { Order, PaymentContext, PaymentMethod, PaymentResult, ProviderConfig } from './types';

export interface IPaymentProvider {
  createPayment(order: Order): Promise<PaymentResult>;
  getSupportedMethods(context: PaymentContext): Promise<PaymentMethod[]>;
  getProviderConfig(): ProviderConfig;
  handleWebhook?(payload: any, signature?: string): Promise<void>;
}

export interface ICountryAdapter {
  countryCode: string;
  priority: number;
  provider: IPaymentProvider;
  fallbackProviders?: IPaymentProvider[];
  rules?: CountrySpecificRule[];
}

export interface CountrySpecificRule {
  name: string;
  condition: (context: PaymentContext) => boolean;
  action: 'include' | 'exclude' | 'reorder';
  methods?: string[];
}

export interface IPaymentFactory {
  getProvider(country: string): Promise<IPaymentProvider>;
  getAdapter(country: string): Promise<ICountryAdapter | null>;
  registerAdapter(adapter: ICountryAdapter): void;
}