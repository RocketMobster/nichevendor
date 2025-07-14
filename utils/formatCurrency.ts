/**
 * Formats a number as a currency string
 * @param amount - The amount to format
 * @param currencyCode - ISO currency code (default: 'USD')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currencyCode: string = 'USD'
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}
