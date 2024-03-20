import s from './Message.module.css'
import {FC} from "react";

type PropsType = {
    message: string
}
const Message: FC<PropsType> = (props) => {
    return <div className={s.message}><p>{props.message}</p></div>
};

export default Message;