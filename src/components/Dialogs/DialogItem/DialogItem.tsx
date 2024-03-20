import { NavLink } from 'react-router-dom';
import s from './DialogItem.module.css'
import {FC} from "react";

type PropsType = {
    id: number
    name: string
}

const DialogItem: FC<PropsType> = (props) => {
    return (
        <div className={s.dialog}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    );
};

export default DialogItem;