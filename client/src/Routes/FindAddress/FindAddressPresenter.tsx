import React, { FC } from 'react'
import { Helmet } from 'react-helmet'
import * as S from './FindAddressStyles'

type Types = {
    mapRef: any
}

const FindAddressPresenter: FC<Types> = ({
    mapRef
}) => {
    return (
        <div>
            <Helmet>FindPlace</Helmet>
            <S.Map ref={mapRef} />
        </div>
    )
}


export default FindAddressPresenter