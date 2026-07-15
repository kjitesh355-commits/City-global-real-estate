export type CurrencyCode = "AED" | "USD" | "GBP" | "EUR" | "INR";

export interface Currency {
  code: CurrencyCode;
  name: string;
  symbol: string;
  flag: string;
  // Rates relative to AED (1 AED = X of this currency)
  rateFromAED: number;
}

export const currencies: Currency[] = [
  { code: "AED", name: "UAE Dirham", symbol: "AED", flag: "🇦🇪", rateFromAED: 1 },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸", rateFromAED: 0.2723 },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧", rateFromAED: 0.2152 },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", rateFromAED: 0.2511 },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳", rateFromAED: 23.08 },
];

export function convertFromAED(amountInAED: number, toCurrency: CurrencyCode): number {
  const currency = currencies.find(c => c.code === toCurrency);
  if (!currency) return amountInAED;
  return amountInAED * currency.rateFromAED;
}

export function formatPrice(amountInAED: number, toCurrency: CurrencyCode): string {
  const currency = currencies.find(c => c.code === toCurrency);
  if (!currency) return `AED ${amountInAED.toLocaleString()}`;

  const converted = convertFromAED(amountInAED, toCurrency);

  if (toCurrency === "AED") {
    if (converted >= 1000000) return `AED ${(converted / 1000000).toFixed(1)}M`;
    if (converted >= 1000) return `AED ${(converted / 1000).toFixed(0)}K`;
    return `AED ${converted.toLocaleString()}`;
  }

  if (converted >= 1000000) return `${currency.symbol}${(converted / 1000000).toFixed(1)}M`;
  if (converted >= 1000) return `${currency.symbol}${(converted / 1000).toFixed(0)}K`;
  return `${currency.symbol}${converted.toLocaleString()}`;
}

export function getCurrencyByCode(code: CurrencyCode): Currency | undefined {
  return currencies.find(c => c.code === code);
}
