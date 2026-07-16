const bridges = new Map();

// =========================================
// ADD BRIDGE
// =========================================

function addBridge(id, socket) {

    bridges.set(id, socket);

    console.log(`✅ Bridge Connected : ${id}`);

}

// =========================================
// REMOVE BRIDGE
// =========================================

function removeBridge(id) {

    bridges.delete(id);

    console.log(`❌ Bridge Disconnected : ${id}`);

}

// =========================================
// GET BRIDGE
// =========================================

function getBridge(id) {

    return bridges.get(id);

}

// =========================================
// CHECK BRIDGE EXISTS
// =========================================

function hasBridge(id) {

    return bridges.has(id);

}

// =========================================
// GET ALL BRIDGES
// =========================================

function getAllBridges() {

    return Array.from(bridges.keys());

}

// =========================================
// BRIDGE COUNT
// =========================================

function bridgeCount() {

    return bridges.size;

}

// =========================================
// EXPORTS
// =========================================

module.exports = {

    addBridge,

    removeBridge,

    getBridge,

    hasBridge,

    getAllBridges,

    bridgeCount

};