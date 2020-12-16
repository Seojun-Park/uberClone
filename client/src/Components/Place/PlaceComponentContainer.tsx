import { useMutation } from '@apollo/client';
import { toggleFav, toggleFavVariables } from '../../types/api'
import React, { FC, useEffect, useState } from 'react';
import PlaceComponentPresenter from './PlaceComponentPresenter'
import { TOGGLE_PLACE } from './PlaceComponentQueries';

type Props = {
  fav: boolean;
  name: string
  address: string;
  id: number;
}

const PlaceComponentContainer: FC<Props> = ({ fav, name, address, id }) => {
  const [isFav, setIsFav] = useState(fav)
  const [ok, setOk] = useState(false)
  const [toggleFavMutation] = useMutation<toggleFav, toggleFavVariables>(TOGGLE_PLACE, {
    variables: {
      placeId: id,
      isFav
    }, onCompleted: v => {
      console.log(ok)
      if (v.EditPlace.ok) {
        setOk(true ? false : true)
      }
    }
  })

  useEffect(() => {
    if (ok) {
      setIsFav(isFav ? !isFav : isFav)
      console.log("isFav", isFav)
      console.log("fav", fav)
    }
  }, [isFav, fav, ok, setIsFav])

  return (
    <PlaceComponentPresenter fav={fav} name={name} address={address} isFav={isFav} mutation={toggleFavMutation} />
  )
}

export default PlaceComponentContainer