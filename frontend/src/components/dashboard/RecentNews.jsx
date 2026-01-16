import PropTypes from 'prop-types'
import NewsItem from '../items/NewsItem'

const RecentNews = ({ news }) => {

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Recent News</h2>
      <div className="space-y-3">
        {news.slice(0, 5).map((item) => (
          <NewsItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

RecentNews.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      source: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired
    })
  ).isRequired
}

export default RecentNews
