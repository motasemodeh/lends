/**
 * Helpers for the optional start time a customer can propose when booking
 * a day/night listing (e.g. a photo session sold at a flat daily rate).
 * Values are stored as "HH:mm" (24-hour) strings.
 */

/**
 * Format "14:30" as "2:30 PM". Returns the input unchanged if it can't be parsed.
 *
 * @param {string} value "HH:mm"
 * @returns {string}
 */
export const formatStartTimeLabel = value => {
  const [h, m] = (value || '').split(':').map(n => parseInt(n, 10));
  if (isNaN(h) || isNaN(m)) {
    return value;
  }
  const period = h < 12 ? 'AM' : 'PM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
};

/**
 * Start time options in 30 minute steps, from firstHour:00 to lastHour:00.
 *
 * @param {number} firstHour
 * @param {number} lastHour
 * @returns {Array<{ value: string, label: string }>}
 */
export const getStartTimeOptions = (firstHour = 6, lastHour = 22) => {
  const options = [];
  for (let h = firstHour; h <= lastHour; h++) {
    for (const m of [0, 30]) {
      if (h === lastHour && m > 0) {
        continue;
      }
      const value = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      options.push({ value, label: formatStartTimeLabel(value) });
    }
  }
  return options;
};

/**
 * Combine the requested start time and the customer's message into the first message
 * the provider sees.
 *
 * @param {string} requestedStartTime "HH:mm" or empty
 * @param {string} message customer's own message, may be empty
 * @returns {string} combined message (empty string if neither is given)
 */
export const withRequestedStartTime = (requestedStartTime, message) => {
  const startTimeLine = requestedStartTime
    ? `Requested start time: ${formatStartTimeLabel(requestedStartTime)}`
    : null;
  return [startTimeLine, message?.trim() ? message : null].filter(Boolean).join('\n\n');
};
