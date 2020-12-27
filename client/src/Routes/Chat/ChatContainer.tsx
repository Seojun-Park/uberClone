import { useMutation, useQuery, useSubscription } from '@apollo/client';
import React, { FC, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import useInput from '../../Hooks/useInput';
import { ME } from '../../sharedQueries';
import {
    GetChatById,
    GetChatByIdVariables,
    me,
    MessageSubscription,
    SendMessage,
    SendMessageVariables
} from '../../types/api';
import ChatPrenster from './ChatPresenter'
import {
    GET_CHAT_BY_ID,
    MESSAGE_SUBSCRIPTION,
    SEND_MESSAGE
} from './ChatQueries';

interface IRouteParam {
    chatId: string;
}

interface IProps extends RouteComponentProps<IRouteParam> { }

const ChatContainer: FC<IProps> = ({ match }) => {
    const { params: { chatId } } = match
    const [rideId, setRideId] = useState<number>(-1);
    const [message, onChangeMessage, setMessage] = useInput("")
    const [messages, setMessages] = useState<any[]>();
    const { data } = useQuery<GetChatById, GetChatByIdVariables>(GET_CHAT_BY_ID, {
        variables: {
            chatId: parseInt(chatId)
        }
    })
    const { data: user } = useQuery<me>(ME, {
        fetchPolicy: "cache-and-network"
    })

    console.log(data, chatId, user)

    // useQuery<GetChatById, GetChatByIdVariables>(GET_CHAT_BY_ID, {
    //     variables: {
    //         chatId: parseInt(chatId)
    //     },
    //     onCompleted: ({ GetChatById }) => {
    //         const { ok, err, chat } = GetChatById
    //         console.log(chat)
    //         if (ok && chat && chat.rideId && chat.messages && user) {
    //             setRideId(chat.rideId)
    //             const messages = chat.messages.map(msg => {
    //                 console.log(msg)
    //                 if (msg) {
    //                     return {
    //                         ...msg,
    //                         mine: user.Me.user?.id === msg.user.id
    //                     }
    //                 } else {
    //                     return null;
    //                 }
    //             })
    //             setMessages(messages);
    //         } else {
    //             toast.error(err);
    //         }
    //     }
    // })

    useSubscription<MessageSubscription>(MESSAGE_SUBSCRIPTION, {
        onSubscriptionComplete: () => {
            console.log("Listening new messages")
        },
        onSubscriptionData: ({ subscriptionData }) => {
            const { data } = subscriptionData;
            if (data && messages && user) {
                setMessage("");
                const { MessageSubscription } = data;
                console.log(data, MessageSubscription)
                if (MessageSubscription) {
                    setMessages([
                        ...messages,
                        {
                            ...MessageSubscription,
                            mine: user.Me.user?.id === MessageSubscription.user.id
                        }
                    ])
                }
            }
        }
    })

    const [sendMessageMutation] = useMutation<SendMessage, SendMessageVariables>(SEND_MESSAGE, {
        variables: {
            chatId: parseInt(chatId),
            text: message
        }
    })

    return (
        <ChatPrenster
            messages={messages}
            message={message}
            onChangeMessage={onChangeMessage}
            sendMessageMutation={sendMessageMutation}
            rideId={rideId}
        />
    )
}

export default ChatContainer