import { useMutation } from '@apollo/client';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userLogIn } from '../../apollo/authResolvers';
import { forceHistory } from '../../Hooks/forceHistory';
import useInput from '../../Hooks/useInput';
import { verifyPhone, verifyPhoneVariables } from '../../types/api';
import VerifyPhonePresenter from './VerifyPhonePresenter'
import { VERIFY_PHONE } from './VerifyPhoneQueries';

interface IProps extends RouteComponentProps {
    location: any
}

const VerifyPhoneContainer: React.FC<IProps> = ({ history, location }) => {
    if (!location.state.phoneNumber) {
        history.push("/phoneLogin")
    }
    const [code, setCode] = useInput("")
    const { state } = history.location
    const { phoneNumber: phone }: any = state
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
                        toast.success("Verified, now you are logged in")
                        forceHistory.push("/");
                    } else {
                        toast.info("Phone number is verified. Sign up now")
                        history.push({
                            pathname: "/signup",
                            state: { phoneNumber: phone }
                        })
                    }
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