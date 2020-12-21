import React, { FC } from 'react';
import styled from 'styled-components'


const StyledMap = styled.div<IProps>`
	position: ${props => (props.isHome ? "absolute" : "fixed")};
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 0;
`

interface IProps {
    mapRef: any;
    isHome: boolean;
}

const MapPresenter: FC<IProps> = ({ mapRef, isHome }) => {
    return <StyledMap id={"googleMap"} ref={mapRef} isHome={isHome} />
}

export default MapPresenter