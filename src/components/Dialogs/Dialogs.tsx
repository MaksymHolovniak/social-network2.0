import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React, {FC} from 'react';
import {Field, Form, Formik} from "formik";
import {DialogType, MessageType} from "../../types/types";
import {InitialStateType} from "../../redux/dialogs-reducer";

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (newMessageBody: string) => void
}

const Dialogs: FC<PropsType> = (props) => {
    let state = props.dialogsPage;

    let dialogsElememts = state.dialogs.map((d: DialogType) => <DialogItem name={d.name} key={d.id} id={d.id} />)
    let messagesElements = state.messages.map((m: MessageType) => <Message message={m.message} key={m.id} />)

    let addNewMessage = (values: {newMessageBody: string}) => {
        props.sendMessage(values.newMessageBody);
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElememts}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <AddMessageForm onSubmit={addNewMessage} />
            </div>
        </div>
    );
};

type FormPropsType = {
    onSubmit: (values: {newMessageBody: string}) => void
}

const AddMessageForm: FC<FormPropsType> = (props) => {
 return (
     <Formik initialValues={{newMessageBody: ''}} onSubmit={props.onSubmit}>
    <Form className={s.submitMessage}>
    <Field name={'newMessageBody'} placeholder={'Enter your message'} rows={'2'} cols={'60'} wrap={'hard'} component="textarea"></Field>
    <button type={"submit"}>Submit</button>
    </Form>
     </Formik>
    )
}

export default Dialogs;