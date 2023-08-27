import classNames from 'classnames/bind';
import styles from './VideoItem.module.scss';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
// import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import images from '~/assets/images';

import { useState } from 'react';
import Image from '../Image';
import Menu from '../Popper/Menu';
import { shareVideo } from './shareVideo';

const cx = classNames.bind(styles);

function VideoItem({ video }) {
    const [showFullContent, setShowFullContent] = useState(false);
    // const [volume, setVolume] = useState(false);

    const videoInfoUser = video.user;
    const fileShareVideo = shareVideo.slice(0, 5);

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

                <div className={cx('video')}>
                    <div className={cx('video-play')}>
                        <video
                            className={cx('video-tag')}
                            controls
                            // autoPlay
                            // muted
                            loop
                        >
                            <source src={video.file_url} type="video/mp4" />
                        </video>
                    </div>
                    <div className={cx('video-interaction')}>
                        <button className={cx('video-like')}>
                            <span className={cx('video-like-icon')}>
                                {/* <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faHeart}
                                /> */}
                                <img
                                    className={cx('video-icon')}
                                    src={images.like}
                                    alt="like"
                                />
                            </span>
                            <strong className={cx('text-icon')}>
                                {video.likes_count}
                            </strong>
                        </button>
                        <button className={cx('video-comment')}>
                            <span className={cx('video-comment-icon')}>
                                {/* <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faCommentDots}
                                /> */}
                                <img
                                    className={cx('video-icon', 'comment-icon')}
                                    src={images.comment}
                                    alt="comment"
                                />
                            </span>
                            <strong className={cx('text-icon')}>
                                {video.comments_count}
                            </strong>
                        </button>
                        <button className={cx('video-favorite')}>
                            <span className={cx('video-favorite-icon')}>
                                <FontAwesomeIcon
                                    className={cx('video-icon')}
                                    icon={faBookmark}
                                />
                                {/* <img
                                    className={cx('video-icon')}
                                    src={images.favorite}
                                    alt="like"
                                /> */}
                            </span>
                            <strong className={cx('text-icon')}>
                                {video.shares_count}
                            </strong>
                        </button>
                        <Menu items={fileShareVideo} placement="top-start">
                            <button className={cx('video-share')}>
                                <span className={cx('video-share-icon')}>
                                    {/* <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faShare}
                                /> */}
                                    <img
                                        className={cx('video-icon')}
                                        src={images.share}
                                        alt="share"
                                    />
                                </span>
                                <strong className={cx('text-icon')}>
                                    {video.shares_count}
                                </strong>
                            </button>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoItem;
