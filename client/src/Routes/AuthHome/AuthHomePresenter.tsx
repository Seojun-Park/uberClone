import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import * as S from './AuthHomeStyles'

const AuthHomePresenter = () => {
    return (
        <S.Container>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <S.Header>
                <S.Logo>
                    <S.Title>Logo</S.Title>
                </S.Logo>
            </S.Header>
            <S.Footer>
                <Link to="phoneLogin">
                    <S.PhoneLogin>
                        <S.Subtitle>Travel with Me</S.Subtitle>
                        <S.FakeInput>
                            🇫🇷 +33 <S.Grey>Enter your phone number here</S.Grey>
                        </S.FakeInput>
                    </S.PhoneLogin>
                </Link>
                <Link to="/socialLogin">
                    <S.SocialLogin>
                        <S.SocialLink>Or connect with your social media</S.SocialLink>
                    </S.SocialLogin>
                </Link>
            </S.Footer>
        </S.Container>
    )
}

export default AuthHomePresenter