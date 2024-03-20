import s from './MyPosts.module.css';
import Post from './Post/Post';
import React, {FC} from 'react';
import {Field, Form, Formik} from "formik";
import {PostType} from "../../../types/types";

type PropsType = {
    posts: Array<PostType>
    addPost: (newPostText: string) => void
}

const MyPosts : FC<PropsType> = React.memo(props => {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id} />)

    let onAddPost = (values: { newPostText: string }) => {
        props.addPost(values.newPostText)
    }
    return (
        <div className={s.content}>
            <p className={s.myPostTitle}>My posts</p>
            <AddNewPostForm onSubmit={onAddPost} />
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
});

type FormPropsType = {
    onSubmit: (values: { newPostText: string }) => void
}
const AddNewPostForm: FC<FormPropsType> = (props) => {
    return (
        <Formik initialValues={{newPostText: ''}} onSubmit={props.onSubmit}>
        <Form className={s.newpost}>
            <Field name={'newPostText'} rows={'5'} cols={'33'} placeholder={'Enter your post'} component="textarea"></Field>
            <div><button className={s.postButton}>Add post</button></div>
        </Form>
        </Formik >
    )
}

export default MyPosts;