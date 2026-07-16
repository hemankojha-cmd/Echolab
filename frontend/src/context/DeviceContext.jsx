import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";


import {

    connectSocket,

    sendMessage,

    disconnectSocket

} from "../services/websocket";



const DeviceContext = createContext();



const MAX_HISTORY = 60;



export function DeviceProvider({children}){



const [devices,setDevices] = useState({


    bulb:{
        status:false,
        online:false
    },


    thermostat:{
        temperature:24,
        online:false
    },


    door:{
        locked:true,
        online:false
    },


    camera:{
        frame:"",
        online:false
    }


});






const [telemetry,setTelemetry]=useState({

    bulb:[],
    thermostat:[],
    door:[]

});






const [bridgeConnected,setBridgeConnected]=useState(false);



const [socketConnected,setSocketConnected]=useState(false);



const [commandStatus,setCommandStatus]=useState("");








useEffect(()=>{



connectSocket(


(message)=>{



console.log(
"📩 Context:",
message
);




switch(message.type){



case "devices":



setDevices(prev=>({

    ...prev,

    ...message.devices

}));


break;






case "status":



updateDevice(

message.deviceId,

message.payload

);


break;






case "bridge":



setBridgeConnected(

message.connected

);


break;





case "socket":


setSocketConnected(

message.connected

);


break;






default:


console.log(
"Unknown message",
message
);



}




},




()=>{


setSocketConnected(true);


},





()=>{


setSocketConnected(false);


}





);






return ()=>{


disconnectSocket();


};



},[]);









function updateDevice(deviceId,payload){





setDevices(prev=>({


    ...prev,


    [deviceId]:{


        ...(prev[deviceId] || {}),


        ...payload


    }



}));






// do not store camera telemetry


if(deviceId==="camera")
    return;






setTelemetry(prev=>{



const history=[


...(prev[deviceId] || []),



{

timestamp:Date.now(),

...payload

}


];





while(history.length>MAX_HISTORY)

{

history.shift();

}





return{


...prev,


[deviceId]:history


};



});







setCommandStatus(

`${deviceId} updated`

);



}









function sendCommand(deviceId,data){



if(!bridgeConnected){


setCommandStatus(
"Bridge offline"
);


return;


}






const command={



type:"command",


bridgeId:"lab001",


deviceId,


...data



};






console.log(

"📤 Sending Command",

command

);





setCommandStatus(

`Sending ${deviceId}`

);






sendMessage(command);



}







return(



<DeviceContext.Provider


value={{


devices,


telemetry,


bridgeConnected,


socketConnected,


commandStatus,


sendCommand


}}



>


{children}



</DeviceContext.Provider>



);




}







export function useDevices(){


return useContext(DeviceContext);


}