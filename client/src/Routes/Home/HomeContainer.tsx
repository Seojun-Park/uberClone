import { useQuery } from '@apollo/client'
import React, { FC, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import HomePresenter from './HomePresenter'
import { ME } from '../../sharedQueries'
import * as S from './HomeStyles'

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
        return (
            <S.LoadingContainer>
                <div>loading...</div>
                <div>If the loading too long, please refresh</div>
                <S.ReloadButton onClick={() => window.location.reload()}>Reload</S.ReloadButton>
            </S.LoadingContainer>
        )
    } else {
        return (
            <HomePresenter isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} user={user} />
        )
    }
}

export default HomeContainer