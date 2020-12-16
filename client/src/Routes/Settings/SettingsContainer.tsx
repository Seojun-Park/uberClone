import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ME } from '../Home/HomeQueries';
import SettingsPresenter from './SettingsPresenter'

const SettingsContainer = () => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    useQuery(ME, { onCompleted: v => setUser(v.Me.user) })

    useEffect(() => {
        if (user) {
            setLoading(false);
        }
    }, [setLoading, user])

    if (loading) {
        <>
            loading...
        </>
    }
    console.log(user)
    return (
        <SettingsPresenter />
    )
}

export default SettingsContainer