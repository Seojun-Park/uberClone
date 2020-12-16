import React, { FC } from 'react';
import PlaceComponentPresenter from './PlaceComponentPresenter'

type Props = {
  fav: boolean;
  name: string
  address: string;
  id: number;
}

const PlaceComponentContainer: FC<Props> = ({ fav, name, address, id }) => {
  return (
    <PlaceComponentPresenter fav={fav} name={name} address={address} />
  )
}

export default PlaceComponentContainer