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
        },
        onCompleted: ({ FacebookConnect: result }) => {
            const { ok, error, token } = result;
            if (ok) {
                if (token) {
                    userLogIn(token)
                    toast.success("Connected. You are logged in now")
                }
            } else {
                toast.error(error)
            }

        }
    }
    )

    const onSubmit: React.FormEventHandler = async (event) => {
        event.preventDefault();
        await facebookConnectMutation();

    }
    return (
        <SocialLoginPresenter
            setFirstName={setFirstName}
            setLastName={setLastName}
            setEmail={setEmail}
            setFbId={setfbId}
            onSubmit={onSubmit}
        />
    )
}

export default SocialLoginContainer