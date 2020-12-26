import React, { FC } from "react";
import Button from "../../Components/Button";
import { GetRide_GetRide_ride, GetRide_GetRide_ride_driver, GetRide_GetRide_ride_passenger } from "../../types/api";
import { StatusOptions } from "../../types/enums";
import * as S from './RideStyles'

interface IProps {
  user: any
  ride: any
  profile?: GetRide_GetRide_ride_driver | GetRide_GetRide_ride_passenger
  onDriverButton: (status: StatusOptions) => void
  history: any
  buttonHandler: (
    isDriver: boolean,
    ride?: GetRide_GetRide_ride | undefined
  ) => {
    value: string,
    onClick?: any | undefined
  }
  isDriver: boolean
}

const RidePresenter: FC<IProps> = ({
  ride,
  user,
  profile,
  onDriverButton,
  history,
  buttonHandler,
  isDriver
}) => {
  return (
    <S.Container>
      {ride && user && (
        <>
          <S.StatusTitle>Driving Status</S.StatusTitle>
          <Button {...buttonHandler(isDriver, ride)} />
          <S.Title>Passenger</S.Title>
          <S.Passenger>
            <S.Img src={ride.passenger.profilePhoto} />
            <S.Data>{ride.passenger.fullName}</S.Data>
          </S.Passenger>
          {ride.driver && (
            <>
              <S.Title>Driver</S.Title>
              <S.Passenger>
                <S.Img src={ride.driver.profilePhoto} />
                <S.Data>{ride.driver.fullName}</S.Data>
              </S.Passenger>
            </>
          )}
          <S.Title>From</S.Title>
          <S.Data>{ride.pickUpAddress}</S.Data>
          <S.Title>To</S.Title>
          <S.Data>{ride.dropOffAddress}</S.Data>
          <S.Title>Price</S.Title>
          <S.Data>{ride.price}</S.Data>
          <S.Title>Distance</S.Title>
          <S.Data>{ride.distance}</S.Data>
          <S.Title>Duration</S.Title>
          <S.Data>{ride.duration}</S.Data>
          <S.Title>Status</S.Title>
          <S.Data>{ride.status}</S.Data>
          <S.Buttons>
            {ride.status !== StatusOptions.ONROUTE && (
              <S.CancelButton type="button" onClick={() => onDriverButton(StatusOptions.CANCELED)} value="Cancel" />
            )}
          </S.Buttons>
        </>
      )}
    </S.Container>
  )
};

export default RidePresenter;
