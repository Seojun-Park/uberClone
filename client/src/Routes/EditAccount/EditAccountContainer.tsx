import { useMutation } from '@apollo/client';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import useInput from '../../Hooks/useInput';
import EditAccountPresenter from './EditAccountPresenter'
import { UPDATE_PROFILE } from './EditAccountQueries'
import { storage } from '../../Firebase'
import { updateProfile, updateProfileVariables } from '../../types/api'
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

interface stateType {
    from: { pathname: string }
    user: any
}

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget
}

const EditAccountContainer: FC<RouteComponentProps> = ({ history }): ReactElement => {
    const { state: { user } } = useLocation<stateType>();
    const [progress, setProgess] = useState(1)
    const [profilePhoto, setProfilePhoto]: any = useState()
    const [flag, setFlag] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [email, setEmail] = useInput("");
    const [firstName, setFirstName] = useInput("")
    const [lastName, setLastName] = useInput("")
    const [updateProfileMutation] = useMutation<updateProfile, updateProfileVariables>(UPDATE_PROFILE, {
        variables: {
            email,
            firstName,
            lastName,
            profilePhoto: imageUrl
        }
    })



    const handleUpload = (event: HTMLInputEvent) => {
        event.preventDefault()
        if (event.target && event.target.files) {
            if (event.target !== null && event.target.files && event.target.files.length !== null) {
                let files: any = event.target.files[0]
                setProfilePhoto(files);
                setFlag(true);
            }
        }
    }

    const onSubmit = async () => {
        const { data: updateMyProfile } = await updateProfileMutation();
        if (updateMyProfile) {
            toast.success("Your profile is updated :D")
        } else {
            toast.error("Couldn't update your profile")
            window.location.href = "/"
        }
    }

    useEffect(() => {
        let uploadTask = storage
            .ref(`/${user.email}/profilePhoto`)
            .put(profilePhoto);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percentUploaded = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgess(percentUploaded)
            },
            (err) => { console.log(err) },
            () => {
                storage.ref(`/${user.email}/`)
                    .child('profilePhoto')
                    .getDownloadURL()
                    .then((url) => {
                        setImageUrl(url)
                    })
            }
        )
    }, [user.email, profilePhoto])


    return (
        <EditAccountPresenter
            email={email}
            firstName={firstName}
            lastName={lastName}
            setEmail={setEmail}
            setFirstName={setFirstName}
            setLastName={setLastName}
            handleUpload={handleUpload}
            imageUrl={imageUrl}
            onSubmit={onSubmit}
            progress={progress}
            flag={flag}
        />
    )
}
export default EditAccountContainer