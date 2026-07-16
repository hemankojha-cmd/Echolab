const WebSocket = require("ws");

const bridgeStore = require("../services/bridgeStore");
const dashboardStore = require("../services/dashboardStore");
const deviceStore = require("../services/deviceStore");
const telemetryService = require("../telemetry/telemetryService");

module.exports = function (server) {

    const wss = new WebSocket.Server({ server });

    console.log("✅ WebSocket Started");

    wss.on("connection", (socket) => {

        console.log("🔗 New WebSocket Connection");

        let bridgeId = "";
        let client = "";

        socket.on("message", (message) => {

            try {

                const data = JSON.parse(message);

                console.log("📥 Received:", data);

                switch (data.type) {

                    // =========================================
                    // BRIDGE CONNECTED
                    // =========================================

                    case "bridge":

                        client = "bridge";
                        bridgeId = data.bridgeId;

                        bridgeStore.addBridge(
                            bridgeId,
                            socket,
                            {
                                ip: socket._socket.remoteAddress
                            }
                        );

                        dashboardStore.broadcast({

                            type: "bridge",

                            connected: true,

                            bridgeId

                        });

                        console.log(`✅ Bridge Connected : ${bridgeId}`);

                        break;

                    // =========================================
                    // DASHBOARD CONNECTED
                    // =========================================

                    case "dashboard":

                        client = "dashboard";

                        dashboardStore.addDashboard(socket);

                        console.log("🖥 Dashboard Connected");

                        socket.send(JSON.stringify({

                            type: "devices",

                            devices: deviceStore.getDevices()

                        }));

                        socket.send(JSON.stringify({

                            type: "telemetry",

                            history: telemetryService.allHistory()

                        }));

                        socket.send(JSON.stringify({

                            type: "bridge",

                            connected: bridgeStore.hasBridge("lab001")

                        }));

                        break;

                    // =========================================
                    // STATUS FROM BRIDGE
                    // =========================================

                    case "status":

                        bridgeStore.updateHeartbeat(data.bridgeId);

                        console.log(

                            `📡 ${data.deviceId} Status`,

                            data.payload

                        );

                        deviceStore.updateDevice(

                            data.deviceId,

                            data.payload

                        );

                        telemetryService.save(

                            data.deviceId,

                            data.payload

                        );

                        dashboardStore.broadcast({

                            type: "status",

                            deviceId: data.deviceId,

                            payload: data.payload

                        });

                        break;

                    // =========================================
                    // COMMAND FROM DASHBOARD
                    // =========================================

                    case "command":

                        console.log("📤 Command");

                        console.log(data);

                        const bridge = bridgeStore.getBridge(

                            data.bridgeId

                        );

                        if (!bridge) {

                            console.log("❌ Bridge Not Found");

                            break;

                        }

                        if (

                            bridge.socket.readyState ===

                            WebSocket.OPEN

                        ) {

                            bridge.socket.send(

                                JSON.stringify(data)

                            );

                            console.log(

                                "✅ Command Forwarded"

                            );

                        }

                        break;

                    default:

                        console.log("⚠ Unknown Message");

                        console.log(data);

                }

            }

            catch (err) {

                console.log("❌ Invalid Message");

                console.log(err.message);

            }

        });

        socket.on("close", () => {

            console.log(`❌ ${client} Disconnected`);

            if (client === "bridge") {

                bridgeStore.removeBridge(bridgeId);

                dashboardStore.broadcast({

                    type: "bridge",

                    connected: false,

                    bridgeId

                });

            }

            if (client === "dashboard") {

                dashboardStore.removeDashboard(socket);

            }

        });

    });

};