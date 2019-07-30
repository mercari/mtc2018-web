const NextI18Next = require('next-i18next').default

module.exports = new NextI18Next({
  defaultLanguage: 'en-US',
  otherLanguages: ['ja-JP'],
  localePath: 'locales',

  fallbackLng: 'en-US',
  ns: ['common'],
  defaultNS: 'common',
  debug: false, // process.env.NODE_ENV !== 'production',
  saveMissing: true,

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
    format: (value, format, lng) => {
      console.log('i18n', value, format, lng);
      if (format === 'uppercase') { return value.toUpperCase() }
      return value
    }
  }
})
