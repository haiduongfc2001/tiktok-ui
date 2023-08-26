import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import VideoItem from '~/components/VideoItem/VideoItem';
import * as userService from '~/services/userService';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;

function Home() {
    const [listVideos, setListVideos] = useState([]);
    const typeParams = 'for-you';

    const [page, setPage] = useState(INIT_PAGE);

    useEffect(() => {
        // Fetch data only when the page changes
        const fetchApi = async () => {
            const result = await userService.getVideosList({
                type: typeParams,
                page,
            });
            console.log(result);
            setListVideos(result);
        };

        fetchApi();
    }, [page]); // Fetch data whenever 'page' changes

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {listVideos &&
                    listVideos.map((video) => (
                        <VideoItem key={video.id} video={video} />
                    ))}
            </div>
        </div>
    );
}

export default Home;
