import { useMutation } from '@apollo/client';
import React, { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import useInput from '../../Hooks/useInput';
import { addPlace, addPlaceVariables } from '../../types/api';
import AddPlacePresenter from './AddPlacePresenter'
import { ADD_PLACE } from './AddPlaceQuery';

interface IProps extends RouteComponentProps<any> {
    state: any
}

const AddPlaceContainer: FC<IProps> = ({ history }) => {
    const { location: { state = {} } = {} } = history
    const [address, setAddress] = useInput("")
    const [name, setName] = useInput("")
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [loading, setLoading] = useState(true)
    const [pickedAddress, setPickedAddress] = useState<any>({})

    const [addPlaceMutation] = useMutation<addPlace, addPlaceVariables>(ADD_PLACE, {
        variables: {
            name,
            address,
            isFav: false,
            lat,
            lng
        }, onCompleted: v => {
            if (v.AddPlace && v.AddPlace.ok) {
                toast.success("Place added!")
                setLoading(false)
            } else {
                toast.error(v.AddPlace.err)
            }
        }
    })
    if (state !== undefined) {
        console.log(state)
    }

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
            pickedAddress={lat !== 0 && lng !== 0}
        />
    )
}
export default AddPlaceContainer