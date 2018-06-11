
module.exports = {
    enabled: process.env.ENABLE_TELEMETRY && (process.env.ENABLE_TELEMETRY === true || process.env.ENABLE_TELEMETRY == "true"),
    namespace: process.env.PROMETHEUS_NAMESPACE || "KONGA",
    subsystem: process.env.PROMETHEUS_SUBSYSTEM || "Gateway"
}