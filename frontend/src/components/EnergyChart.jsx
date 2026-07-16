import {

    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid

} from "recharts";

import { useDevices } from "../context/DeviceContext";

export default function EnergyChart() {

    const { telemetry } = useDevices();

    const data = (telemetry.bulb || [])

        .slice(-60)

        .map(item => ({

            time: new Date(item.timestamp).toLocaleTimeString(),

            energy: Number(item.energy || 0)

        }));

    return (

        <div className="chart-card">

            <h2>🔋 Energy Consumption</h2>

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

                        <AreaChart data={data}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis

                                dataKey="time"

                                minTickGap={40}

                            />

                            <YAxis

                                unit=" kWh"

                            />

                            <Tooltip

                                formatter={(value) => [

                                    `${Number(value).toFixed(4)} kWh`,

                                    "Energy"

                                ]}

                            />

                            <Area

                                type="monotone"

                                dataKey="energy"

                                stroke="#4CAF50"

                                fill="#4CAF50"

                                fillOpacity={0.35}

                                strokeWidth={2}

                                isAnimationActive={true}

                            />

                        </AreaChart>

                    </ResponsiveContainer>

                )

            }

        </div>

    );

}