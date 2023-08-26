import classNames from 'classnames/bind';
import styles from './VideoItem.module.scss';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
// import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';

import { useState } from 'react';
import Image from '../Image';

const cx = classNames.bind(styles);

function VideoItem({ video }) {
    const [showFullContent, setShowFullContent] = useState(false);

    const videoInfoUser = video.user;

    return (
        <div className={cx('content')}>
            <Link to={routes.profile}>
                <Image
                    className={cx('user-avatar')}
                    src={videoInfoUser.avatar}
                    alt={videoInfoUser.nickname}
                />
            </Link>
            <div className={cx('video-content')}>
                <div className={cx('video-info')}>
                    <div className={cx('user-info')}>
                        <span className={cx('nickname')}>
                            {videoInfoUser.nickname}
                        </span>
                        {videoInfoUser.tick && (
                            <FontAwesomeIcon
                                className={cx('check')}
                                icon={faCheckCircle}
                            />
                        )}
                        <span
                            className={cx('name')}
                        >{`${videoInfoUser.first_name} ${videoInfoUser.last_name}`}</span>
                    </div>
                    <Button outline className={cx('follow-btn')}>
                        {videoInfoUser.is_followed ? 'Following' : 'Follow'}
                    </Button>
                    <div className={cx('video-title')}>
                        <div
                            className={cx('video-title-content', {
                                'show-full': showFullContent,
                            })}
                        >
                            {video.description}
                        </div>
                        <div className={cx('video-title-more')}>
                            <button
                                className={cx('more-btn')}
                                onClick={() =>
                                    setShowFullContent(!showFullContent)
                                }
                            >
                                {video.description.length > 80 &&
                                    (!showFullContent ? 'more' : 'less')}
                            </button>
                        </div>
                    </div>
                    {video.music && (
                        <div className={cx('video-music')}>
                            {/* <img
                            src={images.music}
                            className={cx('video-music-icon')}
                            alt="icon music"
                        /> */}

                            <FontAwesomeIcon
                                className={cx('video-music-icon')}
                                icon={faMusic}
                            />
                            <Link to={'/'} className={cx('video-music-link')}>
                                {video.music}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoItem;
