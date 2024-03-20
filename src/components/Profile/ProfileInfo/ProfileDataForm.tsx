import React, {FC} from "react"
import s from './ProfileInfo.module.css'
import style from './ProfileDataForm.module.css'
import {Field, Form, Formik} from "formik";
import {ContactsType, ProfileType, UserType} from "../../../types/types";

type FormDataType = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: ContactsType
}
type PropsType = {
    onSubmit: (formData: FormDataType) => void
    profile: ProfileType
}
const ProfileDataForm: FC<PropsType> = (props) => {
    return (
        <Formik onSubmit={props.onSubmit}
                initialValues={{fullName: props.profile.fullName, aboutMe: props.profile.aboutMe, lookingForAJob: props.profile.lookingForAJob,
                    lookingForAJobDescription: props.profile.lookingForAJobDescription, contacts: props.profile.contacts  }}  >
        <Form>
             <div className={s.aboutMeBlock}>
            <h1>Info</h1>
            <div className={s.aboutMe}>
                <h2>Name</h2>
                <Field placeholder={'Name'} name='fullName' className = {style.profileFormInput}  />
            </div>
            <div className={s.aboutMe}>
                <h2>About Me:</h2>
                <Field placeholder={'About me'} name='aboutMe' className = {style.profileFormInput} />
            </div>
            <div className={`${s.aboutMe} + ${s.lookingJob}`}>
                <h2>Looking job:</h2>
                <Field name='lookingForAJob' type={'checkbox'} />
            </div>
            <div className={s.aboutMe}>
                <h2>Description Looking Job:</h2>
                <Field placeholder={'Desccription looking job'} name='lookingForAJobDescription' className = {style.profileFormInput} />
            </div>
            <div className={s.contactsBlock}>
                <h2>Contacts</h2>
                <div>
                    {Object.keys(props.profile.contacts).map(key => {
                        return <div key={key} className={s.contacts}>
                            {key}: <Field placeholder={key} name={`contacts.${key}`} className = {style.profileFormInputLinks}  />
                        </div>
                    })}
                </div>
            </div>
        </div>
        <button className={s.buttonChangeProfile} type={"submit"}>Save changes</button>
        </Form>
        </Formik>
    )
}


export default ProfileDataForm