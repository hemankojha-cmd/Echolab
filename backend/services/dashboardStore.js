const WebSocket = require("ws");

// ==========================================
// DASHBOARD STORE
// ==========================================

const dashboards = new Set();

// ==========================================
// ADD DASHBOARD
// ==========================================

function addDashboard(socket) {

    dashboards.add(socket);

    console.log(`🖥 Dashboard Connected (${dashboards.size} Total)`);

}

// ==========================================
// REMOVE DASHBOARD
// ==========================================

function removeDashboard(socket) {

    dashboards.delete(socket);

    console.log(`❌ Dashboard Disconnected (${dashboards.size} Remaining)`);

}

// ==========================================
// BROADCAST MESSAGE
// ==========================================

function broadcast(data) {

    const payload = JSON.stringify(data);

    dashboards.forEach(socket => {

        if (socket.readyState === WebSocket.OPEN) {

            socket.send(payload);

        } else {

            dashboards.delete(socket);

            console.log("⚠ Removed Dead Dashboard Connection");

        }

    });

}

// ==========================================
// GET DASHBOARD COUNT
// ==========================================

function count() {

    return dashboards.size;

}

// ==========================================
// CHECK DASHBOARD CONNECTIONS
// ==========================================

function hasDashboards() {

    return dashboards.size > 0;

}

// ==========================================
// EXPORTS
// ==========================================

module.exports = {

    addDashboard,

    removeDashboard,

    broadcast,

    count,

    hasDashboards

};