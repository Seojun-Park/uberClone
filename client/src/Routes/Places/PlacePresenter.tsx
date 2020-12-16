import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../Components/Button';
import Header from '../../Components/Header';
import PlaceComponent from '../../Components/Place/PlaceComponentContainer';
import * as S from './PlaceStyles'

type PlaceProps = {
    places: any
    loading: boolean
}

const PlacePresenter: FC<PlaceProps> = ({
    places,
    loading
}) => {
    return (
        <>
            <Helmet>Places</Helmet>
            <Header title="Places" backTo="/" />
            <S.Container>
                {!loading && places && places.length === 0 && <S.SLink to="/addPlace">Add some places here!</S.SLink>}
                {!loading && places && places.map((p: any, i: number) => (
                    <PlaceComponent key={i} id={p.id} fav={p.isFab} name={p.name} address={p.address} />
                ))}
                <Button value="ADD PLACE" onClick={() => window.location.href = "/addPlace"} />
            </S.Container>
        </>
    )
}

export default PlacePresenter