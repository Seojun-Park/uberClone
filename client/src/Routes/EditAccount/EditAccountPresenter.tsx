import React, { FC } from 'react';
import Helmet from 'react-helmet'
import Button from '../../Components/Button';
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
            <Helmet>Edit Account</Helmet>
            <Header title={"Edit Account"} backTo={"/"} />
            <S.ExtendedForm submitFn={null}>
                <S.Input placeholder="First name" />
                <S.Input placeholder="Last name" />
                <S.Input placeholder="Email" />
                <Button value="Update" onClick={null} />
            </S.ExtendedForm>
        </S.Container>
    )
}

export default EditAccountPresenter