import React, { FC, useRef, useState } from 'react';
import { } from 'googlemaps'
import useInput from '../../Hooks/useInput';
import FindAddressPresenter from './FindAddressPresenter'

type Coord = {
    lat: number;
    lng: number
}

type Props = {
    google: any
}

const FindAddressContainer: FC<Props> = () => {
    const mapRef = useRef()
    const [address, onChangeAddress, setAddress] = useInput("")
    const [coord, setCoord] = useState<Coord>({ lat: 0, lng: 0 })
    const [map, setMap] = useState<Props>()



    return (
        <FindAddressPresenter mapRef={mapRef} />
    )
}
export default FindAddressContainer