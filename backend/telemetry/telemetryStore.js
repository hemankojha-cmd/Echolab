// ==========================================
// TELEMETRY STORE
// ==========================================

const MAX_POINTS = 60;

// ==========================================
// HISTORY
// ==========================================

const history = {

    bulb: [],

    thermostat: [],

    door: [],

    camera: []

};

// ==========================================
// ADD TELEMETRY
// ==========================================

function add(deviceId, payload) {

    if (!history[deviceId]) {

        history[deviceId] = [];

    }

    history[deviceId].push({

        timestamp: Date.now(),

        ...payload

    });

    while (history[deviceId].length > MAX_POINTS) {

        history[deviceId].shift();

    }

}

// ==========================================
// GET DEVICE HISTORY
// ==========================================

function get(deviceId) {

    return [...(history[deviceId] || [])];

}

// ==========================================
// GET ALL HISTORY
// ==========================================

function getAll() {

    return {

        bulb: [...history.bulb],

        thermostat: [...history.thermostat],

        door: [...history.door],

        camera: [...history.camera]

    };

}

// ==========================================
// CLEAR DEVICE HISTORY
// ==========================================

function clear(deviceId) {

    if (history[deviceId]) {

        history[deviceId] = [];

    }

}

// ==========================================
// CLEAR ALL HISTORY
// ==========================================

function clearAll() {

    Object.keys(history).forEach(device => {

        history[device] = [];

    });

}

// ==========================================
// EXPORTS
// ==========================================

module.exports = {

    add,

    get,

    getAll,

    clear,

    clearAll

};