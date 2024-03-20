import s from "./ProfileInfo.module.css";
import smile from "../../../assets/images/smile.png";
import frown from "../../../assets/images/frown.png";
import {FC} from "react";
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData: FC<PropsType> = (props) => {
    return (
        <div>
            <div className={s.aboutMeBlock}>
                <h1>Info</h1>
                <div className={s.aboutMe}>
                    <h2>Name</h2>
                    <p>{props.profile.fullName}</p>
                </div>
                <div className={s.aboutMe}>
                    <h2>About Me:</h2>
                    <p>{props.profile.aboutMe}</p>
                </div>
                <div className={`${s.aboutMe} + ${s.lookingJob}`}>
                    <h2>Looking job:</h2>
                    <p>{props.profile.lookingForAJob ? <img src={smile} className={s.lookingJobSmile} /> : <img src={frown} className={s.lookingJobSmile} />}</p>
                </div>
                <div className={s.aboutMe}>
                    <h2>Description Looking Job:</h2>
                    <p>{props.profile.lookingForAJobDescription}</p>
                </div>
            </div>
            {props.isOwner && <button onClick={props.goToEditMode} className={s.buttonChangeProfile}>Change Information</button>}
        </div>
    )
}

export default ProfileData