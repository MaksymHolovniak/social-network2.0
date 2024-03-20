import React, {FC, useEffect, useState} from 'react';
import s from './Users.module.css'
import userPhoto from './../../assets/images/user.png'
import {NavLink, useSearchParams} from 'react-router-dom';
import UsersSearchForm from "./UsersSearchForm";
import {FilterType, follow, requestUsers, unfollow} from "../../redux/users-reducer";
import {useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";
import {useAppDispatch} from "../../types/types";
import {Pagination} from "antd";

type PropsType = {}
let Users: FC<PropsType> = (props) => {


    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch: any = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams()


    useEffect(() => {
        const term = filter.term
        const friend = filter.friend

        let urlQuery =
            (term === '' ? '' : `&term=${term}`)
            + (friend === null ? '' : `&friend=${friend}`)
            + (currentPage === 1 ? '' : `&page=${currentPage}`)

        setSearchParams(urlQuery)
    }, [filter, currentPage]);

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const onNextPage = (currentPage: number) => {
        let nextPage = currentPage + 1;
        dispatch(requestUsers(nextPage, pageSize, filter))
    }

    const onBottomPage = (currentPage: number) => {
        let bottomPage = currentPage - 1;
        dispatch(requestUsers(bottomPage, pageSize, filter))
    }
    const onFollow = (userId: number) => {
        dispatch(follow(userId))
    }

    const onUnfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }


    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let curP = currentPage;
    let curPF = Math.max(curP - 5, 0);
    let curPL = Math.min(curP + 5, pages.length);
    const remainingPages = Math.min(10 - (curPL - curPF), pages.length - curPL);
    curPL = curPL + remainingPages;
    let slicedPages = pages.slice(curPF, curPL);


    return <div className={s.users}>
        <div className={s.title}>
            <h1 className={s.titleText}>All Members</h1>
            <div className={s.usersFiltersForm}><UsersSearchForm onFilterChanged={onFilterChanged} filter={filter}/>
            </div>
        </div>
        {
            users.map(u => <div key={u.id} className={s.user}>
                    <NavLink to={'/profile/' + u.id}>
                        <div className={s.avatar}><img src={u.photos.small != null ? u.photos.small : userPhoto}></img>
                        </div>
                    </NavLink>
                    <div className={s.content}>
                        <div className={s.userInfo}>
                            <p className={s.name}>{u.name}</p>
                            <p className={s.location}></p>
                        </div>
                        <p className={s.status}>{u.status}</p>
                    </div>
                    <div className={s.button}>
                        {u.followed ?
                            <button disabled={followingInProgress.some(id => id === u.id)}
                                    className={`${s.button} ${s.unfollow}`} onClick={() => {
                                onUnfollow(u.id)
                            }}>Unfollow</button> :
                            <button disabled={followingInProgress.some(id => id === u.id)} className={s.button}
                                    onClick={() => {
                                        onFollow(u.id)
                                    }}>Follow</button>}
                    </div>
                </div>
            )
        }
        <div className={s.pagination}>
            <Pagination current={currentPage} onChange={onPageChanged} total={totalUsersCount} pageSize={pageSize} showSizeChanger={false} 		 />
        </div>
        {/*  <div className={s.pagination}>
            <div>
                {currentPage > 1 && <button className={s.backNextPage} onClick={() => {
                    slicedPages.map(p => {
                        currentPage === p && onBottomPage(p)
                    })
                }}>Назад</button>}
            </div>
            <div className={s.numbersPages}>
                {slicedPages.map(p => {
                    return <div key={p}><a className={currentPage === p ? s.selectedPage : s.unselectedPage}
                                           onClick={() => {
                                               onPageChanged(p)
                                           }}>{p}</a></div>
                })}
            </div>
            <div>
                {curPL > 1 && <button className={s.backNextPage} onClick={() => {
                    slicedPages.map(p => {
                        currentPage === p && onNextPage(p)
                    })
                }}>Вперед</button>}
            </div>
        </div> */}
    </div>
}

export default Users;