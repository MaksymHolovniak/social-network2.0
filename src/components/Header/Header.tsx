import { NavLink } from 'react-router-dom';
import s from './Header.module.css'
import {FC} from "react";
import {Button} from "antd";
import avatar from './../../assets/images/user.png'


import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, ConfigProvider } from 'antd';





type PropsType = {
    isAuth: boolean
    login: string | null
    photoSmall: string | null | undefined
    logout: () => void
}



const Header: FC<PropsType> = (props) => {

    const items:  MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Button type="primary" size='large' danger onClick={props.logout}>Logout</Button>
            ),

        },
    ];

    return (
        <header className={s.header}>
            {        <div className={s.img}>
            <NavLink to='/profile'><img className={s.logo} src='https://media.wired.co.uk/photos/606d9a3ba876dd2203a639aa/16:9/w_2990,h_1682,c_limit/wired-uk-google-watching.jpg' /></NavLink>
            </div>
            /*{props.isAuth && <div  className={s.logout}>{props.photoSmall ? <img src={props.photoSmall} /> : <img src={avatar} /> }<Button type="primary" size='large' danger onClick={props.logout}>Logout</Button> </div>} */
            }
            <ConfigProvider
                theme={{
                    token: {
                        colorBgElevated: '#DDEBF6'
                    },
                }}
            >
            <Dropdown  overlayClassName={s.dropDown} menu={{items}}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <img className={s.avatar} src={props.photoSmall ? props.photoSmall : avatar}/>
                        <DownOutlined/>
                </Space>
                </a>
            </Dropdown>
            </ConfigProvider>
        </header>
    );
};

export default Header;