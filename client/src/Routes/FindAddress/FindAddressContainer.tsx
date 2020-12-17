import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom'
import { toast } from 'react-toastify';
import { loadGoogleMapApi } from '../../Hooks/MapHelper';
import useInput from '../../Hooks/useInput';
import FindAddressPresenter from './FindAddressPresenter'


type Coord = {
    lat: number;
    lng: number
}

type Props = {
    google: any
}

type Google = {
    google: {
        maps: any
    }
}


const FindAddressContainer: FC<Props> = ({ google }) => {
    const mapRef = useRef()
    const [address, onChangeAddress, setAddress] = useInput("")
    const [coord, setCoord] = useState<Coord>({ lat: 0, lng: 0 })
    const [map, setMap] = useState<Google>()
    console.log(google)

    // const loadMap = (lat: number, lng: number) => {
    //     const mapNode = ReactDOM.findDOMNode(mapRef.current);
    //     const mapConfig = google.maps.mapOptions = {
    //         center: { lat, lng },
    //         disableDefaultUI: true,
    //         minZoom: 8,
    //         zoom: 15
    //     }
    //     setMap(new google.maps.Map(mapNode as Element, mapConfig));
    // }

    const loadMap = useCallback((lat: number, lng: number) => {
        const mapNode = ReactDOM.findDOMNode(mapRef.current);
        const mapConfig = google.maps.mapOptions = {
            center: { lat, lng },
            disableDefaultUI: true,
            minZoom: 8,
            zoom: 15
        }
        setMap(new google.maps.Map(mapNode as Element, mapConfig));
    }, [google.maps])

    useEffect(() => {
        const getCurrentLocation = () => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { coords: { latitude, longitude } } = position
                    loadMap(latitude, longitude)
                },
                () => toast.error("Can't find your location")
            )
        };
        if (!google) {
            loadGoogleMapApi(getCurrentLocation);
        } else {
            getCurrentLocation();
        }
    }, [loadMap, google])

    useEffect(() => {
        if (map) {
            map.google.maps.addListener("dragend", () => setCoord({
                lat: 0,
                lng: 0
            })
            );
            map.google.maps.addListener("rightclick", () => console.log("right clicked"))
        }
    }, [map])


    return (
        <FindAddressPresenter mapRef={mapRef} />
    )
}
export default FindAddressContainer