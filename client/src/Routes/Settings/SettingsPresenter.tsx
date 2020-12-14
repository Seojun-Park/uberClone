import React from 'react';
import Header from '../../Components/Header'
import * as S from './SettingsStyles'

const SettingsPresenter = () => {
    return (
        <S.Container>
            <Header title="Account Settings" backTo="/" />
        </S.Container>
    )
}

export default SettingsPresenter