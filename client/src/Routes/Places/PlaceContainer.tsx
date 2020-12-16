import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_PLACES } from '../../sharedQueries'
import PlacePresenter from './PlacePresenter'

const PlaceContainer = () => {
    const [places, setPlaces] = useState()
    const [loading, setLoading] = useState(true)
    useQuery(GET_PLACES, { onCompleted: v => setPlaces(v.GetMyPlace.places) })
    useEffect(() => {
        if (places) {
            setLoading(false)
        }
    }, [setLoading, places])
    return (
        <PlacePresenter places={places} loading={loading} />
    )
}

export default PlaceContainer;