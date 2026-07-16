import { useEffect, useState } from "react";
import { useDevices } from "../context/DeviceContext";

export default function ActivityLog() {

    const {

        devices,

        bridgeConnected,

        commandStatus

    } = useDevices();

    const [logs, setLogs] = useState([]);

    function addLog(text) {

        setLogs(previous => [

            {

                id: Date.now() + Math.random(),

                time: new Date().toLocaleTimeString(),

                text

            },

            ...previous

        ].slice(0, 30));

    }

    // =====================================
    // BRIDGE
    // =====================================

    useEffect(() => {

        addLog(

            bridgeConnected

                ? "🌉 Bridge Connected"

                : "🌉 Bridge Disconnected"

        );

    }, [bridgeConnected]);

    // =====================================
    // BULB
    // =====================================

    useEffect(() => {

        addLog(

            `💡 Bulb ${

                devices.bulb?.status

                    ? "Turned ON"

                    : "Turned OFF"

            }`

        );

    }, [devices.bulb?.status]);

    // =====================================
    // THERMOSTAT
    // =====================================

    useEffect(() => {

        addLog(

            `🌡 Temperature set to ${

                devices.thermostat?.temperature

            } °C`

        );

    }, [devices.thermostat?.temperature]);

    // =====================================
    // DOOR
    // =====================================

    useEffect(() => {

        addLog(

            devices.door?.locked

                ? "🚪 Door Locked"

                : "🚪 Door Unlocked"

        );

    }, [devices.door?.locked]);

    // =====================================
    // CAMERA
    // =====================================

    useEffect(() => {

        if (devices.camera?.frame) {

            addLog("📷 Camera Frame Updated");

        }

    }, [devices.camera?.frame]);

    // =====================================
    // COMMAND STATUS
    // =====================================

    useEffect(() => {

        if (commandStatus) {

            addLog(`📤 ${commandStatus}`);

        }

    }, [commandStatus]);

    return (

        <div className="activity-card">

            <h2>Recent Activity</h2>

            {

                logs.length === 0

                    ? (

                        <p>

                            Waiting for device activity...

                        </p>

                    )

                    : (

                        logs.map(log => (

                            <p key={log.id}>

                                <strong>

                                    {log.time}

                                </strong>

                                {" - "}

                                {log.text}

                            </p>

                        ))

                    )

            }

        </div>

    );

}