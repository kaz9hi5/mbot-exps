import log4js from 'log4js';

log4js.configure({
  appenders: { out: { type: 'stdout',
    layout: {
      type: 'pattern',
      pattern: '%d{MM/dd-hh:mm.ss} %p %m'
    }
  } },
  categories: { default: { appenders: ['out'], level: 'info' } },
});
export const logger = log4js.getLogger('mbot_exps');

export default logger;
