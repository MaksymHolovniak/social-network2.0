import {actions} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import {AppStateType} from "../../../redux/store-redux";


let mapStateToProps = (state: AppStateType  ) => {
    return {
       posts: state.profilePage.posts,
       newPostText: state.profilePage.newPostText
    }
}

const MyPostContainer = connect(mapStateToProps, { addPost: actions.addPost })(MyPosts);

export default MyPostContainer;