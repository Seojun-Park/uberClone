import React, { FC } from 'react'
import { IRequest } from './DriverHomeContainer'
import * as S from './DriverHomeStyle'
import PopUp from '../PopUp'

interface IProps {
    ride?: IRequest
    onCancelHandler: () => void;
    onAcceptHandler: (riderId: number) => void
}

const DriverHomePresenter: FC<IProps> = ({ ride, onCancelHandler, onAcceptHandler }) => {
    return (
        <S.Container>
            {ride && ride.price && ride.distance && ride.duration &&
                <PopUp
                    isDriver={true}
                    pickUpAddress={ride.pickUpAddress}
                    dropOffAddress={ride.dropOffAddress}
                    price={ride.price}
                    distance={ride.distance}
                    duration={ride.duration}
                    id={ride.id}
                    onCancelHandler={onCancelHandler}
                    onAcceptHandler={() => onAcceptHandler(ride.id)}
                />
            }
        </S.Container>
    )
}

export default DriverHomePresenter