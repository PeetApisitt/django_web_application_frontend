/**
 * Utility functions for formatting dates to Thai Buddhist Era (พ.ศ.) for UI display.
 * IMPORTANT: Use these functions ONLY for UI rendering.
 * Always keep API payloads and form state values in standard ISO 8601 (YYYY-MM-DD) format.
 */

function parseDateSafe(dateInput: string | Date): Date | null {
  if (dateInput instanceof Date) {
    return isNaN(dateInput.getTime()) ? null : dateInput;
  }

  const trimmed = dateInput.trim();
  // Match YYYY-MM-DD to avoid UTC-to-local timezone day shifts
  const isoDateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (isoDateMatch) {
    const year = Number(isoDateMatch[1]);
    const month = Number(isoDateMatch[2]) - 1;
    const day = Number(isoDateMatch[3]);
    return new Date(year, month, day);
  }

  const parsed = new Date(trimmed);
  return isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Formats an ISO date string (YYYY-MM-DD or ISO timestamp) or Date into Thai Buddhist Era (พ.ศ.)
 * using `toLocaleDateString('th-TH')`.
 */
export function formatThaiDate(
  dateInput?: string | Date | null,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
): string {
  if (!dateInput) return '-';
  const date = parseDateSafe(dateInput);
  if (!date) return String(dateInput);

  return date.toLocaleDateString('th-TH', options);
}

/**
 * Formats a start and optional end date range in Thai Buddhist Era (พ.ศ.).
 */
export function formatThaiDateRange(
  startDate?: string | null,
  endDate?: string | null,
  separator: string = ' - '
): string {
  if (!startDate) return '-';
  const formattedStart = formatThaiDate(startDate);
  if (!endDate || endDate === startDate) {
    return formattedStart;
  }
  const formattedEnd = formatThaiDate(endDate);
  return `${formattedStart}${separator}${formattedEnd}`;
}

/**
 * Formats an ISO timestamp into Thai Buddhist Era (พ.ศ.) date and time.
 */
export function formatThaiDateTime(dateInput?: string | Date | null): string {
  if (!dateInput) return '-';
  const date = parseDateSafe(dateInput);
  if (!date) return String(dateInput);

  const datePart = date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const timePart = date.toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${datePart} ${timePart} น.`;
}

/**
 * Converts a Common Era (ค.ศ.) year number to Buddhist Era (พ.ศ.).
 */
export function toBuddhistYear(ceYear: number): number {
  return ceYear + 543;
}

/**
 * Formats a year (CE) and month (1-12) into Thai month name and Buddhist Era year.
 */
export function formatThaiMonthYear(ceYear: number, month: number): string {
  const date = new Date(ceYear, month - 1, 1);
  return date.toLocaleDateString('th-TH', {
    month: 'long',
    year: 'numeric',
  });
}
