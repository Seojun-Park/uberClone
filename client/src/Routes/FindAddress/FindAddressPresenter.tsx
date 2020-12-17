import React from 'react'
import { Helmet } from 'react-helmet'
import Map from '../../Components/Map'
import * as S from './FindAddressStyles'

const FindAddressPresenter = () => {

    return (
        <div className="map-container">
            <Helmet>Find place</Helmet>
            <Map
                mapType={google.maps.MapTypeId.ROADMAP}
                mapTypeControl={true}
            />
        </div>
    )
}


export default FindAddressPresenter