
/**
 * Format a number as a currency string
 */
export function formatCurrency(amount: number, prefix: string = "$"): string {
  return prefix + amount.toFixed(2);
}

/**
 * Format a distance with kilometers unit
 */
export function formatDistance(distance: number): string {
  return `${distance.toFixed(1)} km`;
}

/**
 * Format minutes into a time string
 */
export function formatTime(minutes: number): string {
  return `${minutes} min`;
}
