const WebSocket = require("ws");

const bridgeStore = require("../services/bridgeStore");
const dashboardStore = require("../services/dashboardStore");
const deviceStore = require("../services/deviceStore");
const telemetryService = require("../telemetry/telemetryService");



module.exports = function(server){


    const wss = new WebSocket.Server({
        server
    });



    console.log(
        "✅ WebSocket Server Started"
    );



    // =========================================
    // HEARTBEAT
    // =========================================

    const heartbeat = setInterval(()=>{


        wss.clients.forEach((socket)=>{


            if(socket.isAlive === false){

                return socket.terminate();

            }


            socket.isAlive = false;


            if(socket.readyState === WebSocket.OPEN){

                socket.ping();

            }


        });


    },30000);





    wss.on("connection",(socket)=>{


        console.log(
            "🔗 New WebSocket Connection"
        );


        socket.isAlive = true;



        socket.on("pong",()=>{

            socket.isAlive=true;

        });



        let client="";
        let bridgeId="";




        socket.on("message",(message)=>{


            try{


                const data =
                    JSON.parse(message);



                console.log(
                    "📥 Received:",
                    data
                );



                switch(data.type){



                    // =====================================
                    // LOCAL BRIDGE CONNECT
                    // =====================================

                    case "bridge":


                        client="bridge";

                        bridgeId=data.bridgeId;



                        bridgeStore.addBridge(

                            bridgeId,

                            socket,

                            {

                                ip:
                                socket._socket.remoteAddress

                            }

                        );



                        dashboardStore.broadcast({

                            type:"bridge",

                            connected:true,

                            bridgeId

                        });



                        console.log(

                            `🌉 Bridge Connected : ${bridgeId}`

                        );



                        break;





                    // =====================================
                    // DASHBOARD CONNECT
                    // =====================================

                    case "dashboard":


                        client="dashboard";



                        dashboardStore.addDashboard(
                            socket
                        );



                        console.log(
                            "🖥 Dashboard Connected"
                        );




                        socket.send(JSON.stringify({

                            type:"devices",

                            devices:
                            deviceStore.getDevices()

                        }));




                        socket.send(JSON.stringify({

                            type:"telemetry",

                            history:
                            telemetryService.allHistory()

                        }));




                        socket.send(JSON.stringify({

                            type:"bridge",

                            connected:
                            bridgeStore.hasBridge(
                                "lab001"
                            )

                        }));



                        break;







                    // =====================================
                    // DEVICE STATUS FROM BRIDGE
                    // =====================================

                    case "status":



                        bridgeStore.updateHeartbeat(
                            data.bridgeId
                        );




                        deviceStore.updateDevice(

                            data.deviceId,

                            data.payload

                        );




                        telemetryService.save(

                            data.deviceId,

                            data.payload

                        );




                        dashboardStore.broadcast({

                            type:"status",

                            deviceId:data.deviceId,

                            payload:data.payload

                        });



                        break;






                    // =====================================
                    // COMMAND FROM DASHBOARD
                    // =====================================

                    case "command":



                        console.log(
                            "📤 Device Command:",
                            data
                        );



                        const bridge =
                            bridgeStore.getBridge(
                                data.bridgeId
                            );




                        if(!bridge){


                            console.log(
                                "❌ Bridge Offline"
                            );


                            break;


                        }




                        if(
                            bridge.socket.readyState ===
                            WebSocket.OPEN
                        ){


                            bridge.socket.send(

                                JSON.stringify(data)

                            );


                            console.log(

                                "✅ Command Sent To Bridge"

                            );


                        }



                        break;






                    default:


                        console.log(

                            "⚠ Unknown Message Type"

                        );


                }



            }
            catch(error){


                console.log(
                    "❌ Message Error:",
                    error.message
                );


            }



        });








        socket.on("close",()=>{


            console.log(

                `❌ ${client} Disconnected`

            );



            if(client==="bridge"){


                bridgeStore.removeBridge(
                    bridgeId
                );



                dashboardStore.broadcast({

                    type:"bridge",

                    connected:false,

                    bridgeId

                });


            }





            if(client==="dashboard"){


                dashboardStore.removeDashboard(
                    socket
                );


            }



        });



    });







    wss.on("close",()=>{


        clearInterval(
            heartbeat
        );


    });



};