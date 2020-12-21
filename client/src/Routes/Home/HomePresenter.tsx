import React, { FC } from 'react'
import Menu from '../Menu'
import Sidebar from 'react-sidebar'
import * as S from './HomeStyles'
import { ICoords } from '../../Hooks/MapHelper'

type HomeProps = {
    map?: google.maps.Map<Element>;
    userMarker?: google.maps.Marker
    coords: ICoords;
    user?: any;
    isMenuOpen: boolean
    toggleMenu: any
    setMap: React.Dispatch<React.SetStateAction<google.maps.Map<Element> | undefined>>
}

const HomePresenter: FC<HomeProps> = ({
    isMenuOpen,
    toggleMenu,
    user,
    map,
    userMarker,
    setMap
}) => {
    console.log(user)
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
                    {user!.isDriving ? (
                        "drivier"
                    ) : "passenger"}
                    
                </S.Container > : "loading..."}
        </>
    )
}

export default HomePresenter