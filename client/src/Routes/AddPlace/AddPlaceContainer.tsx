import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import useInput from '../../Hooks/useInput';
import { addPlace, addPlaceVariables } from '../../types/api';
import AddPlacePresenter from './AddPlacePresenter'
import { ADD_PLACE } from './AddPlaceQuery';

const AddPlaceContainer = () => {
    const [address, setAddress] = useInput("")
    const [name, setName] = useInput("")
    const [isFav, setIsFav] = useState(false)
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [loading, setLoading] = useState(true)
    const [addPlaceMutation] = useMutation<addPlace, addPlaceVariables>(ADD_PLACE, {
        variables: {
            name,
            address,
            isFav,
            lat,
            lng
        }
    })

    const onSubmit = async () => {
        const { data } = await addPlaceMutation()
        if (data) {
            setLoading(false)
        }
    }

    return (
        <AddPlacePresenter
            address={address}
            setAddress={setAddress}
            name={name}
            setName={setName}
            loading={loading}
            onSubmit={onSubmit}
        />
    )
}
export default AddPlaceContainer