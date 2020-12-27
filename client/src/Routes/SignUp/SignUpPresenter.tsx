import React, { FC, ReactElement } from 'react'
import Helmet from 'react-helmet'
import Button from '../../Components/Button'
import Header from '../../Components/Header'
import * as S from './SignUpStyles'

interface IInputHandler {
    label: string;
    onChange: (event: React.ChangeEvent<Element>) => any;
    type?: string;
    value: string;
}


type SignUpProps = {
    firstName: any
    lastName: any,
    email: any,
    password: any,
    phoneNumber: any,
    loading: boolean,
    onSubmit: any
}

const renderInputs = (inputArr: IInputHandler[]) => {
    return inputArr.map(input => {
        return (
            <div key={input.label}>
                <S.Label label={input.label} />
                <S.ExtendedInput
                    type={input.type || "text"}
                    value={input.value}
                    onChange={input.onChange}
                />
            </div>
        );
    });
}

const SignUpPresenter: FC<SignUpProps> = ({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    loading,
    onSubmit }): ReactElement => {
    return (
        <S.Container>
            <Helmet><title>Sign Up</title></Helmet>
            <Header title="Sign Up" />
            <S.ExtendedForm submitFn={onSubmit}>
                {renderInputs([
                    firstName,
                    lastName,
                    email,
                    password
                ])}
                <Button value={loading ? "Signing Up..." : "Submit"} disabled={loading} />
            </S.ExtendedForm>
        </S.Container>
    )
}

export default SignUpPresenter