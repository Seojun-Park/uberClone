import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import useInput from '../../Hooks/useInput'
import PhoneLoginPresenter from './PhoneLoginPresenter'


const PhoneLoginContainer: React.FC<RouteComponentProps> = ({ history }) => {
    const [phoneNumber, setPhoneNumber] = useInput("", /^\+(?:[0-9]●?){6,14}[0-9]$/)
    const [countryCode, setCountryCode] = useInput("+33");
    // const phoneWithCode = `${countryCode}${phoneNumber}`;
    return <PhoneLoginPresenter
        phoneNumber={phoneNumber}
        countryCode={countryCode}
        setPhoneNumber={setPhoneNumber}
        setCountryCode={setCountryCode}
    />
}

export default PhoneLoginContainer