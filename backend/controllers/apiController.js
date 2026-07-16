const deviceStore = require("../services/deviceStore");

// ==========================================
// HEALTH CHECK
// ==========================================

exports.health = (req, res) => {

    res.status(200).json({

        success: true,

        server: "EchoLab Cloud Backend",

        uptime: process.uptime(),

        timestamp: new Date().toISOString()

    });

};

// ==========================================
// GET ALL DEVICES
// ==========================================

exports.getDevices = (req, res) => {

    res.status(200).json({

        success: true,

        devices: deviceStore.getDevices()

    });

};