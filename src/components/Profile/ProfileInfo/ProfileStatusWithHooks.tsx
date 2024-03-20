import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import s from './ProfileInfo.module.css'

type PropsType = {
    status: string
    updateStatus: (newStatus: string) => void
    isOwner: boolean
}
const ProfileStatusWithHooks: FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])


    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status); 
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {props.isOwner?
            <div>
            {editMode?
            <div className={s.inputProfileStatus}><input onChange={onStatusChange} autoFocus={true} onBlur={ deactivateEditMode } value={status}></input></div> :
            <div className={s.textProfileStatusOwner}><p onClick={ activateEditMode }>{props.status || 'Enter a status'}</p></div>
            }
            </div>
            :<div><p>{props.status}</p></div>}
        </div>
        )
}

export default ProfileStatusWithHooks