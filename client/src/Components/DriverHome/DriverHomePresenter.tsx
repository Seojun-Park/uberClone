import React, { FC } from 'react'
import { IRequest } from './DriverHomeContainer'
import * as S from './DriverHomeStyle'
import PopUp from '../PopUp'

interface IProps {
    ride?: IRequest
    onCancelHandler: () => void;
    onAcceptHandler: (riderId: number) => void
    flag: boolean
}

const DriverHomePresenter: FC<IProps> = ({ ride, onCancelHandler, onAcceptHandler, flag }) => {
    return (
        <S.Container>
            {flag && ride && ride.price && ride.distance && ride.duration &&
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