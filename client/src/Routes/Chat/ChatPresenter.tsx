import React, { FC, useEffect, useRef } from 'react';
import Header from '../../Components/Header';
import Message from '../../Components/Message';
import * as S from './ChatStyles'

interface IProps {
    messages?: any[]
    message: string
    onChangeMessage: (event: React.ChangeEvent<Element>) => any;
    sendMessageMutation: any;
    rideId: number
}

const renderMessage = (messages: any[]) => {
    return messages.map(msg => {
        return <Message key={msg.id} {...msg} />
    })
}

const ChatPresenter: FC<IProps> = ({
    messages,
    message,
    onChangeMessage,
    sendMessageMutation,
    rideId
}) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (ref && ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [messages])
    return (
        <S.Container>
            <Header title="Chat" backTo={`/ride/${rideId}`} />
            <S.Chat ref={ref}>{messages && renderMessage(messages)}</S.Chat>
            <S.FormExtend onSubmit={() => sendMessageMutation}>
                <S.Input
                    value={message}
                    onChange={onChangeMessage}
                    placeholder="Send a message"
                    autoFocus={true}
                />
                <S.Button type="submit">Send</S.Button>
            </S.FormExtend>
        </S.Container>
    )
}

export default ChatPresenter