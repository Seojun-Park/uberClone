import React, { FC, ReactElement } from 'react';
import Helmet from 'react-helmet'
import Input from '../../Hooks/Input'
import SelectHook from '../../Hooks/SelectHook'
import * as S from './PhoneLoginStyles'

type PhoneProps = {
    phoneNumber: string,
    countryCode: string,
    setPhoneNumber: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    setCountryCode: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
}

const PhoneLoginPresenter: FC<PhoneProps> = ({ phoneNumber, countryCode, setPhoneNumber, setCountryCode }): ReactElement => {
    return (
        <S.Container>
            <Helmet><title>Phone Login</title></Helmet>
            <S.BackArrowExtended backTo={"/"} />
            <S.Title>Enter your phone number</S.Title>
            <S.Form>
                <SelectHook action="countryselect" onSelect={setCountryCode} />
                <Input
                    placeholder="Phone number here"
                    value={phoneNumber}
                    type="text"
                    name="phoneNumber"
                    onChange={setPhoneNumber}
                    autoFocus={true}
                />
                <S.Button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={"white"}
                    >
                        <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
                    </svg>
                </S.Button>
            </S.Form>
        </S.Container>
    )
}

export default PhoneLoginPresenter