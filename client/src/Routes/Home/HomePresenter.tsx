import React, { FC } from 'react'
import Menu from '../Menu'
import Sidebar from 'react-sidebar'
import * as S from './HomeStyles'

type HomeProps = {
    isMenuOpen: boolean
    toggleMenu: any
    user: any
}

const HomePresenter: FC<HomeProps> = ({ isMenuOpen, toggleMenu, user }) => {

    return (
        <>
            {user ?
                <S.Container>
                    <Sidebar
                        sidebar={<Menu user={user} />}
                        open={isMenuOpen}
                        onSetOpen={toggleMenu}
                        styles={{
                            sidebar: {
                                backgroundColor: "white",
                                width: "80%",
                                zIndex: "10"
                            }
                        }}
                    >
                        <S.Button onClick={() => toggleMenu()}>|||</S.Button>
                    </Sidebar>
            Home
        </S.Container > : "loading..."}
        </>
    )
}

export default HomePresenter