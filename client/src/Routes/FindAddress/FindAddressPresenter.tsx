import React from 'react'
import { Helmet } from 'react-helmet'
import AddressBar from '../../Components/AddressBar'
import Form from '../../Components/Form'
import * as S from './FindAddressStyles'

interface IProps {
    mapRef: any;
    address: string;
    onPickPlace: () => void;
    submitFn: () => void;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FindAddressPresenter: React.FC<IProps> = ({
    mapRef,
    address,
    onPickPlace,
    submitFn,
    onInputChange
}) => {

    return (
        <div className="map-container">
            <Helmet>Find place</Helmet>
            <Form submitFn={submitFn}>
                <AddressBar
                    onBlur={submitFn}
                    onChange={onInputChange}
                    name={"address"}
                    value={address}
                />
            </Form>
            <S.ExtendedButton value={"Puck thisPlace"} onClick={onPickPlace} />
            <S.Map ref={mapRef} />
        </div>
    )
}


export default FindAddressPresenter