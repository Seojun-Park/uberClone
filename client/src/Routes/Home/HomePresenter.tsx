import React, { FC, useEffect, useState } from 'react'
import Menu from '../Menu'
import Sidebar from 'react-sidebar'
import * as S from './HomeStyles'
import { ICoords } from '../../Hooks/MapHelper'
import PassengerHome from '../../Components/PassengerHome'
import Map from '../../Components/Map'

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
    coords,
    user,
    map,
    userMarker,
    setMap
}) => {
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
                        "driver"
                    ) : <PassengerHome
                            map={map}
                            marker={userMarker}
                            coords={coords}
                            user={user}
                        />}
                    <Map setMap={setMap} isHome={true} />
                </S.Container > : "loading..."}
        </>
    )
}

export default HomePresenter