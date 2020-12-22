import html2canvas from 'html2canvas'
import React, { FC } from 'react'
import { storage } from '../../Firebase'
import { b64toBlob } from '../../Hooks/URItoBlob'
import { StatusOptions } from '../../types/enums'
import AddressBar from '../AddressBar'
import PopUp from '../PopUp'
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
    stopPolling?: any
    cancelRideMutation: any
    setRideVariables: any
    user: any
    ride: any
    setUrl: any
    addMode: boolean
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
    // stopPolling,
    cancelRideMutation,
    setRideVariables,
    user,
    ride,
    setUrl,
    addMode
}) => {
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
            let uploadTask = storage
                .ref(`/${user!.email}/ride/passenger/${rideId}`)
                .put(canvasBlob);
            uploadTask.on(
                "state_changed",
                (snapshot) => { },
                (error) => console.log(error),
                () => {
                    storage
                        .ref(`/${user.email}/ride/passenger/`)
                        .child(`${rideId}`)
                        .getDownloadURL()
                        .then((url) => {
                            setUrl(url)
                        })
                }
            )
        }
        await requestRideMutation();
    }


    return (
        <S.Contaier>
            <S.Form onSubmit={() => findAddressByInput()}>
                <AddressBar value={address} onChange={onInputChange} />
            </S.Form>
            {addMode && (
                <S.Center>
                    <span role="img" aria-label="pin">
                        📍
                        </span>
                </S.Center>
            )}
            {reqButton && <S.RequestButton onClick={onRequestRide}>Request a Ride</S.RequestButton>}
            {rideRequest && rideId && (
                <PopUp
                    price={price}
                    duration={duration}
                    distance={distance}
                    dropOffAddress={address}
                    pickUpAddress={pickupAddress}
                    onCancelHandler={() => {
                        // stopPolling();
                        cancelRideMutation({
                            variables: {
                                rideId,
                                status: StatusOptions.CANCELED
                            }
                        })
                    }}
                    isDriver={false}
                    id={rideId}
                />
            )}
            {/* <S.RequestButton onClick={onRequestRide}>Request a Ride</S.RequestButton> */}
        </S.Contaier>
    )
}

export default PassengerHomePresenter