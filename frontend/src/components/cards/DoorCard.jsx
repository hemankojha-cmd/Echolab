import { useDevices } from "../../context/DeviceContext";
import ToggleSwitch from "../common/ToggleSwitch";


export default function DoorCard(){


    const {

        devices,

        bridgeConnected,

        sendCommand

    } = useDevices();




    const door =
        devices?.door || {};



    const locked =
        Boolean(door.locked);



    const online =
        Boolean(door.online);





    function toggleDoor(){


        if(!bridgeConnected || !online){

            console.log(
                "Door unavailable"
            );

            return;

        }





        sendCommand(

            "door",

            {

                action:

                    locked

                    ?

                    "UNLOCK"

                    :

                    "LOCK"

            }

        );


    }







    return (


        <div className="card">





            <div className="card-header">



                <div>


                    <h2>
                        🚪 Smart Door Lock
                    </h2>


                    <p>
                        Access Control System
                    </p>


                </div>





                <span

                    className={
                        online
                        ? (
                            locked
                            ? "badge on"
                            : "badge off"
                          )
                        :
                          "badge off"
                    }

                >


                    {
                        !online

                        ?

                        "OFFLINE"

                        :

                        locked

                        ?

                        "SECURED"

                        :

                        "OPEN"

                    }


                </span>



            </div>









            <div className="door-container">



                <div

                    className={

                        locked

                        ?

                        "door-icon locked"

                        :

                        "door-icon unlocked"

                    }

                >


                    {
                        locked
                        ?
                        "🔒"
                        :
                        "🔓"
                    }


                </div>



            </div>







            <div className="status-text">


                {

                    !online

                    ?

                    "Door Device Offline"

                    :

                    locked

                    ?

                    "Door is Locked"

                    :

                    "Door is Unlocked"

                }



            </div>







            <div className="device-metrics">


                <p>

                    🔋 Battery:

                    <b>

                        {
                            door.battery ?? "--"
                        }%

                    </b>


                </p>



            </div>







            <div className="toggle-wrapper">



                <ToggleSwitch


                    checked={locked}


                    leftText="OPEN"


                    rightText="LOCK"



                    onChange={toggleDoor}



                />



            </div>





        </div>



    );


}