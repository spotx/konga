'use strict';
var _ = require('lodash');

var Prometheus = require("../services/PrometheusMetrics")

module.exports = _.merge(_.cloneDeep(require('../base/Controller')), {

    metrics: function (req, res) {
        Prometheus.metricsFunc()(req, res);
    }

});