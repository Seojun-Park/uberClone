import { useMutation, useQuery, useSubscription } from '@apollo/client'
import React, { FC, useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GET_RIDE, UPDATE_RIDE_STATUS } from '../../sharedQueries'
import {
    RideStatusSubscription,
    RideStatusSubscription_RideStatusSubscription,
    GetNearbyRides,
    AcceptRide,
    AcceptRideVariables,
    UpdateRideStatus,
    UpdateRideStatusVariables
} from '../../types/api'
import { StatusOptions } from '../../types/enums'
import DriverHomePresenter from './DriverHomePresenter'
import { ACCEPT_RIDE, GET_NEARBY_RIDES, RIDE_SUBSCRIPTION } from './DriverHomeQueries'

interface IProps extends RouteComponentProps { }

export interface IRequest extends RideStatusSubscription_RideStatusSubscription { }

const DriverHomeContainer: FC<IProps> = ({ history }) => {
    const [status, setStatus] = useState<any>();
    const [rideQueue] = useState<IRequest[]>([]);
    const [currentRide, setCurrentRide] = useState<IRequest>();

    const { data, subscribeToMore } = useQuery<GetNearbyRides>(GET_NEARBY_RIDES, {
        onCompleted: ({ GetNearbyRides }) => {
            const { ok, err, ride } = GetNearbyRides;
            if (ok && ride) {
                if (ride) {
                    rideQueue.push(ride);
                    if (!currentRide) {
                        setCurrentRide(ride);
                    }
                }
            } else {
                toast.error(err)
            }
        },
        pollInterval: 500
    })

    const [cancelRideMutation] = useMutation<UpdateRideStatus, UpdateRideStatusVariables>(
        UPDATE_RIDE_STATUS, {
        onCompleted: () => setStatus("CANCELED"),
        refetchQueries: [{ query: GET_RIDE }]
    }
    )

    useEffect(() => {
        if (data) {
            setStatus(data.GetNearbyRides.ride?.status);
        }
    }, [data])

    useEffect(() => {
        subscribeToMore({
            document: RIDE_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                return { ...prev }
            }
        })
    }, [subscribeToMore])

    useSubscription<RideStatusSubscription>(RIDE_SUBSCRIPTION, {
        onSubscriptionComplete: () => {
            console.log("Waiting for new ride request")
        },
        onSubscriptionData: ({ subscriptionData }) => {
            const { data, error } = subscriptionData;
            if (data) {
                const ride = data.RideStatusSubscription;
                if (ride) {
                    rideQueue.push(ride);
                    if (!currentRide) {
                        setCurrentRide(ride);
                    }
                }
            } else {
                toast.error(error)
            }
        },

    })

    const [acceptRideMutation] = useMutation<AcceptRide, AcceptRideVariables>(ACCEPT_RIDE, {
        refetchQueries: [{ query: GET_RIDE }]
    })

    const onCancelHander = (rideId: number) => {
        cancelRideMutation({
            variables: { rideId, status: StatusOptions.CANCELED }
        })
    }

    const onAcceptHandler = (rideId: number) => {
        acceptRideMutation({
            variables: { rideId },
            refetchQueries: [{ query: GET_RIDE, variables: { rideId } }]
        })
        window.location.replace(`/ride/${rideId}`)
    }


    return (
        <DriverHomePresenter
            ride={currentRide}
            status={status}
            onCancelHandler={onCancelHander}
            onAcceptHandler={onAcceptHandler}
        />
    )
}
export default withRouter(DriverHomeContainer)