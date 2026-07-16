let socket = null;

let reconnectTimer = null;

let messageCallback = null;

let openCallback = null;

let closeCallback = null;


let manualDisconnect = false;



// =====================================
// SOCKET URL
// =====================================


function getSocketURL(){


    if(import.meta.env.VITE_WS_URL){


        return import.meta.env.VITE_WS_URL;


    }



    return "ws://localhost:5003";


}






// =====================================
// CONNECT
// =====================================


export function connectSocket(

    onMessage,

    onOpen,

    onClose

){



    messageCallback = onMessage;

    openCallback = onOpen;

    closeCallback = onClose;



    manualDisconnect=false;



    createConnection();


}







function createConnection(){



    const url=getSocketURL();



    console.log(

        "🔌 Connecting WebSocket:",

        url

    );




    socket=new WebSocket(url);






    socket.onopen=()=>{



        console.log(

            "✅ WebSocket Connected"

        );





        socket.send(

            JSON.stringify({

                type:"dashboard"

            })

        );





        if(openCallback)

            openCallback();



    };









    socket.onmessage=(event)=>{


        try{


            const message=

                JSON.parse(event.data);





            console.log(

                "📩 WS Message:",

                message

            );





            if(messageCallback)

                messageCallback(message);



        }

        catch(error){



            console.log(

                "❌ JSON Error:",

                error.message

            );


        }



    };










    socket.onerror=(error)=>{


        console.log(

            "❌ WebSocket Error",

            error

        );


    };








    socket.onclose=()=>{


        console.log(

            "❌ WebSocket Closed"

        );





        if(closeCallback)

            closeCallback();






        if(!manualDisconnect){


            reconnect();


        }



    };



}









// =====================================
// AUTO RECONNECT
// =====================================


function reconnect(){



    if(reconnectTimer)

        return;





    reconnectTimer=setTimeout(()=>{



        reconnectTimer=null;




        console.log(

            "🔄 Reconnecting..."

        );





        createConnection();




    },3000);



}










// =====================================
// SEND
// =====================================


export function sendMessage(message){



    console.log(

        "📤 Sending:",

        message

    );





    if(

        socket &&

        socket.readyState===WebSocket.OPEN

    ){



        socket.send(

            JSON.stringify(message)

        );


    }

    else{


        console.log(

            "⚠ WebSocket unavailable"

        );


    }



}









// =====================================
// DISCONNECT
// =====================================


export function disconnectSocket(){



    console.log(

        "🔌 Manual Disconnect"

    );




    manualDisconnect=true;





    if(reconnectTimer){


        clearTimeout(reconnectTimer);


        reconnectTimer=null;


    }






    if(socket){



        socket.close();


        socket=null;



    }



}