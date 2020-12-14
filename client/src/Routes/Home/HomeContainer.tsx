import { useQuery } from '@apollo/client'
import React, { FC, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import HomePresenter from './HomePresenter'
import { ME } from './HomeQueries'

const HomeContainer: FC<RouteComponentProps> = ({ history }): any => {
    const [user, setUser] = useState(null)
    const { loading } = useQuery(ME, {
        onCompleted: v => {
            if (v.Me.ok) {
                setUser(v.Me.user)
                if (v.Me.user.verifiedEmail === false) {
                    history.push("/verifyEmail")
                }
            }
        }
    })
    console.log(user)
    if (loading) {
        return <>loading...</>
    } else {
        return (
            <HomePresenter />
        )
    }
}

export default HomeContainer