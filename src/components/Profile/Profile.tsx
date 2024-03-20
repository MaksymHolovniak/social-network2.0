import Preloader from '../common/Preloader/Preloader';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {FC} from "react";
import {ContactsType, ProfileType} from "../../types/types";

type FormDataType = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: ContactsType
}

type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (newStatus: string) => void
    isOwner: boolean
    savePhoto: (photo: string) => void
    saveProfile: (formData: FormDataType) => Promise<void>
}
const Profile: FC<PropsType> = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div className={s.profile}>
            <ProfileInfo profile = {props.profile} status ={props.status} updateStatus = {props.updateStatus} isOwner = {props.isOwner} savePhoto = {props.savePhoto} saveProfile = {props.saveProfile} />
            <div className={s.myposts}>
            <MyPostsContainer />
            </div>
        </div>
    );
}

export default Profile;