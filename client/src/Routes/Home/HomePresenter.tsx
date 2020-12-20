import React, { FC } from 'react'
import Menu from '../Menu'
import Sidebar from 'react-sidebar'
import * as S from './HomeStyles'

type HomeProps = {
    mapRef: any;
    isMenuOpen: boolean
    toggleMenu: any
    user: any
}

const HomePresenter: FC<HomeProps> = ({ isMenuOpen, toggleMenu, user, mapRef }) => {

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
                                width: "70%",
                                zIndex: "10"
                            }
                        }}
                    >
                        <S.Button onClick={() => toggleMenu()}>|||</S.Button>
                    </Sidebar>
                </S.Container > : "loading..."}
            <S.Map ref={mapRef} />
        </>
    )
}

export default HomePresenter