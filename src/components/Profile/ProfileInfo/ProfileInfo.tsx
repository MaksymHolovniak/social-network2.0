import s from './ProfileInfo.module.css';
import facebook from '../../../assets/images/facebook.png'
import twitter from '../../../assets/images/twitter.png'
import instagram from '../../../assets/images/instagram.png'
import vkontakte from '../../../assets/images/vk.png'
import github from '../../../assets/images/github.png'
import youtube from '../../../assets/images/youtube.png'
import smile from '../../../assets/images/smile.png'
import frown from '../../../assets/images/frown.png'
import avatar from './../../../assets/images/user.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import {ChangeEvent, FC, useState} from 'react';
import ProfileDataForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../types/types";
import ProfileData from "./ProfileData";

type FormDataType = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: ContactsType
}

type PropsType = {
    profile: ProfileType
    savePhoto: (photo: string) => void
    isOwner: boolean
    status: string
    updateStatus: (newStatus: string) => void
    saveProfile: (formData: FormDataType) => Promise<void>
}
const ProfileInfo: FC<PropsType> = (props) => {
    let contacts = [
        { name: facebook, url: props.profile.contacts.facebook },
        { name: twitter, url: props.profile.contacts.twitter },
        { name: instagram, url: props.profile.contacts.instagram },
        { name: vkontakte, url: props.profile.contacts.vk },
        { name: github, url: props.profile.contacts.github },
        { name: youtube, url: props.profile.contacts.youtube }
    ]

    let contactsElements = contacts.map(c => c.url && <a href={c.url} target='_blank'><img src={c.name} className={s.contact} /></a>)

    const [editMode, setEditMode] = useState(false)

    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }


    const onSubmit = (formData: FormDataType) => {
        props.saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
            )
    }
    return (
        <div className={s.profileInfo}>
            <div className={s.userBlock}>
                <div className={s.avatar} >
                    {props.profile.photos.small ? <img src={props.profile.photos.small} /> : <img src={avatar} />}
                    {props.isOwner && <input className={s.inputChangePhoto} type='file' onChange={onMainPhotoSelected} />}
                </div>
                <div className={s.userDescription}>
                    <p>{props.profile.fullName}</p>
                    <div className={s.profileStatus}>
                        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner} />
                    </div>
                    <div className={s.contacts}>
                        {contactsElements}
                    </div>
                </div>
            </div>

            { editMode ? <ProfileDataForm profile={props.profile} onSubmit={onSubmit} />  :
           <ProfileData profile = {props.profile} isOwner ={props.isOwner} goToEditMode = {() => {setEditMode(true)}} />
            }
        </div>
    );

}


export default ProfileInfo;