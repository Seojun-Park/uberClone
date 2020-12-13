import { useMutation } from '@apollo/client';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userLogIn } from '../../apollo/authResolvers';
import useInput from '../../Hooks/useInput';
import { verifyPhone, verifyPhoneVariables } from '../../types/api';
import VerifyPhonePresenter from './VerifyPhonePresenter'
import { VERIFY_PHONE } from './VerifyPhoneQueries';

const VerifyPhoneContainer: React.FC<RouteComponentProps> = ({ history }) => {
    const [code, setCode] = useInput("")
    const { state } = history.location
    const { phone }: any = state
    const [verifyPhoneMutation, { loading }] = useMutation<verifyPhone, verifyPhoneVariables>(
        VERIFY_PHONE,
        {
            variables: {
                key: code,
                phoneNumber: phone
            },
            onCompleted: ({ CompletePhoneVerification: result }) => {
                const { ok, error, token } = result
                if (ok) {
                    if (token) {
                        userLogIn(token)
                    }
                    toast.success("Verified, now you are logged in")
                } else {
                    toast.error(error);
                }
            }
        }
    )

    return (
        <VerifyPhonePresenter number={phone} setCode={setCode} onSubmit={verifyPhoneMutation} loading={loading} />
    )
}
export default VerifyPhoneContainer