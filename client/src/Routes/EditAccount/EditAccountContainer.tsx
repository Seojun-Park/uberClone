import { useMutation } from '@apollo/client';
import React from 'react';
import useInput from '../../Hooks/useInput';
import EditAccountPresenter from './EditAccountPresenter'
import { UPDATE_PROFILE } from './EditAccountQueries'
import { updateProfile, updateProfileVariables } from '../../types/api'

const EditAccountContainer = () => {
    const email = useInput("");
    const firstName = useInput("")
    const lastName = useInput("")
    const profilePhoto = useInput("")
    // const [updateProfileMutation] = useMutation<updateProfile, updateProfileVariables>(UPDATE_PROFILE, {
    //     variables: {
    //         email,
    //         firstName,
    //         lastName,
    //         profilePhoto
    //     }
    // })

    return (
        <EditAccountPresenter
            email={email}
            firstName={firstName}
            lastName={lastName}
            profilePhoto={profilePhoto}
        />
    )
}
export default EditAccountContainer