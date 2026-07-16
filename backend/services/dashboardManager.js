// =========================================
// DASHBOARD MANAGER
// =========================================

const WebSocket = require("ws");

const dashboards = new Set();

// =========================================
// ADD DASHBOARD
// =========================================

function addDashboard(socket) {

    dashboards.add(socket);

    console.log(`🖥 Dashboard Connected (${dashboards.size})`);

}

// =========================================
// REMOVE DASHBOARD
// =========================================

function removeDashboard(socket) {

    dashboards.delete(socket);

    console.log(`❌ Dashboard Disconnected (${dashboards.size})`);

}

// =========================================
// BROADCAST TO ALL DASHBOARDS
// =========================================

function broadcast(data) {

    const payload = JSON.stringify(data);

    dashboards.forEach(socket => {

        if (socket.readyState === WebSocket.OPEN) {

            try {

                socket.send(payload);

            } catch (err) {

                console.log("❌ Dashboard Send Error:", err.message);

                dashboards.delete(socket);

            }

        } else {

            dashboards.delete(socket);

        }

    });

}

// =========================================
// DASHBOARD COUNT
// =========================================

function dashboardCount() {

    return dashboards.size;

}

// =========================================
// GET DASHBOARDS
// =========================================

function getDashboards() {

    return [...dashboards];

}

// =========================================
// EXPORTS
// =========================================

module.exports = {

    addDashboard,
    removeDashboard,
    broadcast,
    dashboardCount,
    getDashboards

};