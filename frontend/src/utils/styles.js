/**
 * Get text color class based on value (positive/negative)
 * @param {number} value - The value to check
 * @returns {string} Tailwind CSS text color class
 */
export const getChangeColor = (value) => {
  return value >= 0 ? 'text-green-600' : 'text-red-600'
}

/**
 * Get background color class based on value (positive/negative)
 * @param {number} value - The value to check
 * @returns {string} Tailwind CSS background color class
 */
export const getChangeBgColor = (value) => {
  return value >= 0 ? 'bg-green-100' : 'bg-red-100'
}

/**
 * Get category badge style classes
 * @param {string} category - The category name
 * @returns {string} Tailwind CSS classes for the badge
 */
export const getCategoryStyle = (category) => {
  const styles = {
    critical: 'bg-red-100 text-red-700',
    technology: 'bg-blue-100 text-blue-700',
    crypto: 'bg-purple-100 text-purple-700',
    earnings: 'bg-green-100 text-green-700',
    regulatory: 'bg-yellow-100 text-yellow-700',
    market: 'bg-indigo-100 text-indigo-700',
    macro: 'bg-pink-100 text-pink-700'
  }
  return styles[category] || 'bg-gray-100 text-gray-700'
}

/**
 * Get severity badge style and border color
 * @param {string} severity - The severity level ('critical', 'high', 'medium', 'low')
 * @returns {object} Object with badge class and border color
 */
export const getSeverityStyle = (severity) => {
  const styles = {
    critical: {
      badge: 'bg-red-100 text-red-700',
      border: '#dc2626'
    },
    high: {
      badge: 'bg-orange-100 text-orange-700',
      border: '#f59e0b'
    },
    medium: {
      badge: 'bg-blue-100 text-blue-700',
      border: '#3b82f6'
    },
    low: {
      badge: 'bg-green-100 text-green-700',
      border: '#10b981'
    }
  }
  return styles[severity] || styles.low
}
