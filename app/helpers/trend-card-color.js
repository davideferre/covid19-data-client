import { helper } from '@ember/component/helper';

export default helper(function trendCardColor([trend], { isGreater }) {
  let sColorClass = 'bg-yellow-700';
  if (trend > 0) {
    if (isGreater) {
      sColorClass = 'bg-green-700';
    } else {
      sColorClass = 'bg-red-700';
    }
  } else {
    if (trend < 0) {
      if (isGreater) {
        sColorClass = 'bg-red-700';
      } else {
        sColorClass = 'bg-green-700';
      }
    }
  }
  return sColorClass;
});
