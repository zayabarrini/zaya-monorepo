export interface Order {
  id?: string;
  amount: number;
  currency: string;
  method: string;
  context: PaymentContext;
  metadata?: Record<string, any>;
}

export interface PaymentContext {
  country: string;
  currency: string;
  userAgent?: string;
  deviceType?: 'mobile' | 'desktop' | 'tablet';
  amount?: number;
  customerId?: string;
}

export interface PaymentMethod {
  id: string;
  type: string;
  name: string;
  icon?: string;
  minimumAmount?: number;
  maximumAmount?: number;
  processingTime?: string;
  fee?: number;
}

export interface PaymentResult {
  provider: string;
  paymentIntentId?: string;
  clientSecret?: string;
  status: string;
  redirectUrl?: string;
  metadata?: Record<string, any>;
}

export interface ProviderConfig {
  name: string;
  apiVersion?: string;
  webhookSecret?: string;
  supportedCountries: string[];
  supportedCurrencies: string[];
}