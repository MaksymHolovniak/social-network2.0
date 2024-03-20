import './App.css';
import React, {useEffect} from 'react'
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import { Routes, Route, Navigate } from 'react-router-dom';
import Settings from './components/Settings/Settings';
import {UsersPage} from './components/Users/UsersPage';
import HeaderContainer from './components/Header/HeaderContainer';
import {useSelector} from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import { Suspense } from 'react';
import {getInitialized} from "./redux/app-selectors";
import {useAppDispatch} from "./types/types";
import {getIsAuth} from "./redux/auth-selectors";

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const Login = React.lazy(() => import('./components/Login/Login'));
const ChatPage = React.lazy(() => import('./components/Chat/ChatPage'))

const App= () => {
    const initialized = useSelector(getInitialized)
    const isAuth = useSelector(getIsAuth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeApp());
    }, [])

    if(!initialized) {
        return <Preloader />
    }


    return (
       <div className={isAuth? 'app-wrapper' : 'app-wrapper usersPage'}  >
            {isAuth &&
            <HeaderContainer /> }
            <main className='main'>
                {isAuth &&  <Navbar />}

                <Suspense fallback={<div><Preloader /></div>}>
                    <Routes>
                        <Route path='/profile/:userId?' element={<ProfileContainer />}></Route>
                        <Route path='/dialogs/*' element={<DialogsContainer />}></Route>
                        <Route path='/news' element={<News />}></Route>
                        <Route path='/music' element={<Music />}></Route>
                        <Route path='/users' element={<UsersPage />}></Route>
                        <Route path='/chat' element={<ChatPage />}></Route>
                        <Route path='/settings' element={<Settings />}></Route>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/' element={<Navigate to={'/profile'} />} />
                        <Route path='*' element={<div>404 Not Found</div>} />
                    </Routes>
                </Suspense>
            </main>
        </div>
    );
}

export default App