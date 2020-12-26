import React from 'react';
import Header from '../../Components/Header';
import * as S from './ChatStyles'

const ChatPresenter = () => {
    return (
        <S.Container>
            <Header title="Chat" backTo={`/ride`} />
        </S.Container>
    )
}

export default ChatPresenter