import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { FC, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { generateMarker, getAddress, getGeoCode, ICoords, renderPath } from '../../Hooks/MapHelper';
import useInput from '../../Hooks/useInput';
import { GET_RIDE, UPDATE_RIDE_STATUS } from '../../sharedQueries';
import {
    GetNearbyDrivers,
    GetRide,
    GetRideVariables,
    RequestRide,
    RequestRideVariables,
    UpdateRideStatus,
    UpdateRideStatusVariables,
} from '../../types/api';
import PassengerHomePresenter from './PassengerHomePresenter'
import {
    REQUEST_RIDE,
    GET_NEARBY_DRIVERS,
} from './PassengerHomeQueries';

interface IProps extends RouteComponentProps {
    map?: google.maps.Map<Element>;
    marker?: google.maps.Marker;
    coords: ICoords;
    user: any
}

export interface IRideVariables {
    distance: string;
    duration: string;
    price: number;
    rideImage: string;
}

const PassengerHomeContainer: FC<IProps> = ({
    map,
    marker,
    coords,
    history,
    user
}) => {
    const [placeMarker, setPlaceMarker] = useState<google.maps.Marker>();
    const [driverMarker, setDriverMarker] = useState<google.maps.Marker[]>([])
    const [directionRender, setDirectionRender] = useState<google.maps.DirectionsRenderer>()
    const [url, setUrl] = useState<string>()
    const [ride, setRide] = useState<any>()
    const [reqButton, setReqButton] = useState(false)
    const [addMode, setAddMode] = useState(false);
    const [rideRequest, setRideRequest] = useState(false)
    const [pickUpAddress, setPickupAddress] = useState("")
    const [address, onChangeAddress, setAddressInput] = useInput("")
    const [rideVariables, setRideVariables] = useState<IRideVariables>({
        distance: "",
        duration: "",
        price: 0,
        rideImage: url || ""
    })
    const [placeCoords, setPlaceCoords] = useState<ICoords>({ lat: 0, lng: 0 });
    const [rideId, setRideId] = useState<number>();
    const { refetch } = useQuery<GetRide, GetRideVariables>(GET_RIDE, {
        fetchPolicy: "network-only",
        variables: {
            rideId: rideId || user.currentRideId || -1
        }, onCompleted: ({ GetRide }) => {
            if (GetRide && GetRide.ok && GetRide.ride) {
                setRide(GetRide.ride)
                setRideId(GetRide.ride.id)
                console.log(GetRide.ride.status)
                if (GetRide.ride.status === "ACCEPTED") {
                    // window.location.replace(`/ride/${GetRide.ride.id}`)
                    history.push(`/ride/${GetRide.ride.id}`)
                }
                if (GetRide.ride.id && GetRide.ride.status === "ACCEPTED") {
                    window.location.replace(`/ride/${GetRide.ride.id}`)
                }
            }
        },
        pollInterval: 200
    })

    // useEffect(() => {
    //     if (ride && ride.status === 'REQUESTING') {
    //         const timer = setTimeout(() =>
    //             window.location.reload(), 5000)
    //         return () => clearTimeout(timer)
    //     }
    // }, [ride])

    const [GetDriver, { loading }] = useLazyQuery<GetNearbyDrivers>(GET_NEARBY_DRIVERS, {
        fetchPolicy: "cache-and-network",
        onCompleted: ({ GetNearbyDrivers: { drivers = [], ok } }) => {
            if (ok) {
                if (drivers && drivers.length > 0 && map) {
                    if (driverMarker.length > drivers.length) {
                        while (driverMarker.length > 0) {
                            const marker = driverMarker.pop();
                            if (marker) {
                                marker.setMap(null)
                            }
                        }
                        setDriverMarker(driverMarker)
                    }
                    for (const driver of drivers) {
                        if (driver) {
                            const existedDriver = driverMarker.find(driverMarker => driver.id === driverMarker.get("ID"))
                            const driverLocation: ICoords = {
                                lat: driver.lastLat || 0,
                                lng: driver.lastLng || 0
                            };
                            if (existedDriver) {
                                existedDriver.setPosition(driverLocation);
                                existedDriver.setMap(map);
                            } else {
                                const marker = generateMarker(map, driverLocation, {
                                    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                                    scale: 5
                                });
                                if (marker) {
                                    marker.set('ID', driver.id)
                                    driverMarker.push(marker);
                                    setDriverMarker(driverMarker)
                                }
                            }
                        }
                    }
                }
            }
        },
        // pollInterval: 100
    })

    useEffect(() => {
        if (map) {
            GetDriver()
        }
    }, [GetDriver, map])

    const [requestRideMutation] = useMutation<RequestRide, RequestRideVariables>(REQUEST_RIDE, {
        onCompleted: ({ RequestRide }) => {
            const { ride } = RequestRide;
            if (ride) {
                setRideId(ride.id);
                // fetchRideStatus();
                refetch();
                toast.success("Requested")
            }
            setReqButton(false);
            setRideRequest(true);
        },
        variables: {
            ...rideVariables,
            dropOffAddress: address,
            dropOffLat: placeCoords.lat,
            dropOffLng: placeCoords.lng,
            pickUpAddress,
            pickUpLat: coords.lat,
            pickUpLng: coords.lng,
        }
    })

    const [cancelRideMutation] = useMutation<UpdateRideStatus, UpdateRideStatusVariables>(
        UPDATE_RIDE_STATUS, {
        onCompleted: () => {
            setRideId(undefined);
            setReqButton(false);
            window.location.reload();
        }
    })

    const findAddressByInput = async () => {
        if (window.google && google && map) {
            const userAddress = await getAddress(coords);
            if (userAddress) {
                setPickupAddress(userAddress);
            }
            const geoCode = await getGeoCode(address);
            if (geoCode) {
                renderPlaceMarker(geoCode);
            }
        }
    }

    const findAddressByGeoCode = async () => {
        if (window.google && google && map) {
            const userAddresss = await getAddress(coords);
            if (userAddresss) {
                setPickupAddress(userAddresss);
            }
            const targetGeoCode = {
                lat: map.getCenter().lat(),
                lng: map.getCenter().lng()
            };
            const placeAddress = await getAddress(targetGeoCode);
            if (placeAddress) {
                setAddressInput(placeAddress);
                renderPlaceMarker(targetGeoCode);
            }
        }
    };


    const renderPlaceMarker = (targetGeoCode: ICoords) => {
        if (map && marker) {
            if (placeMarker) {
                placeMarker.setPosition({ ...targetGeoCode });
            } else {
                const marker = generateMarker(map, targetGeoCode);
                if (marker) {
                    setPlaceMarker(marker)
                }
            }
            setPlaceCoords(targetGeoCode);
            const bounds = new google.maps.LatLngBounds();
            bounds.extend(coords);
            bounds.extend(targetGeoCode);
            map.fitBounds(bounds);
            if (directionRender) {
                directionRender.setMap(null)
            }
            renderPath(map, coords, targetGeoCode, onRenderSuccess)
        }
    }

    const onRenderSuccess = (routes: google.maps.DirectionsRoute[], directionRenderer: google.maps.DirectionsRenderer) => {
        const { distance: { text: distance }, duration: { text: duration } } = routes[0].legs[0]
        const price = parseFloat(distance.split(" ")[0]) * 2;
        setRideVariables({ ...rideVariables, distance, duration, price })
        setReqButton(true);
        setDirectionRender(directionRenderer);
    }

    const onClickHandlerByAddMode = async () => {
        setReqButton(false);
        if (addMode) {
            await findAddressByGeoCode();
            setAddMode(false)
        } else {
            setAddMode(true)
        }
    }

    if (loading) {
        return <h2>Loading...</h2>
    }

    return (
        <PassengerHomePresenter
            address={address}
            onInputChange={onChangeAddress}
            onClickHandlerByAddMode={onClickHandlerByAddMode}
            findAddressByInput={findAddressByInput}
            reqButton={reqButton}
            requestRideMutation={requestRideMutation}
            rideRequest={rideRequest}
            rideVariables={rideVariables}
            pickupAddress={pickUpAddress}
            rideId={rideId}
            addMode={addMode}
            // stopPolling={stopPolling}
            cancelRideMutation={cancelRideMutation}
            setRideVariables={setRideVariables}
            user={user}
            ride={ride}
            setUrl={setUrl}
        />
    )
}

export default withRouter(PassengerHomeContainer)