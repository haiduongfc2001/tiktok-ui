import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon, activeIcon }) {
    const isFollowingTitle = title === 'Following';

    return (
        <NavLink
            className={(nav) => cx('menu-item', { active: nav.isActive })}
            to={to}
        >
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('active-icon')}>{activeIcon}</span>
            <span className={cx('title')}>{title}</span>
            {isFollowingTitle && (
                <img
                    src={images.dot}
                    className={cx('following-dot')}
                    alt="following-dot"
                />
            )}
        </NavLink>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    activeIcon: PropTypes.node.isRequired,
};

export default MenuItem;
