// =========================================
// DEVICE STORE
// =========================================

const devices = {

    bulb: {

        status: false,

        online: false,

        voltage: 0,

        current: 0,

        power: 0,

        energy: 0,

        updatedAt: null

    },

    thermostat: {

        temperature: 24,

        humidity: 0,

        mode: "AUTO",

        online: false,

        updatedAt: null

    },

    door: {

        locked: true,

        battery: 100,

        online: false,

        updatedAt: null

    },

    camera: {

        frame: "",

        fps: 0,

        online: false,

        updatedAt: null

    }

};

// =========================================
// UPDATE DEVICE
// =========================================

function updateDevice(deviceId, payload) {

    if (!devices[deviceId]) {

        devices[deviceId] = {};

    }

    devices[deviceId] = {

        ...devices[deviceId],

        ...payload,

        updatedAt: Date.now()

    };

    console.log(
        `📦 ${deviceId.toUpperCase()} Updated`
    );

    console.table(devices[deviceId]);

}

// =========================================
// GET ONE DEVICE
// =========================================

function getDevice(deviceId) {

    return devices[deviceId];

}

// =========================================
// GET ALL DEVICES
// =========================================

function getDevices() {

    return devices;

}

// =========================================
// RESET DEVICE
// =========================================

function resetDevice(deviceId) {

    if (!devices[deviceId]) return;

    Object.keys(devices[deviceId]).forEach(key => {

        if (typeof devices[deviceId][key] === "boolean")
            devices[deviceId][key] = false;

        else if (typeof devices[deviceId][key] === "number")
            devices[deviceId][key] = 0;

        else
            devices[deviceId][key] = "";

    });

    devices[deviceId].updatedAt = Date.now();

}

// =========================================
// EXPORTS
// =========================================

module.exports = {

    updateDevice,

    getDevice,

    getDevices,

    resetDevice

};