import { useMutation, useQuery } from '@apollo/client';
import { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { VERIFY_EMAIL, GET_VALIDATION } from './VerifyEmailQueris'
import { ME } from '../../sharedQueries'

const VerifyEmailPresenter: FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState(null)
    const [key, setKey] = useState(null)
    const [flag, setFlag] = useState(false)
    const [verifyEmailMutation] = useMutation(VERIFY_EMAIL, {
        variables: { key }
    })
    const { loading } = useQuery(ME, {
        onCompleted: v => {
            if (v.Me.ok) {
                setEmail(v.Me.user.email)
            }
        }
    })
    useQuery(GET_VALIDATION, {
        variables: { email },
        skip: email === null,
        onCompleted: v => {
            if (v.GetValidation.ok) {
                setKey(v.GetValidation.verification.key)
            }
        }
    })

    useEffect(() => {
        const abortController = new AbortController();
        const mutationEffect = async () => {
            await verifyEmailMutation();
        };
        if (flag === true) {
            mutationEffect();
            history.push("/")
            window.location.reload()
        }
        return () => {
            abortController.abort();
        }
    }, [verifyEmailMutation, flag, history])

    if (loading || email === null || key === null) {
        return <>verifying your email...</>
    }
    return (
        <>
            loading
            {setTimeout(() => { setFlag(true) }, 2000)}
        </>
    )
}
export default VerifyEmailPresenter