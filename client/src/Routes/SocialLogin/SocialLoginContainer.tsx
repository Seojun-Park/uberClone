import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { userLogIn } from '../../apollo/authResolvers';
import { facebookConnect, facebookConnectVariables } from '../../types/api';
import SocialLoginPresenter from './SocialLoginPresenter'
import { FACEBOOK_CONNECT } from './SocialLoginQueries'


const SocialLoginContainer = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [fbId, setfbId] = useState("")
    const [facebookConnectMutation] = useMutation<facebookConnect, facebookConnectVariables>(
        FACEBOOK_CONNECT, {
        variables: {
            firstName,
            lastName,
            email,
            fbId
        }, onCompleted: ({ FacebookConnect: result }) => {
            const { ok, error, token } = result;
            if (ok) {
                if (token) {
                    userLogIn(token)
                    toast.success("Connected. now you are logged In")
                }
            } else {
                toast.error(error)
            }
        }
    }
    )

    return (
        <SocialLoginPresenter
            setFirstName={setFirstName}
            setLastName={setLastName}
            setEmail={setEmail}
            setFbId={setfbId}
            fbMutation={facebookConnectMutation}
        />
    )
}

export default SocialLoginContainer