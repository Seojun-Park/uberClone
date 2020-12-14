import { useMutation } from '@apollo/client';
import React, { FC, useEffect, useState } from 'react'
import MenuPresenter from './MenuPresenter'
import { TOGGLE_DRIVING } from './MenuQueries';
import { toggleDrivingMode } from '../../types/api'
import { ME } from '../Home/HomeQueries';
import { toast } from 'react-toastify';

type MenuProps = {
    user: any
}

const MenuContainer: FC<MenuProps> = ({ user }) => {
    const [isDriving, setIsDriving] = useState(user.isDriving);
    const [toggleDrivingModeMutation] = useMutation<toggleDrivingMode>(TOGGLE_DRIVING, {
        refetchQueries: [{ query: ME }],
    })

    const toggleDriving = () => {
        toggleDrivingModeMutation()
        if (isDriving === true) {
            setIsDriving(false)
        } else {
            setIsDriving(true)
        }
    }

    return (
        <>
            {user ?
                <MenuPresenter user={user} isDriving={isDriving} toggleDriving={toggleDriving} /> : "loading..."
            }
        </>
    )
}

export default MenuContainer