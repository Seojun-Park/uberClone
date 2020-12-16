import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { userLogOut } from '../../apollo/authResolvers';
import Button from '../../Components/Button';
import Header from '../../Components/Header'
import PlacePresenter from '../../Components/Place/Place';
import * as S from './SettingsStyles'

type SettingProps = {
    user: any
    loading: boolean
    places: any
}

const SettingsPresenter: FC<SettingProps> = ({ user, loading, places }) => {
    return (
        <>
            <Helmet>Settings</Helmet>
            <Header title="Account Settings" backTo="/" />
            <S.Container>
                {!loading && user && (
                    <>
                        <S.GridLink to={`/editAccount/${user.email}`}>
                            <S.Image src={user.profilePhoto} alt="profile Photo" />
                            <S.Keys>
                                <S.Key>{user.fullName}</S.Key>
                                <S.Key>{user.email}</S.Key>
                            </S.Keys>
                        </S.GridLink>
                    </>
                )}
                {places && places.length !== 0 ?
                    places.map((place: any, i: number) =>
                        <PlacePresenter key={i} fav={place.isFav} name={place.name} address={place.address} />)
                    :
                    "Not found my places"}
                <S.SLink to="/place">Go to Places</S.SLink>
                <Button value="LOG OUT" onClick={() => userLogOut()} />
            </S.Container>
        </>
    )
}

export default SettingsPresenter