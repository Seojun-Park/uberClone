import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import useInput from '../../Hooks/useInput'
import PhoneLoginPresenter from './PhoneLoginPresenter'


const PhoneLoginContainer: React.FC<RouteComponentProps> = ({ history }) => {
    const [phoneNumber, onInputChange] = useInput("", /^\+(?:[0-9]●?){6,14}[0-9]$/)
    const [countryCode, onSelctChange] = useInput("+33");
    // const phoneWithCode = `${countryCode}${phoneNumber}`;
    return <PhoneLoginPresenter
        phoneNumber={phoneNumber}
        countryCode={countryCode}
        onInputChange={onInputChange}
        onSelectChange={onSelctChange}
    />
}

export default PhoneLoginContainer