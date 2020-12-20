import React, { FC } from 'react'
import { Helmet } from 'react-helmet'
import Button from '../../Components/Button'
import Header from '../../Components/Header'
import * as S from './AddPlaceStyles'

type AddPlaceProps = {
    address: string
    name: string
    setAddress: any
    setName: any
    loading: boolean
    onSubmit: any
    setLat: any
    setLng: any
    lng: number
    lat: number
    pickedAddress: boolean
    addAddress: string
}

const AddPlacePresenter: FC<AddPlaceProps> = ({
    address,
    name,
    setAddress,
    setName,
    loading,
    onSubmit,
    setLat,
    setLng,
    lng,
    lat,
    pickedAddress,
    addAddress
}) => {
    return (
        <>
            <Helmet>Add Place</Helmet>
            <Header title="Add Place" backTo={"/places"} />
            <S.Container>
                <S.Input placeholder="Name" value={name} onChange={setName} />
                {addAddress === undefined ?
                    <S.Input placeholder="Address" value={address} onChange={setAddress} /> :
                    <S.Input placeholder="Address" value={addAddress} onChange={() => console.log("picked")} />
                }
                <S.ExtendedLink to={"/findAddress"}>Pick place from map</S.ExtendedLink>
                {pickedAddress && <Button onClick={() => onSubmit()} value={loading ? "Adding Place" : "Add Place"} />}
            </S.Container>
        </>
    )
}
export default AddPlacePresenter