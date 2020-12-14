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
                                width: "80%",
                                backgroundColor: "white",
                                zIndex: "10"
                            }
                        }}
                    >
                        <button onClick={() => toggleMenu()}>open</button>
                    </Sidebar>
            Home
        </S.Container > : "loading..."}
        </>
    )
}

export default HomePresenter