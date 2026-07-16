require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");

const apiRoutes = require("./routes/apiRoutes");
const socketServer = require("./websocket/socketServer");

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ==========================================
// ROUTES
// ==========================================

app.use("/api", apiRoutes);

app.get("/", (req, res) => {

    res.json({

        success: true,

        server: "EchoLab IoT Cloud",

        websocket: "/",

        status: "Running"

    });

});

// ==========================================
// CREATE HTTP SERVER
// ==========================================

const server = http.createServer(app);

// ==========================================
// START WEBSOCKET
// ==========================================

socketServer(server);

// ==========================================
// START SERVER
// ==========================================

const PORT = process.env.PORT || 5003;

server.listen(PORT, () => {

    console.log("====================================");

    console.log("🚀 EchoLab Cloud Backend Started");

    console.log(`🌐 Port : ${PORT}`);

    console.log("📡 WebSocket : READY");

    console.log("====================================");

});