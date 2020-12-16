import React, { FC } from 'react'
import styled from 'styled-components'

const Place = styled.div`
  margin: 15px 0;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  & i {
    font-size: 12px;
  }
`;

const Container = styled.div`
  margin-left: 10px;
`;

const Button = styled.button`
border: none;
background-color: white;
`


const Name = styled.span`
  display: block;
`;

const Icon = styled.span`
  cursor: pointer;
`;

const Address = styled.span`
  color: ${props => props.theme.greyColor};
  font-size: 14px;
`;

type Props = {
    fav: boolean
    isFav: boolean
    name: string
    address: string
    mutation: any
}

const PlaceComponentPresenter: FC<Props> = ({ fav, name, address, isFav, mutation }) => {
    return (
        <Place>
            <Button onClick={() => mutation()}>
                <Icon>{isFav ? "★" : "✩"}</Icon>
            </Button>
            <Container>
                <Name>{name}</Name>
                <Address>{address}</Address>
            </Container>
        </Place>
    )
}

export default PlaceComponentPresenter