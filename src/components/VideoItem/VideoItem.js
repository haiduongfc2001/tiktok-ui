import classNames from 'classnames/bind';
import styles from './VideoItem.module.scss';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import images from '~/assets/images';

import React, { useRef, useState, useEffect } from 'react';
import Image from '../Image';
import Menu from '../Popper/Menu';
import { shareVideo } from './shareVideo';
import formatTime from '~/utils/formatTimeVideo';
import AccountItem from '~/components/SuggestedAccounts/AccountItem';
import ContentRightClick from './ContentRightClick';

const cx = classNames.bind(styles);

function VideoItem({ video }) {
    const [showFullContent, setShowFullContent] = useState(false);

    const videoInfoUser = video.user;
    const fiveShareVideo = shareVideo.slice(0, 5);
    const remainingShareVideo = shareVideo.filter((item, index) => index >= 5);

    const [isLiked, setIsLiked] = useState(false);
    const [isFavoriteAdded, setIsFavoriteAdded] = useState(false);
    const [animateLike, setAnimateLike] = useState(false);
    const [animateFavorite, setAnimateFavorite] = useState(false);

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const seekBarContainerRef = useRef(null);

    const [showRightMouse, setShowRightMouse] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleContextMenu = (event) => {
        event.preventDefault();

        if (event.button === 2) {
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            setMousePosition({ x: mouseX, y: mouseY });
            setShowRightMouse(true);
        }
    };

    const handleClickOutside = (event) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target) &&
            videoRef.current &&
            !videoRef.current.contains(event.target)
        ) {
            setShowRightMouse(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleTogglePlay = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleToggleVolume = () => {
        if (volume === 0) {
            setVolume(1);
        } else {
            setVolume(0);
        }
    };

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        videoRef.current.volume = newVolume;
    };

    useEffect(() => {
        const videoElement = videoRef.current;

        const observerOptions = {
            threshold: 0.5,
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

        const handleTimeUpdate = () => {
            setCurrentTime(videoRef.current.currentTime);
        };

        videoElement.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            observer.disconnect();
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDrag = (e) => {
        if (isDragging) {
            const seekBarContainerRect =
                seekBarContainerRef.current.getBoundingClientRect();
            const clickPositionX = e.clientX - seekBarContainerRect.left;
            const seekBarContainerWidth = seekBarContainerRect.width;
            const clickRatio = clickPositionX / seekBarContainerWidth;

            const newTime = video.meta.playtime_seconds * clickRatio;
            setCurrentTime(newTime);
        }
    };

    const handleDragEnd = () => {
        if (isDragging) {
            setIsDragging(false);
            videoRef.current.currentTime = currentTime;
        }
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleDrag);
        document.addEventListener('mouseup', handleDragEnd);

        return () => {
            document.removeEventListener('mousemove', handleDrag);
            document.removeEventListener('mouseup', handleDragEnd);
        };
    }, [isDragging]);

    const handleSeekContainerClick = (e) => {
        // Truy xuất thông tin vị trí và kích thước của vùng thanh seek-bar khi click chuột
        const seekBarContainerRect = e.target.getBoundingClientRect();

        //  `seekBarContainerRect` là một đối tượng chứa các thuộc tính như
        // `left`, `top`, `right`, `bottom`, `width` và `height`, mô tả kích thước và vị trí của vùng chứa thanh seek-bar so với viewport.
        //  `e.clientX` là vị trí nằm ngang (tọa độ X) của sự kiện nhấp chuột, so với khung nhìn.
        // `seekBarContainerRect.left` là tọa độ X của cạnh trái của vùng chứa thanh seek-bar so với khung nhìn.
        // `clickPositionX` tính toán khoảng cách theo chiều ngang giữa cạnh trái của vùng chứa thanh seek-bar
        // và điểm mà người dùng đã nhấp vào, cung cấp  vị trí của lần nhấp chuột so với vùng chứa thanhseek-bar.
        const clickPositionX = e.clientX - seekBarContainerRect.left;
        // `seekBarContainerRect.width` là chiều rộng của vùng chứa thanh seek-bar.
        const seekBarContainerWidth = seekBarContainerRect.width;
        // `clickRatio` tính toán tỷ lệ của vị trí nhấp chuột so với chiều rộng của vùng chứa thanh seek-bar.
        // Tỷ lệ này thể hiện khoảng cách dọc theo thanh seek-bar mà người dùng đã nhấp vào.
        const clickRatio = clickPositionX / seekBarContainerWidth;
        //  `newTime` tính toán thời gian mong muốn trong video tương ứng với vị trí mà người dùng đã nhấp vào.
        const newTime = video.meta.playtime_seconds * clickRatio;

        // `videoRef.current.currentTime = newTime;` cập nhật thời gian hiện tại của video bằng cách sử dụng `videoRef`.
        // Điều này sẽ làm cho video tìm kiếm thời gian mới.
        videoRef.current.currentTime = newTime;
        // cập nhật trạng thái `currentTime` của thành phần để phản ánh thời gian mới,
        // đảm bảo rằng màn hình UI khớp với thời gian video hiện tại.
        setCurrentTime(newTime);
    };

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        setAnimateLike(true);
        setTimeout(() => {
            setAnimateLike(false);
        }, 600);
    };

    const handleFavoriteClick = () => {
        setIsFavoriteAdded(!isFavoriteAdded);
        setAnimateFavorite(true);
        setTimeout(() => {
            setAnimateFavorite(false);
        }, 600);
    };

    return (
        <div className={cx('content')}>
            <AccountItem
                data={videoInfoUser}
                content={
                    <Link to={routes.profile}>
                        <Image
                            className={cx('user-avatar')}
                            src={videoInfoUser.avatar}
                            alt={videoInfoUser.nickname}
                        />
                    </Link>
                }
            />

            <div className={cx('video-content')}>
                <div className={cx('video-info')}>
                    <AccountItem
                        data={videoInfoUser}
                        content={
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
                        }
                    />

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
                        <div
                            onContextMenu={handleContextMenu}
                            ref={containerRef}
                        >
                            <video
                                className={cx('video-tag')}
                                ref={videoRef}
                                autoPlay={false}
                                muted={volume === 0}
                                poster={video.thumb_url}
                                loop
                                onContextMenu={handleContextMenu}
                            >
                                <source src={video.file_url} type="video/mp4" />
                            </video>
                            {showRightMouse && (
                                <div
                                    className={cx('context-menu')}
                                    style={{
                                        position: 'fixed',
                                        left: mousePosition.x + 'px',
                                        top: mousePosition.y + 'px',
                                    }}
                                >
                                    <ContentRightClick />
                                </div>
                            )}
                        </div>
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

                            <div className={cx('bottom-right-button')}>
                                <div className={cx('video-volume')}>
                                    <div
                                        className={cx('video-volume-scroll')}
                                    ></div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        className={cx('video-volume-circle')}
                                    />
                                    <div
                                        className={cx(
                                            'video-volume-controll-bar',
                                        )}
                                        style={{ transform: 'scaleY(0)' }}
                                    ></div>
                                </div>
                                <button onClick={handleToggleVolume}>
                                    <img
                                        src={
                                            volume === 0
                                                ? images.muted
                                                : images.fullVolume
                                        }
                                        alt="muted video"
                                    />
                                </button>
                            </div>
                        </div>
                        <div className={cx('video-control-container')}>
                            <div
                                className={cx('seek-bar-container')}
                                ref={seekBarContainerRef}
                                onClick={(e) => handleSeekContainerClick(e)}
                            >
                                <div
                                    tabIndex="0"
                                    role="slider"
                                    aria-label="Video progress"
                                    aria-valuenow={
                                        currentTime /
                                        video.meta.playtime_seconds
                                    }
                                    aria-valuetext={formatTime(currentTime)}
                                    className={cx('seek-bar-progress')}
                                ></div>
                                <div
                                    className={cx('seek-bar-circle')}
                                    style={{
                                        left: `calc(${
                                            (currentTime /
                                                video.meta.playtime_seconds) *
                                            100
                                        }%)`,
                                    }}
                                    onMouseDown={handleDragStart}
                                ></div>

                                <div
                                    className={cx('seek-bar')}
                                    style={{
                                        transform: `scaleX(${
                                            currentTime /
                                            video.meta.playtime_seconds
                                        }) translateY(-50%)`,
                                    }}
                                ></div>
                            </div>
                            <div className={cx('seek-bar-time-container')}>
                                {formatTime(currentTime)}/
                                {formatTime(video.meta.playtime_seconds)}
                            </div>
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
                                'favorite-animation':
                                    isFavoriteAdded && animateFavorite,
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
