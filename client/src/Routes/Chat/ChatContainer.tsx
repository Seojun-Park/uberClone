import { useQuery } from '@apollo/client';
import React, { FC, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useInput from '../../Hooks/useInput';
import { ME } from '../../sharedQueries';
import ChatPrenster from './ChatPresenter'

interface IRouteParam {
    chatId: string;
}

interface IProps extends RouteComponentProps<IRouteParam> { }

const ChatContainer: FC<IProps> = ({ match }) => {
    const { params: { chatId } } = match

    const [rideId, setRideId] = useState<number>(-1);
    const [message, onChangeMessage, setMessage] = useInput("")
    const [messags, setMessages] = useState<any[]>();
    const [user, setUser] = useState();

    useQuery(ME, {
        fetchPolicy: "cache-and-network",
        onCompleted: ({ Me }) => {
            setUser(Me);
        }
    })
    
    return (
        <ChatPrenster />
    )
}

export default ChatContainer