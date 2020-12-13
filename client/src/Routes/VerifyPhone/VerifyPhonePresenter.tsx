import React, { FC, ReactElement } from 'react'
import Helmet from 'react-helmet'
import Button from '../../Components/Button'
import Form from '../../Components/Form'
import Header from '../../Components/Header'
import * as S from './VerifyPhoneStyles'

type VerifyProps = {
    number: string
    setCode: any
    onSubmit: any
    loading: boolean
}

const VerifyPhonePresenter: FC<VerifyProps> = ({ number, setCode, onSubmit, loading }): ReactElement => {
    return (
        <S.Container>
            <Helmet>
                <title>Verify Phone</title>
            </Helmet>
            <Header backTo="/phoneLogin" title="Verify Phone Number" />
            <Form submitFn={onSubmit}>
                <S.ExtendedInput
                    value={number}
                    placeholder={"Enter your Secret code"}
                    onChange={setCode}
                    name="code"
                />
                <Button value={loading ? "Verifying" : "Submit"} onClick={null} disabled={loading} />
            </Form>
        </S.Container>
    )
}
export default VerifyPhonePresenter