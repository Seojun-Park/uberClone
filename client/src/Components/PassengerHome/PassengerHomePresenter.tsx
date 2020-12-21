import html2canvas from 'html2canvas'
import React, { FC } from 'react'
import { IRideVariables } from './PassengerHomeContainer'

interface IProps {
    address: string
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onClickHandlerByAddMode: any
    findAddressByInput: any
    addMode: boolean
    reqButton: boolean
    requestRideMutation: boolean
    rideRequest: any
    rideVariables: IRideVariables
    pickupAddress: string
    rideId?: number
    stopPolling: any
    cancelRideMutation: any
    setRideVariables: any
}

const PassengerHomePresenter: FC<IProps> = ({
    address,
    onInputChange,
    onClickHandlerByAddMode,
    findAddressByInput,
    addMode,
    reqButton,
    requestRideMutation,
    rideRequest,
    rideVariables,
    pickupAddress,
    rideId,
    stopPolling,
    cancelRideMutation,
    setRideVariables
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
            const url = canvas.toDataURL("image/png")
            const res = await base64Up
        }
    }
}

export default PassengerHomePresenter