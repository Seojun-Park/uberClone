import { useQuery } from "@apollo/client";
import React, { FC, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_RIDE } from "../../sharedQueries";
import { GetRide, GetRideVariables } from "../../types/api";
import RidePresenter from "./RidePresenter";

interface IProps extends RouteComponentProps<any> { }

const RideContainer: FC<IProps> = ({ match }) => {
  const [ride, setRide] = useState<any>();
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
  console.log(ride);
  if (loading) {
    return (
      <>
        Ride Loading...
      </>
    )
  } else {
    return (
      <RidePresenter />
    )
  }
}

export default RideContainer