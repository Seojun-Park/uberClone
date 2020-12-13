import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import useInput from '../../Hooks/useInput'
import PhoneLoginPresenter from './PhoneLoginPresenter'


const PhoneLoginContainer: React.FC<RouteComponentProps> = ({ history }) => {
    const [phoneNumber, setPhoneNumber] = useInput("", /^[0-9]*$/)
    const [countryCode, setCountryCode] = useInput("+33");
    // const phoneWithCode = `${countryCode}${phoneNumber}`;
    const onSubmit: React.FormEventHandler = (event) => {
        event.preventDefault();
        console.log(phoneNumber, countryCode)
        console.log("clicked");
    }
    return <PhoneLoginPresenter
        phoneNumber={phoneNumber}
        countryCode={countryCode}
        setPhoneNumber={setPhoneNumber}
        setCountryCode={setCountryCode}
        onSubmit={onSubmit}
    />
}

export default PhoneLoginContainer