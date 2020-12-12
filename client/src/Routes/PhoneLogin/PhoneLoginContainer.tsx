import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import PhoneLoginPresenter from './PhoneLoginPresenter'


const PhoneLoginContainer: React.FC<RouteComponentProps> = ({ history }) => {
    return <PhoneLoginPresenter />
}

export default PhoneLoginContainer