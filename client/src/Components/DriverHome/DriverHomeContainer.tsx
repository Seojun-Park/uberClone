import { useMutation, useQuery, useSubscription } from '@apollo/client'
import React, { FC, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
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
    const [rideQueue] = useState<IRequest[]>([]);
    const [currentRide, setCurrentRide] = useState<IRequest>();

    useQuery<GetNearbyRides>(GET_NEARBY_RIDES, {
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
        }
    })

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
        }
    })

    const [acceptRideMutation] = useMutation<AcceptRide, AcceptRideVariables>(ACCEPT_RIDE)

    const onCancelHandler = () => {
        if (rideQueue) {
            rideQueue.shift();
            setCurrentRide(rideQueue[0]);
        }
    }

    const onAcceptHandler = (rideId: number) => {
        acceptRideMutation({ variables: { rideId } })
        history.push(`/ride/${rideId}`)
    }

    return (
        <DriverHomePresenter
            ride={currentRide}
            onCancelHandler={onCancelHandler}
            onAcceptHandler={onAcceptHandler}
        />
    )
}
export default withRouter(DriverHomeContainer)