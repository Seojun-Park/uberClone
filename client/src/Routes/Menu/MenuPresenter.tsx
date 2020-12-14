import React from 'react';
import * as S from './MenuStyles'
import { Link } from 'react-router-dom'

const MenuPresenter = () => {
    return (
        <S.Container>
            <S.Header>
                <S.Grid>
                    <Link to="/editAccount">
                        <S.Image src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg" />
                    </Link>
                    <S.Text>
                        <S.Name>Name</S.Name>
                        <S.Rating>4.5</S.Rating>
                    </S.Text>
                </S.Grid>
            </S.Header>
            <S.SLink to="/trips">Your Trips</S.SLink>
            <S.SLink to="/settings">Settins</S.SLink>
            <S.ToggleDriving isDriving={true}>
                {true ? "Stop driving" : "Start drinvg"}
            </S.ToggleDriving>
        </S.Container>
    )
}

export default MenuPresenter