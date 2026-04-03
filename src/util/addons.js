/**
 * Parses a JSON string of add-ons into a JavaScript array.
 * @param {string} addOnsConfig - JSON string representing add-ons.
 * @returns {Array} Array of add-on objects.
 */
export const parseAddOnsConfig = addOnsConfig => {
  if (!addOnsConfig) return [];
  try {
    const parsed = JSON.parse(addOnsConfig);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to parse addOnsConfig:', e);
    return [];
  }
};
