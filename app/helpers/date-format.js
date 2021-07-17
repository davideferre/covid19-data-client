import Helper from '@ember/component/helper';

export default class DateFormat extends Helper {
  compute([date], { language, type }) {
    let _sLanguage = language || navigator.language;
    let _oDate = new Date(date);
    if (!(_oDate instanceof Date && !isNaN(_oDate))) {
      return '';
    }
    let _oType = type || 'date';
    let _oFormatter;
    if (_oType === 'datetime') {
      _oFormatter = new Intl.DateTimeFormat(_sLanguage, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      });
    } else {
      _oFormatter = new Intl.DateTimeFormat(_sLanguage, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }
    return _oFormatter.format(_oDate);
  }
}
