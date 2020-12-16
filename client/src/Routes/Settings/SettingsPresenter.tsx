import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../Components/Header'
import PlacePresenter from '../../Components/Place/Place';
import * as S from './SettingsStyles'

const SettingsPresenter = () => {
    return (
        <>
            <Helmet>Settings</Helmet>
            <Header title="Account Settings" backTo="/" />
            <S.Container>
                <S.GridLink to={"/editAccount"}>

                </S.GridLink>
                <PlacePresenter fav={false} name="Home" address="Paris" />
                <PlacePresenter fav={false} name="Home" address="Paris" />
                <PlacePresenter fav={false} name="Home" address="Paris" />
                <S.SLink to="/place">Go to Places</S.SLink>
                <S.FakeLink>Log Out</S.FakeLink>
            </S.Container>
        </>
    )
}

export default SettingsPresenter