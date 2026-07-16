import {

    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid

} from "recharts";

import { useDevices } from "../context/DeviceContext";

export default function TemperatureChart() {

    const { telemetry } = useDevices();

    const data = (telemetry.thermostat || [])

        .slice(-60)

        .map(item => ({

            time: new Date(item.timestamp).toLocaleTimeString(),

            temperature: Number(item.temperature || 0),

            humidity: Number(item.humidity || 0)

        }));

    return (

        <div className="chart-card">

            <h2>🌡 Temperature History</h2>

            {

                data.length === 0 ? (

                    <div className="chart-empty">

                        Waiting for telemetry...

                    </div>

                ) : (

                    <ResponsiveContainer

                        width="100%"

                        height={300}

                    >

                        <LineChart data={data}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis

                                dataKey="time"

                                minTickGap={40}

                            />

                            <YAxis

                                unit=" °C"

                            />

                            <Tooltip

                                formatter={(value, name) => {

                                    if (name === "temperature") {

                                        return [`${value} °C`, "Temperature"];

                                    }

                                    if (name === "humidity") {

                                        return [`${value} %`, "Humidity"];

                                    }

                                    return [value, name];

                                }}

                            />

                            <Line

                                type="monotone"

                                dataKey="temperature"

                                stroke="#00E5FF"

                                strokeWidth={3}

                                dot={false}

                                isAnimationActive={true}

                            />

                        </LineChart>

                    </ResponsiveContainer>

                )

            }

        </div>

    );

}