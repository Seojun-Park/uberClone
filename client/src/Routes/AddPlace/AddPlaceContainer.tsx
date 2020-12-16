import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useInput from '../../Hooks/useInput';
import { addPlace, addPlaceVariables } from '../../types/api';
import AddPlacePresenter from './AddPlacePresenter'
import { ADD_PLACE } from './AddPlaceQuery';

const AddPlaceContainer = () => {
    const [address, setAddress] = useInput("")
    const [name, setName] = useInput("")
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [loading, setLoading] = useState(true)
    const [addPlaceMutation] = useMutation<addPlace, addPlaceVariables>(ADD_PLACE, {
        variables: {
            name,
            address,
            isFav: false,
            lat: 213.12,
            lng: 321.23
        }, onCompleted: v => {
            if (v.AddPlace && v.AddPlace.ok) {
                toast.success("Place added!")
                setLoading(false)
            } else {
                toast.error(v.AddPlace.err)
            }
        }
    })

    return (
        <AddPlacePresenter
            address={address}
            setAddress={setAddress}
            name={name}
            setName={setName}
            setLat={setLat}
            setLng={setLng}
            loading={loading}
            onSubmit={addPlaceMutation}
            lng={lng}
            lat={lat}
        />
    )
}
export default AddPlaceContainer