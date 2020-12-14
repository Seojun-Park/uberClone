import React, { FC } from 'react'
import { userLogOut } from '../../apollo/authResolvers'
import Menu from '../Menu'
import Sidebar from 'react-sidebar'
import * as S from './HomeStyles'

type HomeProps = {
    isMenuOpen: boolean
    toggleMenu: any
}

const HomePresenter: FC<HomeProps> = ({ isMenuOpen, toggleMenu }) => {

    return (
        <S.Container>
            <Sidebar
                sidebar={<Menu />}
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
            <button onClick={() => userLogOut()}>logout</button>
            Home
        </S.Container >
    )
}

export default HomePresenter