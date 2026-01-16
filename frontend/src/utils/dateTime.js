/**
 * Format a timestamp to relative time (e.g., "5m ago", "2h ago")
 * @param {string|Date} timestamp - The timestamp to format
 * @returns {string} Formatted relative time string
 */
export const formatRelativeTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`

  return date.toLocaleDateString()
}

/**
 * Format a date to a readable string
 * @param {string|Date} date - The date to format
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  }
  return new Date(date).toLocaleDateString('en-US', defaultOptions)
}
