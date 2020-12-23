import { useMutation, useQuery } from "@apollo/client";
import React, { FC, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { forceHistory } from "../../Hooks/forceHistory";
import { GET_RIDE, ME, UPDATE_RIDE_STATUS } from "../../sharedQueries";
import {
  GetRide,
  GetRide_GetRide_ride_driver,
  GetRide_GetRide_ride_passenger,
  GetRide_GetRide_ride,
  GetRideVariables,
  me,
  UpdateRideStatus,
  UpdateRideStatusVariables
} from "../../types/api";
import { StatusOptions } from "../../types/enums";
import RidePresenter from "./RidePresenter";

interface IProps extends RouteComponentProps<any> { }

const RideContainer: FC<IProps> = ({ match }) => {
  const [ride, setRide] = useState<GetRide_GetRide_ride>();
  const [user, setUser] = useState<any>();
  useQuery<me>(ME, {
    fetchPolicy: "network-only",
    onCompleted: ({ Me }) => {
      if (Me.ok && Me.user) {
        setUser(Me.user);
      }
    }
  })
  const { loading } = useQuery<GetRide, GetRideVariables>(GET_RIDE, {
    variables: {
      rideId: parseInt(match.params.number)
    },
    onCompleted: ({ GetRide }) => {
      if (GetRide && GetRide.ok && GetRide.ride) {
        setRide(GetRide.ride);
      } else {
        toast.error("No ride found")
      }
    }
  })

  const [updateRideMutation] = useMutation<UpdateRideStatus, UpdateRideStatusVariables>(UPDATE_RIDE_STATUS)
  const onDriverButton = (status: StatusOptions) => {
    updateRideMutation({
      variables: {
        rideId: parseInt(match.params.number),
        status
      }
    })
  }
  console.log(ride);

  const buttonHandler = (
    isDriver: boolean,
    ride?: GetRide_GetRide_ride
  ): { value: string; onClick?: any } => {
    if (isDriver && ride) {
      if (ride.status === StatusOptions.ACCEPTED) {
        return {
          onClick: () => onDriverButton(StatusOptions.ONROUTE),
          value: "PICKED UP",
        }
      } else {
        return {
          onClick: () => {
            onDriverButton(StatusOptions.FINISHED);
            forceHistory.push("/")
          },
          value: "FINISHED"
        }
      }
    } else {
      return {
        value: "You are on riding"
      }
    }
  }
  if (loading) {
    return (
      <>
        Ride Loading...
      </>
    )
  } else {
    return (
      <RidePresenter ride={ride} user={user} />
    )
  }
}

export default RideContainer