import React, { FC } from 'react'
import styled from 'styled-components'

type ProgressProp = {
    bgColor?: string,
    progress: number
}

type StyleProps = {
    width: number;
}

const Container = styled.div`
    height: 20px;
    width: 100%;
    background-color: #e0e0de;
    border-radius: 10px;
    margin: 15px;
`


const Filler = styled.div<StyleProps>`
height: 100%;
width: ${props => props.width};
background-color: skyblue;
border-radius: 10px;
text-align: right;
`

const Label = styled.span`
padding: 5px;
color: white;
font-weight:bold;
`

const ProgressBar: FC<ProgressProp> = ({ bgColor, progress }) => {
    return (
        <Container>
            <Filler width={progress}>
                <Label>{progress}</Label>
            </Filler>

        </Container>
    )
}
export default ProgressBar