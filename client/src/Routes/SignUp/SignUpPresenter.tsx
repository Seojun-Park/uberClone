import React, { FC, ReactElement } from 'react'
import Helmet from 'react-helmet'
import Button from '../../Components/Button'
import Header from '../../Components/Header'
import * as S from './SignUpStyles'

type SignUpProps = {
    firstName: any
    lastName: any,
    email: any,
    password: any,
    profilePhoto: any,
    phoneNumber: any,
    setFirstName: any,
    setLastName: any,
    setEmail: any,
    setPassword: any,
    setProfilePhoto: any,
    loading: boolean,
    onSubmit: any
}

const SignUpPresenter: FC<SignUpProps> = ({
    firstName,
    lastName,
    email,
    password,
    profilePhoto,
    phoneNumber,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setProfilePhoto,
    loading,
    onSubmit }): ReactElement => {
    return (
        <S.Container>
            <Helmet>Sign Up</Helmet>
            <Header title="Sign Up" />
            <S.ExtendedForm submitFn={onSubmit}>
                <S.ExtendedInput
                    value={firstName}
                    placeholder={"First Name"}
                    onChange={setFirstName}
                    name="firstName"
                />
                <S.ExtendedInput
                    value={lastName}
                    placeholder={"Last Name"}
                    onChange={setLastName}
                    name="lastName"
                />
                <S.ExtendedInput
                    value={email}
                    placeholder={"Email Address"}
                    onChange={setEmail}
                    type="email"
                    name="email"
                />
                <S.ExtendedInput
                    value={password}
                    placeholder={"Password"}
                    onChange={setPassword}
                    type="password"
                    name="password"
                />
                <S.ExtendedInput
                    value={phoneNumber}
                    placeholder={"Phone Number"}
                    onChange={null}
                    name="phonNumber"
                />
                <Button value={loading ? "Signing Up..." : "Submit"} onClick={null} disabled={loading} />
            </S.ExtendedForm>
        </S.Container>
    )
}

export default SignUpPresenter