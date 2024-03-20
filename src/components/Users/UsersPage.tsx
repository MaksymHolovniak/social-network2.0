import React, {FC, useEffect} from 'react';
import {
    getCurrentPage,
    getIsFetching,
    getPageSize,
    getUsersFilter
} from '../../redux/users-selectors';
import {useSelector} from "react-redux";
import Preloader from "../common/Preloader/Preloader";
import Users from "./Users";
import {Navigate, useLocation, useSearchParams} from "react-router-dom";
import {getIsAuth} from "../../redux/auth-selectors";
import {useAppDispatch} from "../../types/types";
import {requestUsers} from "../../redux/users-reducer";

type PropsType = {}
export const UsersPage: FC<PropsType> = () => {
    const isFetching = useSelector(getIsFetching)
    const isAuth = useSelector(getIsAuth)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getUsersFilter)

    const dispatch: any = useAppDispatch();
    const location = useLocation()
    const [searchParams] = useSearchParams(location.search)

    useEffect(() => {
        let parsed = Object.fromEntries([...searchParams as any])
        let actualPage = currentPage
        let actualFilter = filter

        if (parsed.page) actualPage = Number(parsed.page)
        if (parsed.term) actualFilter = {...actualFilter, term: parsed.term}
        if (parsed.friend) actualFilter = {
            ...actualFilter,
            friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))

    }, [])

    return <>
        {!isAuth ? <Navigate to='/login'/> :
            isFetching ? <Preloader/> :
                <Users/>
        }
    </>
}

