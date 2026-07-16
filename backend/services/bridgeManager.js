// ==========================================
// BRIDGE STORE
// ==========================================

const bridges = new Map();

// ==========================================
// ADD BRIDGE
// ==========================================

function addBridge(id, socket, info = {}) {

    bridges.set(id, {

        id,

        socket,

        info,

        connectedAt: new Date(),

        lastSeen: new Date()

    });

    console.log(`✅ Bridge Connected : ${id}`);

}

// ==========================================
// REMOVE BRIDGE
// ==========================================

function removeBridge(id) {

    bridges.delete(id);

    console.log(`❌ Bridge Disconnected : ${id}`);

}

// ==========================================
// GET SINGLE BRIDGE
// ==========================================

function getBridge(id) {

    return bridges.get(id);

}

// ==========================================
// CHECK BRIDGE EXISTS
// ==========================================

function hasBridge(id) {

    return bridges.has(id);

}

// ==========================================
// UPDATE HEARTBEAT
// ==========================================

function updateHeartbeat(id) {

    const bridge = bridges.get(id);

    if (!bridge) return;

    bridge.lastSeen = new Date();

}

// ==========================================
// GET ALL BRIDGES
// ==========================================

function getAllBridges() {

    return Array.from(bridges.values()).map(bridge => ({

        id: bridge.id,

        info: bridge.info,

        connectedAt: bridge.connectedAt,

        lastSeen: bridge.lastSeen,

        online:

            bridge.socket &&

            bridge.socket.readyState === 1

    }));

}

// ==========================================
// GET BRIDGE COUNT
// ==========================================

function bridgeCount() {

    return bridges.size;

}

// ==========================================
// CLEAR ALL BRIDGES
// ==========================================

function clearBridges() {

    bridges.clear();

}

// ==========================================
// EXPORTS
// ==========================================

module.exports = {

    addBridge,

    removeBridge,

    getBridge,

    hasBridge,

    updateHeartbeat,

    getAllBridges,

    bridgeCount,

    clearBridges

};