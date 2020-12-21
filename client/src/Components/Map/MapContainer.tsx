import React, { FC, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom'
import { toast } from 'react-toastify';
import { ICoords, loadGoogleMapApi } from '../../Hooks/MapHelper';
import MapPresenter from './MapPresenter'

interface IProps {
    setMap: React.Dispatch<React.SetStateAction<google.maps.Map<Element> | undefined>>
    isHome: boolean
}

const MapContainer: FC<IProps> = ({ setMap, isHome }) => {
    const mapRef = useRef();

    useEffect(() => {
        const loadMap = (coords: ICoords) => {
            const mapNode = ReactDOM.findDOMNode(mapRef.current);
            const mapConfig: google.maps.MapOptions = {
                center: { ...coords },
                disableDefaultUI: true,
                zoom: 15
            };
            setMap(new google.maps.Map(mapNode as Element, mapConfig));
        };
        const getCurrentLocation = () => {
            navigator.geolocation.getCurrentPosition(
                pos => {
                    const { coords: { latitude, longitude } } = pos;
                    loadMap({ lat: latitude, lng: longitude })
                },
                () => toast.error("Can not find where you are at"),
                { enableHighAccuracy: true }
            )
        };
        if (!window.google) {
            loadGoogleMapApi(getCurrentLocation);
        } else {
            getCurrentLocation()
        }
    }, [setMap])


    return <MapPresenter mapRef={mapRef} isHome={isHome} />
}

export default MapContainer