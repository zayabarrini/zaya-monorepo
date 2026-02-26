export class PaymentError extends Error {
  constructor(
    message: string,
    public code: string,
    public provider?: string
  ) {
    super(message);
    this.name = 'PaymentError';
  }
}

export class ProviderNotFoundError extends PaymentError {
  constructor(country: string) {
    super(`No payment provider found for country: ${country}`, 'PROVIDER_NOT_FOUND');
  }
}

export class UnsupportedPaymentMethodError extends PaymentError {
  constructor(method: string, country: string) {
    super(`Payment method ${method} not supported in ${country}`, 'UNSUPPORTED_METHOD');
  }
}