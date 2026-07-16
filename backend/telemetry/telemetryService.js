const telemetryStore = require("./telemetryStore");

// ==========================================
// TELEMETRY SERVICE
// ==========================================

function save(deviceId, payload) {

    telemetryStore.add(deviceId, payload);

}

// ==========================================
// DEVICE HISTORY
// ==========================================

function history(deviceId) {

    return telemetryStore.get(deviceId);

}

// ==========================================
// ALL HISTORY
// ==========================================

function allHistory() {

    return telemetryStore.getAll();

}

// ==========================================
// CLEAR DEVICE HISTORY
// ==========================================

function clear(deviceId) {

    telemetryStore.clear(deviceId);

}

// ==========================================
// CLEAR ALL HISTORY
// ==========================================

function clearAll() {

    telemetryStore.clearAll();

}

// ==========================================
// EXPORTS
// ==========================================

module.exports = {

    save,

    history,

    allHistory,

    clear,

    clearAll

};