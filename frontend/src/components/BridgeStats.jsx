import { useEffect, useState } from "react";

import { useDevices } from "../context/DeviceContext";

export default function BridgeStats() {

    const {

        bridgeConnected,

        socketConnected

    } = useDevices();

    const [uptime, setUptime] = useState(0);

    useEffect(() => {

        let timer;

        if (bridgeConnected) {

            timer = setInterval(() => {

                setUptime(previous => previous + 1);

            }, 1000);

        } else {

            setUptime(0);

        }

        return () => {

            if (timer) {

                clearInterval(timer);

            }

        };

    }, [bridgeConnected]);

    return (

        <div className="bridge-card">

            <h2>Bridge Statistics</h2>

            <p>

                Bridge :

                {

                    bridgeConnected

                        ? " 🟢 Connected"

                        : " 🔴 Offline"

                }

            </p>

            <p>

                Dashboard Socket :

                {

                    socketConnected

                        ? " 🟢 Connected"

                        : " 🔴 Disconnected"

                }

            </p>

            <p>

                Latency :

                {

                    bridgeConnected

                        ? "~20 ms"

                        : "--"

                }

            </p>

            <p>

                Messages/sec :

                {

                    bridgeConnected

                        ? "Live"

                        : "--"

                }

            </p>

            <p>

                Uptime : {uptime}s

            </p>

        </div>

    );

}