import { useDevices } from "../../context/DeviceContext";


export default function ThermostatCard(){


    const {

        devices,

        bridgeConnected,

        sendCommand

    } = useDevices();




    const thermostat =
        devices?.thermostat || {};



    const temperature =
        thermostat.temperature ?? 24;



    const online =
        Boolean(thermostat.online);





    function increase(){


        if(!bridgeConnected || !online)
            return;



        sendCommand(

            "thermostat",

            {

                temperature: temperature + 1

            }

        );


    }






    function decrease(){


        if(!bridgeConnected || !online)
            return;



        sendCommand(

            "thermostat",

            {

                temperature: temperature - 1

            }

        );


    }






    return (


        <div className="card">





            <div className="card-header">



                <div>


                    <h2>
                        🌡 Smart Thermostat
                    </h2>


                    <p>
                        Climate Controller
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







            <div className="temp-circle">


                <div>


                    <h1>

                        {temperature}°

                    </h1>


                    <span>
                        Celsius
                    </span>


                </div>



            </div>







            <div className="temp-info">


                Target Temperature


                <br/>


                {
                    thermostat.mode &&
                    `Mode: ${thermostat.mode}`
                }


                <br/>


                {
                    thermostat.humidity !== undefined &&

                    `Humidity: ${thermostat.humidity}%`

                }


            </div>








            <div className="temp-controller">



                <button

                    onClick={decrease}

                    disabled={
                        !online ||
                        !bridgeConnected
                    }

                >

                    −

                </button>





                <button

                    onClick={increase}

                    disabled={
                        !online ||
                        !bridgeConnected
                    }

                >

                    +

                </button>



            </div>







        </div>


    );

}