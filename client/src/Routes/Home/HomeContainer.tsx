import { useMutation, useQuery } from '@apollo/client'
import React, { FC, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import HomePresenter from './HomePresenter'
import { ME } from '../../sharedQueries'
import * as S from './HomeStyles'
import { toast } from 'react-toastify'
import { generateMarker } from '../../Hooks/MapHelper'
import { ReportMovement, ReportMovementVariables } from '../../types/api'
import { REPORT_MOVEMENT } from './HomeQueries'

interface IProps extends RouteComponentProps {
}

interface ICoords {
    lat: number;
    lng: number
}

const HomeContainer: FC<IProps> = ({ history }): any => {
    const [user, setUser] = useState(null)
    const [map, setMap] = useState<google.maps.Map>();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [userMarker, setUserMarker] = useState<google.maps.Marker>()
    const [coords, setCoords] = useState<ICoords>({ lat: 0, lng: 0 })
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
    const [reportMovementMutation] = useMutation<ReportMovement, ReportMovementVariables>(
        REPORT_MOVEMENT, {
        variables: {
            lastLat: coords.lat,
            lastLng: coords.lng
        }, onCompleted: ({ ReportMovement: { ok, err } }) => {
            if (!ok) {
                toast.error(err);
            }
        }
    }
    )

    useEffect(() => {
        if (map) {
            const { lat: getLat, lng: getLng } = map.getCenter();
            const marker = generateMarker(
                map,
                { lat: getLat(), lng: getLng() },
                {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 5
                }
            );
            if (marker) {
                setUserMarker(marker)
            }
        }
    }, [map])

    useEffect(() => {
        if (userMarker && map) {
            const watchId = navigator.geolocation.watchPosition(
                pos => {
                    const { coords: { latitude: lat, longitude: lng } } = pos
                    userMarker.setPosition({ lat, lng })
                    setCoords({ lat, lng })
                    reportMovementMutation();
                },
                () => {
                    toast.error("Can not find where you are at")
                },
                { enableHighAccuracy: true }
            );
            return () => {
                navigator.geolocation.clearWatch(watchId)
            }
        }
    }, [map, userMarker, setCoords, reportMovementMutation])

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
            <>
                <HomePresenter
                    map={map}
                    isMenuOpen={isMenuOpen}
                    toggleMenu={toggleMenu}
                    userMarker={userMarker}
                    coords={coords}
                    user={user}
                    setMap={setMap}
                />
            </>
        )
    }
}

export default HomeContainer