import React from 'react';
import Helmet from 'react-helmet'
import Input from '../../Hooks/Input'
import { countries } from '../../Asset/countries'
import * as S from './PhoneLoginStyles'

const PhoneLoginPresenter = () => {
    return (
        <S.Container>
            <Helmet><title>Phone Login</title></Helmet>
            <S.BackArrowExtended backTo={"/"} />
            <S.Title>Enter your phone number</S.Title>
            <S.CountrySelect>
                {countries.map((country: any, i: number) => (
                    <S.CountryOption key={i} value={country.dial_code}>
                        {country.flag} {country.name} ({country.dial_code})
                    </S.CountryOption>
                ))}
            </S.CountrySelect>
            <S.Form>
                <Input placeholder={"Phone number"}></Input>
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