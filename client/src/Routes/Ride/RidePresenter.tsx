import React, { FC } from "react";
import * as S from './RideStyles'

interface IProps {
  user: any
  ride?: any
}

const RidePresenter: FC<IProps> = ({ ride, user }) => {
  return (
    <S.Container>
      {ride && user && (
        <>
          <S.Title>Passenger</S.Title>
          <S.Passenger>
            <S.Img src={ride.passenger.profilePhoto!} />
            <S.Data>{ride.passenger.fullName!}</S.Data>
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
          </S.Buttons>
        </>
      )}
    </S.Container>
  )
};

export default RidePresenter;
