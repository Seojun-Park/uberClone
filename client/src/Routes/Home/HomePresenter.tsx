import React from 'react'
import { userLogOut } from '../../apollo/authResolvers'

const HomePresenter = () => {
    return (
        <>
            <button onClick={() => userLogOut()}>logout</button>
            Home
        </>
    )
}

export default HomePresenter