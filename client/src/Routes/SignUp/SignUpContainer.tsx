import { useMutation } from '@apollo/client';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useInput from '../../Hooks/useInput';
import SignUpPresenter from './SignUpPresenter'
import { EMAIL_SIGNUP, REQUEST_EMAIL_VERYFICATION } from './SignUpQueries';
import { emailSignUp, emailSignUpVariables, requestEmailVerification } from '../../types/api'
import { toast } from 'react-toastify';
import { userLogIn } from '../../apollo/authResolvers';


const SignUpContainer: React.FC<RouteComponentProps> = ({ history: { location } }) => {
    const { phoneNumber }: any = location.state
    const [firstName, fNameChange] = useInput("")
    const [lastName, lNameChange] = useInput("")
    const [email, emailChange] = useInput("")
    const [password, passwordChange] = useInput("")
    const [profilePhoto, profilePhotoChange] = useInput("")
    const [requestEmailVerification] = useMutation<requestEmailVerification>(REQUEST_EMAIL_VERYFICATION);
    const [emailSignUpMutation, { loading }] = useMutation<emailSignUp, emailSignUpVariables>(EMAIL_SIGNUP, {
        variables: {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            profilePhoto,
        },
        onCompleted: async ({ EmailSignUp: result }) => {
            const { ok, error, token } = result
            if (ok) {
                if (token) {
                    toast.success(`Welcome ${firstName}!`)
                    await userLogIn(token);
                } else {
                    toast.error("Something wrong")
                }
            } else {
                toast.error(error)
            }
        }
    })


    const onSubmit: React.FormEventHandler = async (event) => {
        event.preventDefault()
        await requestEmailVerification();
        await emailSignUpMutation()
    }

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