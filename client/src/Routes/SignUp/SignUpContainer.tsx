import { useMutation } from '@apollo/client';
import React, { ReactEventHandler, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useInput from '../../Hooks/useInput';
import SignUpPresenter from './SignUpPresenter'
import { EMAIL_SIGNUP } from './SignUpQueries';


const SignUpContainer: React.FC<RouteComponentProps> = ({ history: { location } }) => {
    const { phoneNumber }: any = location.state
    const [firstName, setFirstName] = useInput("")
    const [lastName, setLastName] = useInput("")
    const [email, setEmail] = useInput("")
    const [password, setPassword] = useInput("")
    const [profilePhoto, setProfilePhoto] = useInput("")
    const [age, setAge] = useInput("")
    const [emailSignUpMutation, { loading }] = useMutation(EMAIL_SIGNUP, {
        variables: {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            profilePhoto,
            age
        }
    })


    const onSubmit: ReactEventHandler = async (event) => {
        event.preventDefault()
        // await emailSignUpMutation()
    }
    console.log(firstName, lastName)

    return (
        <SignUpPresenter
            firstName={firstName}
            lastName={lastName}
            email={email}
            password={password}
            profilePhoto={profilePhoto}
            age={age}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setEmail={setEmail}
            setPassword={setPassword}
            setProfilePhoto={setProfilePhoto}
            phoneNumber={phoneNumber}
            setAge={setAge}
            loading={loading}
            onSubmit={onSubmit} />
    )
}

export default SignUpContainer