import React, { FC, useEffect } from 'react'
import { IRequest } from './DriverHomeContainer'
import * as S from './DriverHomeStyle'
import PopUp from '../PopUp'

interface IProps {
    ride?: IRequest
    onCancelHandler: (rideId: number) => void;
    onAcceptHandler: (riderId: number) => void
    status: string
}

const DriverHomePresenter: FC<IProps> = ({
    ride,
    onCancelHandler,
    onAcceptHandler,
    status,
}) => {
    useEffect(() => {
        if (status === "REQUESTING") {
            const timer = setTimeout(() => window.location.reload(), 5000)
            return () => clearTimeout(timer)
        }
    }, [status])



    return (
        <S.Container>
            {status === "REQUESTING" &&
                (ride && ride.price && ride.distance && ride.duration &&
                    <PopUp
                        isDriver={true}
                        pickUpAddress={ride.pickUpAddress}
                        dropOffAddress={ride.dropOffAddress}
                        price={ride.price}
                        distance={ride.distance}
                        duration={ride.duration}
                        id={ride.id}
                        onCancelHandler={() => onCancelHandler(ride.id)}
                        onAcceptHandler={() => onAcceptHandler(ride.id)}
                    />)

            }
        </S.Container>
    )
}

export default DriverHomePresenter