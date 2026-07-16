import { DeviceProvider } from "./context/DeviceContext";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

import "./styles/app.css";
import "./styles/navbar.css";
import "./styles/dashboard.css";
import "./styles/cards.css";

export default function App() {
    return (
        <DeviceProvider>
            <div className="app">
                <Navbar />
                <Dashboard />
            </div>
        </DeviceProvider>
    );
}