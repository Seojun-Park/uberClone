import React, { useCallback, useEffect, useRef, useState } from 'react';
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
    const [position, setPosition] = useState<ICoords>({ lat: 0, lng: 0 })
    const [coords, setCoords] = useState<ICoords>({
        lat: 0,
        lng: 0
    });
    const [address, onChangeAddress, setAddress] = useInput("")
    const [map, setMap] = useState<google.maps.Map>()
    const loadMap = useCallback((lat: number, lng: number) => {
        const mapNode = ReactDOM.findDOMNode(mapRef.current);
        const mapConfig: google.maps.MapOptions = {
            center: { lat, lng },
            disableDefaultUI: true,
            minZoom: 8,
            zoom: 15
        };
        setMap(new google.maps.Map(mapNode as Element, mapConfig))
    }, [setMap])

    useEffect(() => {
        const getCurrentLocation = () => {
            navigator.geolocation.getCurrentPosition(pos => {
                const { coords: { latitude, longitude } } = pos;
                setPosition({
                    lat: latitude,
                    lng: longitude
                })
                setCoords({
                    lat: latitude,
                    lng: longitude
                })
                loadMap(latitude, longitude);
                if (map !== undefined) {
                    map.panTo({ lat: latitude + 0.00001, lng: longitude + 0.00001 })
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
            map.addListener("rightclick", () => console.log("clicked"))
        }
    }, [map])



    const onPickHandler = async () => {
        let result;
        if (coords.lat === 0 || coords.lng === 0) {
            result = await getAddress(position);
        } else {
            result = await getAddress(coords)
        }
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
                data: {
                    address: address,
                    lat: coords.lat,
                    lng: coords.lng
                }
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