import React from 'react'
import { Helmet } from 'react-helmet'
import AddressBar from '../../Components/AddressBar'
// import Form from '../../Components/Form'
import * as S from './FindAddressStyles'

interface IProps {
    mapRef: any;
    address: string;
    onPickPlace: () => void;
    submitFn: () => void;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FindAddressPresenter: React.FC<IProps> = ({ mapRef,
    address,
    onInputChange,
    onPickPlace,
    submitFn }) => {
    return (

        <div>
            <Helmet>Find place</Helmet>
            <S.Form onSubmit={() => submitFn()}>
                <AddressBar
                    onBlur={submitFn}
                    onChange={onInputChange}
                    name="address"
                    value={address}
                />
            </S.Form>
            <S.Center>📍</S.Center>
            <S.Button onClick={() => onPickPlace()}>Pick this place</S.Button>
            <S.Map ref={mapRef} />
        </div>
    )
}


export default FindAddressPresenter