import { helper } from '@ember/component/helper';

export default helper(function trendCardColor({ trend, isGreater }) {
  let sColorClass = 'bg-yellow-500';
  if (trend > 0) {
    if (isGreater) {
      sColorClass = 'bg-green-500';
    } else {
      sColorClass = 'bg-red-500';
    }
  } else {
    if (isGreater) {
      sColorClass = 'bg-red-500';
    } else {
      sColorClass = 'bg-green-500';
    }
  }
  return sColorClass;
});
