import dialogsReducer from "./dialogs-reducer"
import profileReducer from "./profile-reducer"

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 15},
                {id: 2, message: 'Where are you from?', likesCount: 20}
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Maks'},
                {id: 2, name: 'Dmitriy'},
                {id: 3, name: 'Sofya'},
                {id: 4, name: 'Vlad'}
            ],
            messages: [
                {id: 1, message: 'Hi honey, how are you doing???? Long time no see. Where have you been?'},
                {id: 2, message: 'How are you'},
                {id: 3, message: 'What are you doing'}
            ],
            newMessageText: ''
        }
    },
    _callSubscriber() {
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

        this._callSubscriber(this._state);
    }
}

export default store;
window.store = store;