import React from 'react'
import { userLogIn } from '../../apollo/authResolvers'

const OutHomePresenter = () => {
    return (
        <>
            <button onClick={() => userLogIn("token")}> login</button>
            OutHome
        </>
    )
}

export default OutHomePresenter