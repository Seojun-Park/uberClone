import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_PLACES, ME } from '../../sharedQueries';
import SettingsPresenter from './SettingsPresenter'

const SettingsContainer = () => {
    const [user, setUser] = useState()
    const [places, setPlaces] = useState(undefined)
    const [loading, setLoading] = useState(true)
    useQuery(ME, { onCompleted: v => setUser(v.Me.user) })
    useQuery(GET_PLACES, {
        onCompleted: v => setPlaces(v.GetMyPlace.places)
    })

    useEffect(() => {
        if (user && places !== undefined) {
            setLoading(false);
        }
    }, [setLoading, user, places])

    if (loading) {
        <>
            loading...
        </>
    }
    console.log(loading)
    return (
        <SettingsPresenter user={user} places={places} loading={loading} />
    )
}

export default SettingsContainer