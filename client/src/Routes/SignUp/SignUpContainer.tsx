import { useMutation } from '@apollo/client';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useInput from '../../Hooks/useInput';
import SignUpPresenter from './SignUpPresenter'
import { EMAIL_SIGNUP, REQUEST_EMAIL_VERYFICATION } from './SignUpQueries';
import { emailSignUp, emailSignUpVariables, requestEmailVerification } from '../../types/api'
import { toast } from 'react-toastify';
import { userLogIn } from '../../apollo/authResolvers';

interface IProps extends RouteComponentProps<{}, {}, any> { }

const SignUpContainer: React.FC<IProps> = ({ history, location }) => {
    if (!location.state && !location.state.phoneNumber) {
        history.push("/");
    }
    const { state: { phoneNumber } }: any = location
    const [firstName, setFirstName] = useInput("")
    const [lastName, setLastName] = useInput("")
    const [email, setEmail] = useInput("")
    const [password, setPassword] = useInput("")
    const [requestEmailVerification] = useMutation<requestEmailVerification>(REQUEST_EMAIL_VERYFICATION);
    const [emailSignUpMutation, { loading }] = useMutation<emailSignUp, emailSignUpVariables>(EMAIL_SIGNUP, {
        variables: {
            firstName,
            lastName,
            email,
            password,
            phoneNumber
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


    const onSubmit: React.FormEventHandler = () => {
        if (!password){
            toast.error("you have to type password")
            return ;
        }
        requestEmailVerification();
        emailSignUpMutation()
    }

    return (
        <SignUpPresenter
            firstName={{
                label: "First Name",
                onChange: setFirstName,
                value: firstName
            }}
            lastName={{
                label: "Last Name",
                onChange: setLastName,
                value: lastName
            }}
            email={{
                label: "Email",
                onChange: setEmail,
                value: email
            }}
            password={{
                label: "Password",
                onChange: setPassword,
                type: "password",
                value: password
            }}
            phoneNumber={phoneNumber}
            loading={loading}
            onSubmit={onSubmit} />
    )
}

export default SignUpContainer