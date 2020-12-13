import React, { FC, ReactElement } from 'react';
import Helmet from 'react-helmet'
import FacebookLogin from 'react-facebook-login'
import * as S from './SocialLoginStyles'

type SocialProps = {
    setFirstName: any,
    setLastName: any,
    setEmail?: any,
    setFbId: any
    onSubmit: any;
}


const SocialLoginPresenter: FC<SocialProps> = ({
    setFirstName,
    setLastName,
    setEmail,
    setFbId,
    onSubmit
}): ReactElement => {
    const responseFacebook = ({ name, email, userID }: any) => {
        setFirstName(name.split(" ")[0])
        setLastName(name.split(" ")[name.split(" ").length - 1])
        setEmail(email)
        setFbId(userID)
        onSubmit();
    }

    return (
        <S.Container>
            <Helmet><title>Social Media Login</title></Helmet>
            <S.Title>Choose an account</S.Title>
            <S.BackArrowExtended backTo={"/"} />
            <FacebookLogin
                appId="1145142179254310"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
            />

        </S.Container>
    )
}
export default SocialLoginPresenter