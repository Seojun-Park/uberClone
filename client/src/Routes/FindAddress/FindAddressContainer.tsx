import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom'
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAddress, getGeoCode, loadGoogleMapApi } from '../../Hooks/MapHelper';
import useInput from '../../Hooks/useInput';
import FindAddressPresenter from './FindAddressPresenter'

interface ICoords {
    lat: number;
    lng: number;
}

interface IProps extends RouteComponentProps<any> {
    google: any
}



const FindAddressContainer: React.FC<IProps> = () => {
    const mapRef = useRef();
    const [address, onChangeAddress, setAddress] = useInput("")
    const [coords, setCoords] = useState<ICoords>({ lat: 0, lng: 0 })
    const [map, setMap] = useState<google.maps.Map>()

    useEffect(() => {
        const getCurrentLocation = () => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { coords: { latitude, longitude } } = position
                    loadMap(latitude, longitude);
                },
                () => toast.error("Can not find your location")
            )
        }
        if (!window.google) {
            loadGoogleMapApi(getCurrentLocation);
        } else {
            getCurrentLocation();
        }
    }, [])

    useEffect(() => {
        if (map) {
            map.addListener("dragend", () => setCoords({
                lat: map.getCenter().lat(),
                lng: map.getCenter().lng()
            })
            )
            map.addListener("rightclick", () => console.log("clicked"))
        }
    }, [map])

    const loadMap = (lat: number, lng: number) => {
        const mapNode = ReactDOM.findDOMNode(mapRef.current);
        const mapConfig: google.maps.MapOptions = {
            center: { lat, lng },
            disableDefaultUI: true,
            minZoom: 8,
            zoom: 15
        }
        setMap(new google.maps.Map(mapNode as Element, mapConfig));
    }

    const onPickHander = async () => {
        const addressResult = await getAddress(coords);
        if (addressResult) {
            setAddress(addressResult)
        }
    }

    const submitFn = async () => {
        const { lat, lng } = await getGeoCode(address);
        if (lat && lng && map) {
            map.panTo({ lat, lng })
        }
    }


    return (
        <div>
            <FindAddressPresenter
                mapRef={mapRef}
                address={address}
                onInputChange={onChangeAddress}
                submitFn={submitFn}
                onPickPlace={onPickHander}
            />
        </div>
    )
}
export default FindAddressContainer