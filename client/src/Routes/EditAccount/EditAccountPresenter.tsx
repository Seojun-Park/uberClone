import React, { FC } from 'react';
import Helmet from 'react-helmet'
import Button from '../../Components/Button';
import Header from '../../Components/Header';
import * as S from './EditAccountStyles'
import { useDropzone } from 'react-dropzone'
import ProgressBarContainer from '../../Components/ProgressBar';

type EditProps = {
    email: string
    firstName: string
    lastName: string
    imageUrl: string
    progress: number
    setEmail: any
    setFirstName: any
    setLastName: any
    handleUpload: any
    onSubmit: any
    flag: boolean
}

const EditAccountPresenter: FC<EditProps> = ({
    email,
    firstName,
    lastName,
    imageUrl,
    progress,
    setEmail,
    setFirstName,
    setLastName,
    handleUpload,
    onSubmit,
    flag
}) => {
    const { getRootProps, getInputProps } = useDropzone({ accept: "image/png, image/jpeg" })

    const preview = (src: string) => <S.Preview src={src} alt="preview" />

    return (
        <S.Container>
            <Helmet>Edit Account</Helmet>
            <Header title={"Edit Account"} backTo={"/"} />
            <S.ExtendedForm submitFn={onSubmit}>
                <S.Input placeholder="First name" value={firstName} onChange={setFirstName} name="firstName" />
                <S.Input placeholder="Last name" value={lastName} onChange={setLastName} name="lastName" />
                <S.Input placeholder="Email" value={email} onChange={setEmail} name="email" type="email" />
                <S.UploadDiv {...getRootProps()}>
                    <input {...getInputProps()} onChange={handleUpload} />
                    <S.UploadButton bgColor={flag}>{!flag ? "Upload" : "Change"}</S.UploadButton>
                </S.UploadDiv>
                <S.PreviewBox>
                    {flag ?
                        progress !== 100 ? <ProgressBarContainer progress={progress} /> : preview(imageUrl)
                        : "Preview"}
                </S.PreviewBox>
                <Button value="Update" onClick={null} />
            </S.ExtendedForm>
        </S.Container>
    )
}

export default EditAccountPresenter