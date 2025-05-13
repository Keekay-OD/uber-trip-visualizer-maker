
/**
 * Format a number as a currency string
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

/**
 * Format a distance with miles unit
 */
export function formatDistance(distance: number): string {
  return `${distance.toFixed(1)} mi`;
}

/**
 * Format minutes into a time string
 */
export function formatTime(minutes: number): string {
  return `${minutes} min`;
}
