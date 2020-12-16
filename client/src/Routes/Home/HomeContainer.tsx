import { useQuery } from '@apollo/client'
import React, { FC, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import HomePresenter from './HomePresenter'
import { ME } from '../../sharedQueries'

const HomeContainer: FC<RouteComponentProps> = ({ history }): any => {
    const [user, setUser] = useState(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { loading } = useQuery(ME, {
        fetchPolicy: "cache-and-network",
        onCompleted: v => {
            if (v.Me.ok) {
                setUser(v.Me.user)
                if (v.Me.user.verifiedEmail === false) {
                    history.push("/verifyEmail")
                }
            }
        }
    })

    const toggleMenu = (): any => !isMenuOpen ? setIsMenuOpen(true) : setIsMenuOpen(false)

    if (loading) {
        return <>loading...</>
    } else {
        return (
            <HomePresenter isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} user={user} />
        )
    }
}

export default HomeContainer