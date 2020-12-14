import React from 'react';
import useInput from '../../Hooks/useInput';
import EditAccountPresenter from './EditAccountPresenter'

const EditAccountContainer = () => {
    const email = useInput("");
    const firstName = useInput("")
    const lastName = useInput("")
    const profilePhoto = useInput("")

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