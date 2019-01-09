const Typograf = require('typograf')

const tp = new Typograf({ locale: ['en-GB', 'it', 'ru'] })
tp.enableRule('common/html/url')

module.exports = tp
