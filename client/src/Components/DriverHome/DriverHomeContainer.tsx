import { useMutation, useQuery, useSubscription } from '@apollo/client'
import React, { FC, useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GET_RIDE } from '../../sharedQueries'
import {
    RideStatusSubscription,
    RideStatusSubscription_RideStatusSubscription,
    GetNearbyRides,
    AcceptRide,
    AcceptRideVariables
} from '../../types/api'
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
            console.log(data)
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

    const onCancelHandler = () => {
        if (rideQueue) {
            rideQueue.shift();
            setCurrentRide(rideQueue[0]);
        }
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
            onCancelHandler={onCancelHandler}
            onAcceptHandler={onAcceptHandler}
        />
    )
}
export default withRouter(DriverHomeContainer)