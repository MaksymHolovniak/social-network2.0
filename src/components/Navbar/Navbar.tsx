import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css'
import profileicon from './../../assets/images/profile-icon.png'
import messagesicon from './../../assets/images/messages-icon.png'
import usersicon from './../../assets/images/users-icon.png'
import chaticon from './../../assets/images/chat-icon.png'
import newsicon from './../../assets/images/news-icon.png'
import musicicon from './../../assets/images/music-icon.png'
import settingsicon from './../../assets/images/settings-icon.png'

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <ul className={s.items}>
                <li className={s.item}><NavLink to='/profile'
                                                className={NavData => NavData.isActive ? s.active : s.link}><img
                    src={profileicon}/><h2>Profile</h2></NavLink></li>
                <li className={s.item}><NavLink to='/dialogs/'
                                                className={NavData => NavData.isActive ? s.active : s.link}><img
                    src={messagesicon}/><h2>Messages</h2></NavLink></li>
                <li className={s.item}><NavLink to='/users' className={NavData => NavData.isActive ? s.active : s.link}><img
                    src={usersicon}/><h2>Users</h2></NavLink></li>


                <li className={s.item}><NavLink to='/chat' className={NavData => NavData.isActive ? s.active : s.link}><img
                    src={chaticon}/><h2>Chat</h2></NavLink></li>


                <li className={s.item}><NavLink to='/news'
                                                className={NavData => NavData.isActive ? s.active : s.link}><img
                    src={newsicon}/><h2>News</h2></NavLink></li>
                <li className={s.item}><NavLink to='/music' className={NavData => NavData.isActive ? s.active : s.link}><img
                    src={musicicon}/><h2>Music</h2></NavLink></li>
                <li className={s.item}><NavLink to='/settings'
                                                className={NavData => NavData.isActive ? s.active : s.link}><img
                    src={settingsicon}/><h2>Settings</h2></NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;