import { useDevices } from "../../context/DeviceContext";
import ToggleSwitch from "../common/ToggleSwitch";


export default function BulbCard(){


    const {

        devices,

        bridgeConnected,

        sendCommand

    } = useDevices();




    const bulb = devices?.bulb || {};



    const isOn = Boolean(
        bulb.status
    );



    const online = Boolean(
        bulb.online
    );





    function toggleBulb(){


        if(!bridgeConnected || !online){

            console.log(
                "Bulb unavailable"
            );

            return;

        }




        sendCommand(

            "bulb",

            {

                action:isOn
                    ? "OFF"
                    : "ON"

            }

        );


    }






    return (

        <div className="card">



            <div className="card-header">


                <div>


                    <h2>
                        💡 Smart Bulb
                    </h2>


                    <p>
                        Lighting Controller
                    </p>


                </div>




                <span
                    className={
                        online
                        ? "badge on"
                        : "badge off"
                    }
                >

                    {
                        online
                        ? "ONLINE"
                        : "OFFLINE"
                    }

                </span>



            </div>





            <div className="bulb-container">


                <div

                    className={
                        `bulb-icon ${
                            isOn
                            ? "bulb-on"
                            : "bulb-off"
                        }`
                    }

                >

                    💡

                </div>



            </div>






            <div className="status-text">


                {
                    isOn
                    ? "Bulb is ON"
                    : "Bulb is OFF"
                }


            </div>





            <div className="device-metrics">


                <p>
                    ⚡ Power:
                    <b>
                        {
                            bulb.power || 0
                        } W
                    </b>
                </p>



                <p>

                    🔌 Voltage:
                    <b>
                        {
                            bulb.voltage || 0
                        } V
                    </b>

                </p>



                <p>

                    🔋 Current:
                    <b>
                        {
                            bulb.current || 0
                        } A
                    </b>

                </p>



            </div>






            <div className="toggle-wrapper">


                <ToggleSwitch

                    checked={isOn}

                    onChange={toggleBulb}

                    leftText="OFF"

                    rightText="ON"

                />



            </div>




        </div>

    );


}