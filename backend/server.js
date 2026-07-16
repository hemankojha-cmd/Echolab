require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");

const apiRoutes = require("./routes/apiRoutes");
const socketServer = require("./websocket/socketServer");

const app = express();


// ==========================================
// CORS CONFIGURATION
// ==========================================

const allowedOrigins = [

    "https://echolab-t461.onrender.com",

    "http://localhost:5173",

    "http://localhost:3000"

];


app.use(

    cors({

        origin:function(origin,callback){

            // allow requests without origin
            // (Postman, mobile apps, etc.)

            if(!origin){

                return callback(null,true);

            }


            if(
                allowedOrigins.includes(origin)
            ){

                return callback(null,true);

            }


            return callback(
                new Error("Not allowed by CORS")
            );

        },

        credentials:true

    })

);



// ==========================================
// BODY PARSER
// ==========================================

app.use(express.json());

app.use(
    express.urlencoded({
        extended:true
    })
);




// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/health",(req,res)=>{

    res.json({

        status:"OK",

        service:"EchoLab IoT Backend",

        time:new Date()

    });

});




// ==========================================
// API ROUTES
// ==========================================

app.use(
    "/api",
    apiRoutes
);




// ==========================================
// ROOT ROUTE
// ==========================================

app.get("/",(req,res)=>{


    res.json({

        success:true,

        server:"EchoLab IoT Cloud",

        status:"Running",

        websocket:"Active"

    });


});





// ==========================================
// HTTP SERVER
// ==========================================

const server = http.createServer(app);




// ==========================================
// WEBSOCKET SERVER
// ==========================================

socketServer(server);




// ==========================================
// START SERVER
// ==========================================

const PORT = process.env.PORT || 5003;


server.listen(PORT,()=>{


    console.log(
        "===================================="
    );


    console.log(
        "🚀 EchoLab Cloud Backend Started"
    );


    console.log(
        `🌐 Port : ${PORT}`
    );


    console.log(
        "📡 WebSocket : READY"
    );


    console.log(
        "===================================="
    );


});