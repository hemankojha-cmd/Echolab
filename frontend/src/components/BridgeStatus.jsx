import { useDevices } from "../context/DeviceContext";

export default function BridgeStatus() {

    const {

        bridgeConnected,

        socketConnected,

        commandStatus

    } = useDevices();

    return (

        <div className="bridge-status-card">

            <h2>Bridge Status</h2>

            <div className="bridge-status-row">

                <span>Cloud Socket</span>

                <span
                    style={{
                        color: socketConnected ? "#4CAF50" : "#F44336",
                        fontWeight: "bold"
                    }}
                >
                    {socketConnected ? "🟢 Connected" : "🔴 Disconnected"}
                </span>

            </div>

            <div className="bridge-status-row">

                <span>IoT Bridge</span>

                <span
                    style={{
                        color: bridgeConnected ? "#4CAF50" : "#F44336",
                        fontWeight: "bold"
                    }}
                >
                    {bridgeConnected ? "🟢 Online" : "🔴 Offline"}
                </span>

            </div>

            <div className="bridge-status-row">

                <span>Last Action</span>

                <span>

                    {commandStatus || "Waiting..."}

                </span>

            </div>

        </div>

    );

}