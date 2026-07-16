import AnalyticsCards from "./AnalyticsCards";

import CameraCard from "./cards/CameraCard";
import BulbCard from "./cards/BulbCard";
import ThermostatCard from "./cards/ThermostatCard";
import DoorCard from "./cards/DoorCard";

import DeviceHealth from "./DeviceHealth";
import BridgeStats from "./BridgeStats";
import BridgeStatus from "./BridgeStatus";
import ActivityLog from "./ActivityLog";

import LivePowerChart from "./LivePowerChart";
import TemperatureChart from "./TemperatureChart";
import EnergyChart from "./EnergyChart";

export default function Dashboard() {

    return (

        <main className="dashboard">

            {/* ==========================
                Analytics
            ========================== */}

            <AnalyticsCards />

            {/* ==========================
                Camera + Status
            ========================== */}

            <section className="top-grid">

                <CameraCard />

                <DeviceHealth />

                <BridgeStatus />

            </section>

            {/* ==========================
                Devices
            ========================== */}

            <section className="device-grid">

                <BulbCard />

                <ThermostatCard />

                <DoorCard />

                <BridgeStats />

            </section>

            {/* ==========================
                Charts
            ========================== */}

            <section className="chart-section">

                <LivePowerChart />

                <TemperatureChart />

                <EnergyChart />

            </section>

            {/* ==========================
                Activity
            ========================== */}

            <section className="activity-section">

                <ActivityLog />

            </section>

        </main>

    );

}