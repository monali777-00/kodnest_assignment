/**
 * Extracts the numerical duration in months from a duration string.
 * Example: "3 Months" -> 3, "1 Month" -> 1, "Flexible" -> 0
 */
export function parseDurationMonths(durationStr: string): number {
  if (!durationStr) return 0;
  const match = durationStr.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Formats a numeric stipend to Indian Rupee (INR) format.
 * Example: 10000 -> "₹10,000"
 */
export function formatStipend(salaryVal: number): string {
  if (salaryVal === undefined || salaryVal === null) return 'Unspecified';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(salaryVal);
}

/**
 * Checks if the stipend is unpaid or has a value of 0.
 */
export function isUnpaid(salaryVal: number): boolean {
  return salaryVal === 0;
}
