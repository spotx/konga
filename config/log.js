'use strict';

/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * http://sailsjs.org/#/documentation/concepts/Logging
 */

/***************************************************************************
 *                                                                          *
 * Valid `level` configs: i.e. the minimum log level to capture with        *
 * sails.log.*()                                                            *
 *                                                                          *
 * The order of precedence for log levels from lowest to highest is:        *
 * silly, verbose, info, debug, warn, error                                 *
 *                                                                          *
 * You may also set the level to "silent" to suppress all logs.             *
 *                                                                          *
 ***************************************************************************/
var log = {
  level: 'info',
  filePath: process.env.KONGA_LOG_FILE || 'logs/application.log'
};

if (process.env.KONGA_JSON_LOG && (process.env.KONGA_JSON_LOG === true || process.env.KONGA_JSON_LOG == "true")) {
  var winston = require('winston');
  var customLogger = new winston.Logger();

  // A console transport logging debug and above.
  customLogger.add(winston.transports.Console, {
    json: true
  });

  if (log.filePath) {
    // A file based transport logging only errors formatted as json.
    customLogger.add(winston.transports.File, {
      filename: log.filePath,
      json: true
    });
  }

  log.custom = customLogger;
  log.inspect = false;
}

module.exports.log = log;
