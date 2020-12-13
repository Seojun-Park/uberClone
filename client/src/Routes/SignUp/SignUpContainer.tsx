import { useMutation } from '@apollo/client';
import React, { ReactEventHandler } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useInput from '../../Hooks/useInput';
import SignUpPresenter from './SignUpPresenter'
import { EMAIL_SIGNUP } from './SignUpQueries';


const SignUpContainer: React.FC<RouteComponentProps> = ({ history: { location } }) => {
    const { phoneNumber }: any = location.state
    const [firstName, fNameChange] = useInput("")
    const [lastName, lNameChange] = useInput("")
    const [email, emailChange] = useInput("")
    const [password, passwordChange] = useInput("")
    const [profilePhoto, profilePhotoChange] = useInput("")
    const [emailSignUpMutation, { loading }] = useMutation(EMAIL_SIGNUP, {
        variables: {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            profilePhoto,
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
            fNameChange={fNameChange}
            lNameChange={lNameChange}
            emailChange={emailChange}
            passwordChange={passwordChange}
            profilePhotoChange={profilePhotoChange}
            phoneNumber={phoneNumber}
            loading={loading}
            onSubmit={onSubmit} />
    )
}

export default SignUpContainer