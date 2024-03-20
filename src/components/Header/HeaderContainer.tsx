import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { logout } from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/store-redux";

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
    photoSmall: string | null | undefined
}

type MapDispatchPropsType = {
    logout: () => void
}

type OwnPropsType = {

}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class HeaderContainer extends React.Component<PropsType> {
    render() {
        return <Header {...this.props} />
    }
}

let mapStateToProps = (state: AppStateType) : MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    photoSmall: state.auth.photos?.small
})

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {logout})(HeaderContainer)