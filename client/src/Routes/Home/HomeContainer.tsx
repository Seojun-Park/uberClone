import { useQuery } from '@apollo/client'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { RouteComponentProps } from 'react-router-dom'
import HomePresenter from './HomePresenter'
import { ME } from '../../sharedQueries'
import * as S from './HomeStyles'
import { toast } from 'react-toastify'
import { loadGoogleMapApi } from '../../Hooks/MapHelper'

interface IProps extends RouteComponentProps<any> {
    google: any
}

interface ICoords {
    lat: number;
    lng: number
}

const HomeContainer: FC<IProps> = ({ history }): any => {
    const mapRef = useRef()
    const [user, setUser] = useState(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [map, setMap] = useState<google.maps.Map>()
    const [marker, setMarker] = useState<google.maps.Marker>()
    const [coords, setCoords] = useState<ICoords>({
        lat: 0,
        lng: 0
    })
    const [current, setCurrent] = useState<ICoords>({
        lat: 0,
        lng: 0
    })

    const loadMap = useCallback((lat: number, lng: number) => {
        const mapNode = ReactDOM.findDOMNode(mapRef.current);
        const mapConfig: google.maps.MapOptions = {
            center: { lat, lng },
            disableDefaultUI: true,
            minZoom: 8,
            zoom: 15,
        };
        setMap(new google.maps.Map(mapNode as Element, mapConfig))
        const userMarkerOptions: google.maps.MarkerOptions = {
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7
            },
            position: {
                lat,
                lng
            }
        }
        setMarker(new google.maps.Marker(userMarkerOptions))
        marker?.setMap(map || null)
        const watchOption: PositionOptions = {
            enableHighAccuracy: true
        }
        navigator.geolocation.watchPosition(
            handleGeoWatchSuccess,
            handleGeoWatchError,
            watchOption
        );
    }, [setMap, setMarker, map, marker]);

    const handleGeoWatchSuccess = () => { return; }
    const handleGeoWatchError = () => { console.log("Error Watching you") }
    const handleGeoSuccess = useCallback((pos: any) => {
        if (pos.coords.latitude !== 0 && pos.coords.longitude !== 0) {
            loadMap(pos.coords.latitude, pos.coords.longitude)
        }
    }, [loadMap])
    const handleGeoError = useCallback((err) => console.log(err), [])

    const { loading } = useQuery(ME, {
        fetchPolicy: "cache-and-network",
        onCompleted: v => {
            if (v.Me.ok) {
                setUser(v.Me.user)
                if (v.Me.user.verifiedEmail === false) {
                    history.push("/verifyEmail")
                }
            }
        }
    })


    useEffect(() => {
        const getCurrentLocation = () => {
            navigator.geolocation.getCurrentPosition(pos => {
                const { coords: { latitude, longitude } } = pos;
                setCoords({ lat: latitude, lng: longitude })
                setCurrent({ lat: latitude, lng: longitude })
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
    }, [loadMap, map])

    useEffect(() => {
        navigator.geolocation.watchPosition(
            pos => handleGeoSuccess(pos),
            err => handleGeoError(err)
        )
    }, [handleGeoSuccess, handleGeoError])

    const toggleMenu = (): any => !isMenuOpen ? setIsMenuOpen(true) : setIsMenuOpen(false)
    console.log(coords)

    if (loading) {
        return (
            <S.LoadingContainer>
                <div>loading...</div>
                <div>If the loading too long, please refresh</div>
                <S.ReloadButton onClick={() => window.location.reload()}>Reload</S.ReloadButton>
            </S.LoadingContainer>
        )
    } else {
        return (
            <>
                {coords.lat === 0 && coords.lng === 0 ? "Map loading..." :
                    <HomePresenter
                        mapRef={mapRef}
                        isMenuOpen={isMenuOpen}
                        toggleMenu={toggleMenu}
                        user={user}
                    />
                }
            </>
        )
    }
}

export default HomeContainer