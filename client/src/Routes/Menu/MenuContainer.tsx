import { useMutation } from '@apollo/client';
import React, { FC, useState } from 'react'
import MenuPresenter from './MenuPresenter'
import { TOGGLE_DRIVING } from './MenuQueries';
import { toggleDrivingMode } from '../../types/api'
// import { ME } from '../../sharedQueries';

type MenuProps = {
    user: any
}

const MenuContainer: FC<MenuProps> = ({ user }) => {
    const [isDriving, setIsDriving] = useState(user.isDriving);
    // const { refetch } = useQuery(ME)
    const [toggleDrivingModeMutation] = useMutation<toggleDrivingMode>(TOGGLE_DRIVING
        // {
        //     onCompleted: ({ ToggleDrivingMode }) => {
        //         const { ok, err } = ToggleDrivingMode
        //         if (ok) {
        //             refetch()
        //         } else {
        //             console.log(err)
        //         }
        //     }
        // }
    )
    // console.log(isDriving);

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