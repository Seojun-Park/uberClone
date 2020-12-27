import React, { FC } from 'react';
import styled from 'styled-components';

interface IProps {
    text: string;
    mine: boolean
}

interface IStyle {
    mine: boolean
}

const Container = styled.div<IStyle>`
background-color: ${props => props.mine ? props.theme.blueColor : props.theme.greyColor};
color: white;
padding: 10px 20px;
border-radius: 20px;
align-self: ${props => (props.mine ? "flex-end" : "flex-start")};
border-bottom-right-radius: ${props => (props.mine ? "0px" : "20px")};
border-bottom-left-radius: ${props => (props.mine ? "0px" : "20px")};
margin-bottom: 10px;
`

const MessagePresenter: FC<IProps> = ({ text, mine }) => {
    return (
        <Container mine={mine}>{text}</Container>
    )
}

export default MessagePresenter