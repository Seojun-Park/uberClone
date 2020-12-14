import React, { FC } from 'react';
import Helmet from 'react-helmet'
import Header from '../../Components/Header';
import * as S from './EditAccountStyles'

type EditProps = {
    email: any
    firstName: any
    lastName: any
    profilePhoto: any
}

const EditAccountPresenter: FC<EditProps> = ({
    email,
    firstName,
    lastName,
    profilePhoto }
) => {
    return (
        <S.Container>
            <Helmet></Helmet>
            <Header title={"Edit Account"} backTo={"/"} />
        </S.Container>
    )
}

export default EditAccountPresenter