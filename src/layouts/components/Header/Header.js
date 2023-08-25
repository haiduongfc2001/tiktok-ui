import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSignIn,
    faEllipsisVertical,
    faKeyboard,
    faGear,
    faCoins,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { faCircleQuestion, faUser } from '@fortawesome/free-regular-svg-icons';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import { Link } from 'react-router-dom';

import config from '~/config';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <img src={images.languages} alt="tiktok" />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'ar',
                    title: 'العربية',
                },
                {
                    type: 'language',
                    code: 'bn',
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    type: 'language',
                    code: 'ceb',
                    title: 'Cebuano (Pilipinas)',
                },
                {
                    type: 'language',
                    code: 'cs',
                    title: 'Čeština (Česká republika)',
                },
                {
                    type: 'language',
                    code: 'de',
                    title: 'Deutsch',
                },
                {
                    type: 'language',
                    code: 'el',
                    title: 'Ελληνικά (Ελλάδα)',
                },
                {
                    type: 'language',
                    code: 'es',
                    title: 'Español',
                },
                {
                    type: 'language',
                    code: 'fi',
                    title: 'Suomi (Suomi)',
                },
                {
                    type: 'language',
                    code: 'fil',
                    title: 'Filipino (Pilipinas)',
                },
                {
                    type: 'language',
                    code: 'fr',
                    title: 'Français',
                },
                {
                    type: 'language',
                    code: 'he',
                    title: 'עברית (ישראל)',
                },
                {
                    type: 'language',
                    code: 'hi',
                    title: 'हिंदी',
                },
                {
                    type: 'language',
                    code: 'hu',
                    title: 'Magyar (Magyarország)',
                },
                {
                    type: 'language',
                    code: 'id',
                    title: 'Bahasa Indonesia (Indonesia)',
                },
                {
                    type: 'language',
                    code: 'it',
                    title: 'Italiano (Italia)',
                },
                {
                    type: 'language',
                    code: 'ja',
                    title: '日本語（日本）',
                },
                {
                    type: 'language',
                    code: 'jv',
                    title: 'Basa Jawa (Indonesia)',
                },
                {
                    type: 'language',
                    code: 'km',
                    title: 'ខ្មែរ (កម្ពុជា)',
                },
                {
                    type: 'language',
                    code: 'ko',
                    title: '한국어 (대한민국)',
                },
                {
                    type: 'language',
                    code: 'ms',
                    title: 'Bahasa Melayu (Malaysia)',
                },
                {
                    type: 'language',
                    code: 'my',
                    title: 'မြန်မာ (မြန်မာ)',
                },
                {
                    type: 'language',
                    code: 'nl',
                    title: 'Nederlands (Nederland)',
                },
                {
                    type: 'language',
                    code: 'pl',
                    title: 'Polski (Polska)',
                },
                {
                    type: 'language',
                    code: 'pt',
                    title: 'Português (Brasil)',
                },
                {
                    type: 'language',
                    code: 'ro',
                    title: 'Română (Romania)',
                },
                {
                    type: 'language',
                    code: 'ru',
                    title: 'Русский (Россия)',
                },
                {
                    type: 'language',
                    code: 'sv',
                    title: 'Svenska (Sverige)',
                },
                {
                    type: 'language',
                    code: 'th',
                    title: 'ไทย (ไทย)',
                },
                {
                    type: 'language',
                    code: 'tr',
                    title: 'Türkçe (Türkiye)',
                },
                {
                    type: 'language',
                    code: 'uk',
                    title: 'Українська (Україна)',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const currentUser = true;

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle language changes
                break;
            default:
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/profile',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get Coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="tiktok" />
                </Link>

                <Search />

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy
                                delay={[0, 50]}
                                content="Upload video"
                                placement="bottom"
                            >
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy
                                delay={[0, 50]}
                                content="Message"
                                placement="bottom"
                            >
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy
                                delay={[0, 50]}
                                content="Inbox"
                                placement="bottom"
                            >
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button
                                primary
                                leftIcon={<FontAwesomeIcon icon={faSignIn} />}
                            >
                                Log in
                            </Button>
                        </>
                    )}

                    <Menu
                        items={currentUser ? userMenu : MENU_ITEMS}
                        onChange={handleMenuChange}
                    >
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/f087b832acf74c4616195a4c97c317da~c5_100x100.jpeg?x-expires=1692860400&x-signature=C3uReWaLvve0FlUuaKXlupb6A1Y%3D"
                                alt="Nguyen Van A"
                                // fallback="~/assets/images/male-user-placeholder.png"
                            ></Image>
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
