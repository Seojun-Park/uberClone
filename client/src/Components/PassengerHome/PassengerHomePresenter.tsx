import html2canvas from 'html2canvas'
import React, { FC, useEffect, useState } from 'react'
import { storage } from '../../Firebase'
import { b64toBlob } from '../../Hooks/URItoBlob'
import { IRideVariables } from './PassengerHomeContainer'
import * as S from './PassengerHomeStyles'

interface IProps {
    address: string
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onClickHandlerByAddMode: any
    findAddressByInput: any
    reqButton: boolean
    requestRideMutation: any
    rideRequest: any
    rideVariables: IRideVariables
    pickupAddress: string
    rideId?: number
    stopPolling: any
    cancelRideMutation: any
    setRideVariables: any
    user: any
}

const PassengerHomePresenter: FC<IProps> = ({
    address,
    onInputChange,
    onClickHandlerByAddMode,
    findAddressByInput,
    reqButton,
    requestRideMutation,
    rideRequest,
    rideVariables: { price, duration, distance },
    pickupAddress,
    rideId,
    stopPolling,
    cancelRideMutation,
    setRideVariables,
    user
}) => {
    const [url, setUrl] = useState<string>()
    const [blob, setBlob] = useState<any>()
    const onRequestRide = async () => {
        const map = document.getElementById("googleMap");
        if (map) {
            const canvas = await html2canvas(map, {
                allowTaint: false,
                ignoreElements: node => {
                    return node.nodeName === "IFRAME"
                },
                useCORS: true
            });
            const base64img = canvas.toDataURL("image/png")
            const block = base64img.split(";");
            const mimeType = block[0].split(":")[1];// In this case "image/png"
            const realData = block[1].split(",")[1];// For example:  iVBORw0KGgouqw23....
            const canvasBlob = b64toBlob(realData, mimeType);
            setBlob(canvasBlob);
        }
    }

    useEffect(() => {
        if (blob) {
            let uploadTask = storage
                .ref(`/${user!.email}/ride/number`)
                .put(blob);
            uploadTask.on(
                "state_changed",
                (snapshot) => { },
                (error) => console.log(error),
                () => {
                    storage
                        .ref(`/${user.email}/`)
                        .child('ride')
                        .getDownloadURL()
                        .then((url) => setUrl(url))
                }
            )
        }
    }, [blob, user])


    return (
        <S.Contaier>
            {reqButton && <S.RequestButton onClick={onRequestRide}>Request a Ride</S.RequestButton>}
            <S.RequestButton onClick={onRequestRide}>Request a Ride</S.RequestButton>
        </S.Contaier>
    )
}

export default PassengerHomePresenter