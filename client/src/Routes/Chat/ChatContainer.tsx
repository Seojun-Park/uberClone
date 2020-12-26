import { useQuery } from '@apollo/client';
import React, { FC, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useInput from '../../Hooks/useInput';
import { ME } from '../../sharedQueries';
import { GetChatById, GetChatByIdVariables } from '../../types/api';
import ChatPrenster from './ChatPresenter'
import { GET_CHAT_BY_ID } from './ChatQueries';

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
            if (Me.user && Me.ok) {
                setUser(Me.user);
            }
        }
    })
    console.log(user)

    // useQuery<GetChatById, GetChatByIdVariables>(GET_CHAT_BY_ID, {
    //     onCompleted: ({ GetChatById }) => {
    //         const { ok, err, chat } = GetChatById
    //         if (ok && chat && chat.rideId && chat.messages && user) {
    //             setRideId(chat.rideId)
    //             const messages = chat.messages.map(msg => {
    //                 if (msg) {
    //                     return {
    //                         ...msg,
    //                     }
    //                 }
    //             })
    //         }
    //     }
    // })

    return (
        <ChatPrenster />
    )
}

export default ChatContainer