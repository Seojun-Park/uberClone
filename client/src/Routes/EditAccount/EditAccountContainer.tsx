import { useMutation } from '@apollo/client';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import useInput from '../../Hooks/useInput';
import EditAccountPresenter from './EditAccountPresenter'
import { UPDATE_PROFILE } from './EditAccountQueries'
import { storage } from '../../Firebase'
import { updateProfile, updateProfileVariables } from '../../types/api'
import { RouteComponentProps } from 'react-router-dom';
import { forceHistory } from '../../Hooks/forceHistory'
import { toast } from 'react-toastify';


interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget
}

const EditAccountContainer: FC<RouteComponentProps> = (): ReactElement => {
    const email = window.location.href.split("/")[4].replace("#", "");
    const [progress, setProgess] = useState(1)
    const [profilePhoto, setProfilePhoto]: any = useState()
    const [flag, setFlag] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [firstName, setFirstName] = useInput("")
    const [lastName, setLastName] = useInput("")
    const [updateProfileMutation] = useMutation<updateProfile, updateProfileVariables>(UPDATE_PROFILE, {
        variables: {
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

    const onSubmit = () => {
        const data = updateProfileMutation();
        if (data) {
            toast.success("Your profile is updated :D")
            forceHistory.push("/")
        } else {
            toast.error("Couldn't update your profile")
            forceHistory.push("/")
        }
    }

    useEffect(() => {
        if (flag) {
            let uploadTask = storage
                .ref(`/${email}/profilePhoto`)
                .put(profilePhoto);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percentUploaded = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    setProgess(percentUploaded)
                },
                (err) => { console.log(err) },
                () => {
                    storage.ref(`/${email}/`)
                        .child('profilePhoto')
                        .getDownloadURL()
                        .then((url) => {
                            setImageUrl(url)
                        })
                }
            )
        }
    }, [flag, email, profilePhoto])


    return (
        <EditAccountPresenter
            firstName={firstName}
            lastName={lastName}
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