import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    MapIcon,
    MapActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import config from '~/config';
import * as userService from '~/services/userService';
import { useEffect, useState } from 'react';
import FollowingAccounts from '~/components/FollowingAccounts/FollowingAccounts';

const cx = classNames.bind(styles);
const INIT_PAGE = 1;
const PER_PAGE = 5;

function Sidebar() {
    const [page, setPage] = useState(INIT_PAGE);
    const [isSeeAll, setIsSeeAll] = useState(false);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [hasFetched, setHasFetched] = useState(false);
    const [hasFetcheddasdasd, setHasFetchedAsdasd] = useState(false);

    useEffect(() => {
        // if (!hasFetcheddasdasd) {
        //     userService
        //         .getSuggested({ page, perPage: PER_PAGE })
        //         .then((data) => {
        //             console.log(data);
        //             if (data !== suggestedUsers) {
        //                 setSuggestedUsers((prevUsers) => [
        //                     ...prevUsers,
        //                     ...data,
        //                 ]);
        //                 setHasFetchedAsdasd(true);
        //             }
        //         })
        //         .catch((err) => console.log(err));
        // }

        const authToken =
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9yZWdpc3RlciIsImlhdCI6MTY5Mjk3MzAwMSwiZXhwIjoxNjk1NTY1MDAxLCJuYmYiOjE2OTI5NzMwMDEsImp0aSI6InJadXJuSXhhbXVhU0xYVWgiLCJzdWIiOjYxMDAsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.4fP_y3QsDWwLPLWLqZRWGXLv3zSRBVQ3oK6RJ0tb-N0';

        // axios
        //     .get(
        //         'https://tiktok.fullstack.edu.vn/api/me/followings?page=1',
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${authToken}`,
        //             },
        //         },
        //     )
        //     .then((response) => {
        //         const dataFollowing = response.data.data;
        //         setFollowingUsers(dataFollowing);
        //         setHasFetched(true);
        //     })
        //     .catch((err) => console.log(err));

        const fetchApiFollowing = async () => {
            const result = await userService.getFollowing({
                page,
                authToken,
            });
            setFollowingUsers(result);
        };

        fetchApiFollowing();
    }, [page]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await userService.getSuggested({
                page,
                perPage: PER_PAGE,
            });

            setSuggestedUsers(result);
        };

        fetchApi();
    }, [page]);

    const handleViewChange = (isSeeAll) => {
        setIsSeeAll((prevState) => !prevState);

        if (isSeeAll) {
            setPage(page + 1);
        } else {
        }
    };

    return (
        <aside className={cx('wrapper')}>
            <Menu className={cx('sidebar-menu')}>
                <MenuItem
                    title="For You"
                    to={config.routes.home}
                    icon={<HomeIcon />}
                    activeIcon={<HomeActiveIcon />}
                />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem
                    title="Explore"
                    to={config.routes.explore}
                    icon={<MapIcon />}
                    activeIcon={<MapActiveIcon />}
                />
                <MenuItem
                    title="LIVE"
                    to={config.routes.live}
                    icon={<LiveIcon />}
                    activeIcon={<LiveActiveIcon />}
                />
            </Menu>

            <SuggestedAccounts
                label="Suggested accounts"
                data={suggestedUsers}
                isSeeAll={isSeeAll}
                onViewChange={handleViewChange}
            />
            <FollowingAccounts
                label="Following accounts"
                dataFollowing={followingUsers}
                // isSeeAll={isSeeAll}
                // onViewChange={handleViewChange}
            />
        </aside>
    );
}

export default Sidebar;
