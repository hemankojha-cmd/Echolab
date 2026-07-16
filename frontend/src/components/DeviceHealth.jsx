import { useDevices } from "../context/DeviceContext";

export default function DeviceHealth() {

    const { devices } = useDevices();

    function formatTime(timestamp) {

        if (!timestamp) return "--";

        return new Date(timestamp).toLocaleTimeString();

    }

    return (

        <div className="health-card">

            <h2>Device Health</h2>

            <table>

                <thead>

                    <tr>

                        <th>Device</th>

                        <th>Status</th>

                        <th>Connection</th>

                        <th>Last Update</th>

                    </tr>

                </thead>

                <tbody>

                    <tr>

                        <td>💡 Bulb</td>

                        <td>

                            {

                                devices.bulb?.status

                                    ? "ON"

                                    : "OFF"

                            }

                        </td>

                        <td>

                            {

                                devices.bulb?.online

                                    ? "🟢 Online"

                                    : "🔴 Offline"

                            }

                        </td>

                        <td>

                            {formatTime(devices.bulb?.updatedAt)}

                        </td>

                    </tr>

                    <tr>

                        <td>🌡 Thermostat</td>

                        <td>

                            {devices.thermostat?.temperature} °C

                        </td>

                        <td>

                            {

                                devices.thermostat?.online

                                    ? "🟢 Online"

                                    : "🔴 Offline"

                            }

                        </td>

                        <td>

                            {formatTime(devices.thermostat?.updatedAt)}

                        </td>

                    </tr>

                    <tr>

                        <td>🚪 Door</td>

                        <td>

                            {

                                devices.door?.locked

                                    ? "Locked"

                                    : "Unlocked"

                            }

                        </td>

                        <td>

                            {

                                devices.door?.online

                                    ? "🟢 Online"

                                    : "🔴 Offline"

                            }

                        </td>

                        <td>

                            {formatTime(devices.door?.updatedAt)}

                        </td>

                    </tr>

                    <tr>

                        <td>📷 Camera</td>

                        <td>

                            {

                                devices.camera?.frame

                                    ? "Streaming"

                                    : "No Feed"

                            }

                        </td>

                        <td>

                            {

                                devices.camera?.online

                                    ? "🟢 Online"

                                    : "🔴 Offline"

                            }

                        </td>

                        <td>

                            {formatTime(devices.camera?.updatedAt)}

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    );

}