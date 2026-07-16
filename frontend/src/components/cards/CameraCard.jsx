import { useDevices } from "../../context/DeviceContext";


export default function CameraCard(){


    const {

        devices,

        bridgeConnected

    } = useDevices();




    const camera = devices?.camera || {};



    const frame = camera.frame;



    const cameraOnline = Boolean(
        camera.online
    );





    const imageURL = frame

        ? `${frame}?t=${Date.now()}`

        : "";







    return (


        <div className="card camera-card">



            <div className="card-header">


                <div>


                    <h2>
                        📷 Live Camera
                    </h2>


                    <p>
                        EchoLab Camera Stream
                    </p>


                </div>





                <span

                    className={
                        cameraOnline
                        ? "live-badge"
                        : "badge off"
                    }

                >


                    {
                        cameraOnline
                        ? "● LIVE"
                        : "OFFLINE"
                    }


                </span>



            </div>






            <div className="camera-wrapper">





                {
                    imageURL ?


                    (


                        <img

                            className="camera"

                            src={imageURL}

                            alt="EchoLab Camera"

                        />


                    )


                    :


                    (


                        <div className="camera-placeholder">


                            {
                                bridgeConnected

                                ?

                                "Waiting for Camera Feed..."

                                :

                                "Bridge Offline"

                            }


                        </div>


                    )



                }







                <div className="camera-overlay">





                    <div className="overlay-left">


                        {
                            cameraOnline

                            &&

                            <span className="record-dot"></span>

                        }


                        {
                            cameraOnline

                            ?

                            "REC"

                            :

                            "NO SIGNAL"

                        }


                    </div>





                    <div className="overlay-right">


                        {

                            bridgeConnected

                            ?

                            "🟢 Bridge Connected"

                            :

                            "🔴 Bridge Offline"

                        }


                    </div>





                </div>






            </div>





        </div>


    );


}