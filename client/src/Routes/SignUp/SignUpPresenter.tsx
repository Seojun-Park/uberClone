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
    fNameChange: any,
    lNameChange: any,
    emailChange: any,
    passwordChange: any,
    profilePhotoChange: any,
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
    fNameChange,
    lNameChange,
    emailChange,
    passwordChange,
    profilePhotoChange,
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
                    onChange={fNameChange}
                    name="firstName"
                />
                <S.ExtendedInput
                    value={lastName}
                    placeholder={"Last Name"}
                    onChange={lNameChange}
                    name="lastName"
                />
                <S.ExtendedInput
                    value={email}
                    placeholder={"Email Address"}
                    onChange={emailChange}
                    type="email"
                    name="email"
                />
                <S.ExtendedInput
                    value={password}
                    placeholder={"Password"}
                    onChange={passwordChange}
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