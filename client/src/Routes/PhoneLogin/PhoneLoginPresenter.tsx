import React, { FC, ReactElement } from 'react';
import Helmet from 'react-helmet'
import Form from '../../Components/Form';
import Header from '../../Components/Header';
import Input from '../../Components/Input'
import Select from '../../Hooks/Select'
import * as S from './PhoneLoginStyles'

type PhoneProps = {
    phoneNumber: string,
    countryCode: string,
    onSubmit: any,
    inputchange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    selectChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
}

const PhoneLoginPresenter: FC<PhoneProps> = ({ phoneNumber, countryCode, inputchange, selectChange, onSubmit }): ReactElement => {
    return (
        <S.Container>
            <Helmet><title>Phone Login</title></Helmet>
            <Header title="Phone Login" backTo={"/login"} />
            <S.Title>Enter your phone number</S.Title>
            <div style={{ padding: "20px" }}>
                <Form submitFn={onSubmit}>
                    <Select action="countryselect" onSelect={selectChange} />
                    <Input
                        placeholder="Phone number here"
                        value={phoneNumber}
                        type="text"
                        name="phoneNumber"
                        onChange={inputchange}
                        autoFocus={true}
                    />
                    <S.Button type="submit">
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
                </Form>
            </div>
        </S.Container>
    )
}

export default PhoneLoginPresenter