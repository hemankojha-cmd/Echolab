import { useEffect, useState } from "react";
import { useDevices } from "../context/DeviceContext";

export default function Navbar() {

    const {

        bridgeConnected,

        socketConnected,

        commandStatus

    } = useDevices();

    const [time, setTime] = useState(new Date());

    useEffect(() => {

        const timer = setInterval(() => {

            setTime(new Date());

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    return (

        <header className="navbar">

            <div className="navbar-left">

                <div className="logo">

                    ☁

                </div>

                <div>

                    <h1>EchoLab IoT Cloud</h1>

                    <p>

                        Real-Time Device Monitoring & Control

                    </p>

                </div>

            </div>

            <div className="navbar-right">

                <div className="time-card">

                    🕒 {time.toLocaleTimeString()}

                </div>

                <div

                    className={
                        socketConnected
                            ? "bridge connected"
                            : "bridge disconnected"
                    }

                >

                    <span className="pulse"></span>

                    {socketConnected

                        ? "Cloud Connected"

                        : "Cloud Offline"}

                </div>

                <div

                    className={
                        bridgeConnected
                            ? "bridge connected"
                            : "bridge disconnected"
                    }

                >

                    <span className="pulse"></span>

                    {bridgeConnected

                        ? "Bridge Connected"

                        : "Bridge Offline"}

                </div>

                <div className="command-status">

                    {commandStatus || "System Ready"}

                </div>

            </div>

        </header>

    );

}