/**
 * Format a number as currency (USD)
 * @param {number} value - The value to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

/**
 * Format a number as percentage with sign
 * @param {number} value - The value to format
 * @returns {string} Formatted percentage string (e.g., "+5.25%" or "-3.42%")
 */
export const formatPercentage = (value) => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}

/**
 * Format a large number with abbreviations (K, M, B)
 * @param {number} value - The value to format
 * @returns {string} Formatted number string (e.g., "1.5K", "2.3M")
 */
export const formatNumber = (value) => {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(1)}B`
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M`
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(1)}K`
  }
  return value.toFixed(0)
}

/**
 * Capitalize the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} String with first letter capitalized
 */
export const capitalizeFirst = (str) => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
