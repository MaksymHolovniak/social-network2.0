import React, {FC, useEffect, useRef, useState} from "react";
import {Navigate, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsAuth} from "../../redux/auth-selectors";
import s from './ChatPage.module.css'
import {Button} from "antd";
import avatar from './../../assets/images/user.png'
import {useAppDispatch} from "../../types/types";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/store-redux";

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

const ChatPage: FC = () => {
    const isAuth = useSelector(getIsAuth)

    return (
        !isAuth ? <Navigate to='/login'/> :
            <div className={s.chat}><Chat/></div>

    )
}

const Chat: FC = () => {

    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(startMessagesListening())

        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

const Messages: FC<{}> = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(false)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if( Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages]);
    return (
        <div className={s.messages} onScroll={scrollHandler}>
            {messages.map((m) => <Message key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

const Message: FC<{ message: ChatMessageType }> = React.memo(({message}) => {
    return (
        <div className={s.message}>
            <NavLink to={'/profile/' + message.userId}><img className={s.messageAvatar}
                                                            src={message.photo ? message.photo : avatar}
                                                            alt={'avatar'}/></NavLink>
            <div className={s.messageAuthor}>
                <h2 className={s.messageAuthorName}>{message.userName}</h2>
                <p className={s.messageText}>{message.message}</p>
            </div>
        </div>
    )
})

const AddMessageForm: FC<{}> = () => {
    const [message, setMessage] = useState('');
    const dispatch = useAppDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)
    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div className={s.formAddMessage}>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} placeholder={'Enter your message'}
                      value={message} rows={2} cols={70} className={s.formTextarea}></textarea>
            <Button disabled={status !== 'ready'} type={"primary"} size={'large'} danger
                    className={s.formButton} onClick={sendMessageHandler}>Send</Button>
        </div>
    )
}

export default ChatPage