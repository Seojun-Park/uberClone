import React, { FC } from 'react';
import * as S from './MenuStyles'
import { Link } from 'react-router-dom'
import Button from '../../Components/Button';
import { userLogOut } from '../../apollo/authResolvers';

type MenuProps = {
    user: any
    isDriving: boolean
    toggleDriving: any
}

const MenuPresenter: FC<MenuProps> = ({ user, toggleDriving, isDriving }) => {
    return (
        <S.Container >
            <S.Header>
                <S.Grid>
                    <Link to={{
                        pathname: "/editAccount",
                        state: { user }
                    }} >
                        <S.Image src={user.profilePhoto ? user.profilePhoto : "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"} />
                    </Link>
                    <S.Text>
                        <S.Name>{user.fullName}</S.Name>
                        <S.Rating>4.5</S.Rating>
                    </S.Text>
                </S.Grid>
            </S.Header>
            <S.SLink to="/trips">Your Trips</S.SLink>
            <S.SLink to="/settings">Settings</S.SLink>
            <S.ToggleDriving onClick={toggleDriving} isDriving={isDriving}>
                {isDriving ? "Stop driving" : "Start drinvg"}
            </S.ToggleDriving>
            <Button value="LOG OUT" onClick={() => userLogOut()} />
        </S.Container >
    )
}

export default MenuPresenter