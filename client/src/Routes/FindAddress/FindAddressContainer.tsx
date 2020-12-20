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

const FindAddressContainer: React.FC<IProps> = ({ history }) => {
    const mapRef = useRef()
    const [address, onChangeAddress, setAddress] = useInput("")
    const [coords, setCoords] = useState<ICoords>({ lat: 0, lng: 0 });
    const [map, setMap] = useState<google.maps.Map>()

    useEffect(() => {
        const getCurrentLocation = () => {
            navigator.geolocation.getCurrentPosition(pos => {
                const { coords: { latitude, longitude } } = pos;
                loadMap(latitude, longitude);
                if (map !== undefined) {
                    map.panTo({ lat: latitude + 0.001, lng: longitude + 0.001 })
                }
            },
                () => toast.error("Cannot find your location"),
                { enableHighAccuracy: true }
            );
        };
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
            );
            // map.addListener("drag", () => setCoords({
            //     lat: map.getCenter().lat(),
            //     lng: map.getCenter().lng()
            // }))
            map.addListener("rightclick", () => console.log("clicked"))
        }
    }, [map])

    useEffect(() => {
        if (address) {
            console.log(address)
        }
    }, [address])

    const loadMap = (lat: number, lng: number) => {
        const mapNode = ReactDOM.findDOMNode(mapRef.current);
        const mapConfig: google.maps.MapOptions = {
            center: { lat, lng },
            disableDefaultUI: true,
            minZoom: 8,
            zoom: 15
        };
        setMap(new google.maps.Map(mapNode as Element, mapConfig))
    }

    const onPickHandler = async () => {
        const result = await getAddress(coords);
        if (result) {
            setAddress(result)
        }

    }

    const submitFn = async () => {
        const { lat, lng } = await getGeoCode(address);
        if (lat && lng && map) {
            map.panTo({ lat, lng })
            const result = await getAddress({ lat, lng })
            if (result) {
                setAddress(result)
            }
        }
    }

    const onSubmit = () => {
        history.push({
            pathname: "/addPlace",
            state: {
                address: address,
                lat: coords.lat,
                lng: coords.lng
            }
        })
    }

    return (
        <div>
            <FindAddressPresenter
                mapRef={mapRef}
                address={address}
                onInputChange={onChangeAddress}
                submitFn={submitFn}
                onPickPlace={onPickHandler}
                onSubmit={onSubmit}
            />
        </div>
    )
}
export default FindAddressContainer