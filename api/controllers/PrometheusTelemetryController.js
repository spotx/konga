'use strict';
var _ = require('lodash');
var metrics = require("../../config/metrics");

var Prometheus = require("../services/PrometheusMetrics");
var memory = Prometheus.newGauge({
    name: "node_memory_usage",
    namespace: metrics.namespace,
    subsystem: metrics.subsystem,
    help: "The number of login attempts"
});

module.exports = _.merge(_.cloneDeep(require('../base/Controller')), {

    metrics: function (req, res) {
        var usage = process.memoryUsage();
        var memStats = Object.keys(usage);
        for (var i = 0, len = memStats.length; i < len; i++) {
            memory.set({
                label: memStats[i]
            }, usage[memStats[i]]);
        }

        Prometheus.metricsFunc()(req, res);
    }

});