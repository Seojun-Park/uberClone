import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { userLogOut } from '../../apollo/authResolvers';
import Button from '../../Components/Button';
import Header from '../../Components/Header'
import PlacePresenter from '../../Components/Place';
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
                                <S.KeyName>{user.fullName}</S.KeyName>
                                <S.Key>{user.email}</S.Key>
                            </S.Keys>
                        </S.GridLink>
                    </>
                )}
                {places && places.length !== 0 ?
                    places.map((place: any, i: number) =>
                        <PlacePresenter key={i} id={place.id} fav={place.isFav} name={place.name} address={place.address} />)
                    :
                    "You don't have any saved places. Add place"}
                <S.SLink to="/places">Go to Places</S.SLink>
                <Button value="LOG OUT" onClick={() => userLogOut()} />
            </S.Container>
        </>
    )
}

export default SettingsPresenter