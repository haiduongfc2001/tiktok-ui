import classNames from 'classnames/bind';
import styles from './VideoItem.module.scss';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import images from '~/assets/images';

import { useRef, useState, useEffect } from 'react';
import Image from '../Image';
import Menu from '../Popper/Menu';
import { shareVideo } from './shareVideo';

const cx = classNames.bind(styles);

function VideoItem({ video }) {
    const [showFullContent, setShowFullContent] = useState(false);
    // const [volume, setVolume] = useState(false);

    const videoInfoUser = video.user;
    const fiveShareVideo = shareVideo.slice(0, 5);
    const remainingShareVideo = shareVideo.filter((item, index) => index >= 5);

    const [isLiked, setIsLiked] = useState(false);
    const [isFavoriteAdded, setIsFavoriteAdded] = useState(false);
    const [animateLike, setAnimateLike] = useState(false); // New state for animation

    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const handleTogglePlay = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        const videoElement = videoRef.current;

        const observerOptions = {
            threshold: 0.5, // Intersection threshold
        };

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                videoElement.play();
                setIsPlaying(true);
            } else {
                videoElement.pause();
                setIsPlaying(false);
            }
        }, observerOptions);

        observer.observe(videoElement);

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        setAnimateLike(true); // Trigger animation
        setTimeout(() => {
            setAnimateLike(false); // Reset animation after it finishes
        }, 600); // Animation duration
    };

    const handleFavoriteClick = () => {
        setIsFavoriteAdded(!isFavoriteAdded);
        setAnimateLike(true); // Trigger animation
        setTimeout(() => {
            setAnimateLike(false); // Reset animation after it finishes
        }, 600); // Animation duration
    };

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
                            <img
                                src={images.music}
                                className={cx('video-music-icon')}
                                alt="icon music"
                            />
                            <Link to={'/'} className={cx('video-music-link')}>
                                {video.music}
                            </Link>
                        </div>
                    )}
                </div>

                <div className={cx('video')}>
                    <div className={cx('video-play')}>
                        <>
                            <video
                                className={cx('video-tag')}
                                ref={videoRef}
                                // controls={isPlaying}
                                autoPlay={false}
                                muted
                                poster={video.thumb_url}
                                loop
                            >
                                <source src={video.file_url} type="video/mp4" />
                            </video>
                        </>
                        <div className={cx('video-control')}>
                            <button
                                className={cx('bottom-left-button')}
                                onClick={handleTogglePlay}
                            >
                                <img
                                    src={
                                        !isPlaying ? images.play : images.pause
                                    }
                                    alt="toggle play"
                                />
                            </button>
                            <button
                                className={cx('bottom-right-button')}
                                onClick={handleTogglePlay}
                            >
                                <img src={images.muted} alt="muted video" />
                            </button>
                        </div>
                    </div>
                    <div className={cx('video-interaction')}>
                        <button
                            className={cx('video-like', {
                                'heart-animation': isLiked && animateLike,
                            })}
                            onClick={handleLikeClick}
                        >
                            <span
                                className={cx('video-like-icon', {
                                    liked: isLiked,
                                })}
                            >
                                <img
                                    className={cx('video-icon')}
                                    src={isLiked ? images.liked : images.like}
                                    alt="like"
                                />
                            </span>
                            <strong className={cx('text-icon')}>
                                {isLiked
                                    ? video.likes_count + 1
                                    : video.likes_count}
                            </strong>
                        </button>
                        <button className={cx('video-comment')}>
                            <span className={cx('video-comment-icon')}>
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
                        <button
                            className={cx('video-favorite', {
                                'heart-animation':
                                    isFavoriteAdded && animateLike,
                            })}
                            onClick={handleFavoriteClick}
                        >
                            <span
                                className={cx('video-favorite-icon', {
                                    favoriteAdded: isFavoriteAdded,
                                })}
                            >
                                <img
                                    className={cx('video-icon')}
                                    src={
                                        isFavoriteAdded
                                            ? images.favoriteAdded
                                            : images.favorite
                                    }
                                    alt="favorite"
                                />
                            </span>
                            <strong className={cx('text-icon')}>
                                {isFavoriteAdded
                                    ? video.shares_count + 1
                                    : video.shares_count}
                            </strong>
                        </button>
                        <button className={cx('video-share')}>
                            <Menu
                                items={fiveShareVideo}
                                placement="top-start"
                                shareMoreButton={true}
                                remainingShareVideo={remainingShareVideo}
                            >
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
                            </Menu>
                            <strong className={cx('text-icon')}>
                                {video.shares_count}
                            </strong>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoItem;
