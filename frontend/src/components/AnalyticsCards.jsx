import { useDevices } from "../context/DeviceContext";

export default function AnalyticsCards() {

    const {

        devices,

        bridgeConnected,

        socketConnected

    } = useDevices();

    const bulb = devices.bulb || {};

    const thermostat = devices.thermostat || {};

    const door = devices.door || {};

    const power = Number(bulb.power || 0).toFixed(2);

    const voltage = Number(bulb.voltage || 0).toFixed(1);

    const energy = Number(bulb.energy || 0).toFixed(3);

    const temperature = Number(
        thermostat.temperature || 0
    ).toFixed(1);

    const humidity = Number(
        thermostat.humidity || 0
    ).toFixed(1);

    return (

        <div className="analytics-grid">

            <div className="stat-card">

                <h3>Cloud</h3>

                <h1>

                    {

                        socketConnected

                            ? "🟢 Connected"

                            : "🔴 Offline"

                    }

                </h1>

            </div>

            <div className="stat-card">

                <h3>Bridge</h3>

                <h1>

                    {

                        bridgeConnected

                            ? "🟢 Online"

                            : "🔴 Offline"

                    }

                </h1>

            </div>

            <div className="stat-card">

                <h3>Power</h3>

                <h1>{power} W</h1>

            </div>

            <div className="stat-card">

                <h3>Voltage</h3>

                <h1>{voltage} V</h1>

            </div>

            <div className="stat-card">

                <h3>Temperature</h3>

                <h1>{temperature} °C</h1>

            </div>

            <div className="stat-card">

                <h3>Humidity</h3>

                <h1>{humidity} %</h1>

            </div>

            <div className="stat-card">

                <h3>Energy</h3>

                <h1>{energy} kWh</h1>

            </div>

            <div className="stat-card">

                <h3>Door Battery</h3>

                <h1>{door.battery || 100}%</h1>

            </div>

        </div>

    );

}