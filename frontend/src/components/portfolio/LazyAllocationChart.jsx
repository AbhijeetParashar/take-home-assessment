import { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import ChartSkeleton from "./ChartSkeleton";

const AllocationChart = lazy(() => import("./AllocationChart"));

const LazyAllocationChart = ({ holdings }) => {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <AllocationChart holdings={holdings} />
    </Suspense>
  );
};

LazyAllocationChart.propTypes = {
  holdings: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      currentValue: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default LazyAllocationChart;
