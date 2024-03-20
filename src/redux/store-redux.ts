import {combineReducers} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import {configureStore} from "@reduxjs/toolkit";
import chatReducer from "./chat-reducer";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer
});

const store = configureStore({reducer: rootReducer})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>
export type AppDispatch = typeof store.dispatch


type PropertiesType<T> = T extends  {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends  {[key: string]: (...args: any[])=> any}> = ReturnType<PropertiesType<T>>

// @ts-ignore
window.store = store;

export default store;