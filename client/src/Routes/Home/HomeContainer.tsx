import { useQuery } from '@apollo/client'
import React, { FC, useEffect, useRef, useState } from 'react'
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

const HomeContainer: FC<IProps> = ({ history }): any => {
    const mapRef = useRef()
    const [user, setUser] = useState(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [map, setMap] = useState<google.maps.Map>()

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

    const toggleMenu = (): any => !isMenuOpen ? setIsMenuOpen(true) : setIsMenuOpen(false)

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
            <HomePresenter
                mapRef={mapRef}
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
                user={user}
            />
        )
    }
}

export default HomeContainer