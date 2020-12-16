import { useMutation } from '@apollo/client';
import { toggleFav, toggleFavVariables } from '../../types/api'
import React, { FC, useState } from 'react';
import PlaceComponentPresenter from './PlaceComponentPresenter'
import { TOGGLE_PLACE } from './PlaceComponentQueries';
import { GET_PLACES } from '../../sharedQueries';

type Props = {
  fav: boolean;
  name: string
  address: string;
  id: number;
}

const PlaceComponentContainer: FC<Props> = ({ fav, name, address, id }) => {
  const [isFav, setIsFav] = useState(fav)
  const [toggleFavMutation] = useMutation<toggleFav, toggleFavVariables>(TOGGLE_PLACE, {
    variables: {
      placeId: id,
      isFav: fav ? false : true
    }, refetchQueries: [{ query: GET_PLACES }]
  })

  const toggleIsFav: EventListener = async (e) => {
    e.preventDefault();
    if (isFav === true) {
      setIsFav(false)
    } else {
      setIsFav(true)
    }
    await toggleFavMutation()
  }

  return (
    <PlaceComponentPresenter fav={fav} name={name} address={address} isFav={isFav} mutation={toggleIsFav} />
  )
}

export default PlaceComponentContainer