import { useMutation } from '@apollo/client'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { toast } from 'react-toastify'
import useInput from '../../Hooks/useInput'
import { StartPhoneVerification, StartPhoneVerificationVariables } from '../../types/api'
import PhoneLoginPresenter from './PhoneLoginPresenter'
import { PHONE_SIGN_IN } from './PhoneQueries'


const PhoneLoginContainer: React.FC<RouteComponentProps> = ({ history }) => {
    const [phoneNumber, inputChange] = useInput("", /^[0-9]*$/)
    const [countryCode, selectChange] = useInput("+33");
    const phoneWithCode = `${countryCode}${phoneNumber}`;
    const [StartPhoneVerificationMutation] = useMutation<StartPhoneVerification, StartPhoneVerificationVariables>(
        PHONE_SIGN_IN, {
        variables: {
            phoneNumber: phoneWithCode
        },
        onCompleted: ({ StartPhoneVerification: result }) => {
            const { ok, error } = result;
            const phone = phoneWithCode
            if (ok) {
                toast.success("Secret code has sent to your phone")
                setTimeout(() => {
                    history.push({
                        pathname: "/verifyPhone",
                        state: {
                            phone
                        }
                    })
                }, 2000)
            } else {
                toast.error(error)
            }
        }
    }
    )

    const onSubmit: React.FormEventHandler = async (event) => {
        event.preventDefault();
        await StartPhoneVerificationMutation();
    }
    return <PhoneLoginPresenter
        phoneNumber={phoneNumber}
        countryCode={countryCode}
        inputchange={inputChange}
        selectChange={selectChange}
        onSubmit={onSubmit}
    />
}

export default PhoneLoginContainer