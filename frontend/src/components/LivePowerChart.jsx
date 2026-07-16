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

export default function LivePowerChart() {

    const { telemetry } = useDevices();

    const data = (telemetry.bulb || [])

        .slice(-60)

        .map(item => ({

            time: new Date(item.timestamp).toLocaleTimeString(),

            power: Number(item.power || 0)

        }));

    return (

        <div className="chart-card">

            <h2>⚡ Live Power Consumption</h2>

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

                                unit=" W"

                            />

                            <Tooltip

                                formatter={(value) => [

                                    `${value} W`,

                                    "Power"

                                ]}

                            />

                            <Line

                                type="monotone"

                                dataKey="power"

                                stroke="#FFD54F"

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