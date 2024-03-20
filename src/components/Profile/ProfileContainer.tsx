import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getStatus, getUserProfile, savePhoto, saveProfile, updateStatus } from '../../redux/profile-reducer';
import { useParams } from 'react-router-dom'
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import {AppStateType} from "../../redux/store-redux";
import {ContactsType, ProfileType} from "../../types/types";

export function withRouter(Children: any) {
    return (props: any) => {
        const match = { params: useParams() };
        return <Children {...props} match={match} />

    }
}

type MapStatePropsType = {
    userId: number
    profile: ProfileType
    status: string
    isAuth: boolean
}

type FormDataType = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: ContactsType
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (newStatus: string) => void
    savePhoto: (photo: string) => void
    saveProfile: (formData: FormDataType) => Promise<any>
}

type OwnPropsType = {
    match: any
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.userId;
        }
        if (userId) {
            this.props.getStatus(userId);
            this.props.getUserProfile(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: OwnPropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return <Profile {...this.props} isOwner={!this.props.match.params.userId} />
    }
}

let mapStateToProps = (state: AppStateType) : MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.userId,
    isAuth: state.auth.isAuth
}) as MapStatePropsType


export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)