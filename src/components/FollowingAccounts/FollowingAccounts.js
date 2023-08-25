import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './FollowingAccounts.module.scss';
import AccountItem from '~/components/FollowingAccounts/AccountItem';

const cx = classNames.bind(styles);

function FollowingAccounts({ label, dataFollowing = [] }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {dataFollowing.map((account, index) => (
                <AccountItem key={index} data={account} />
            ))}

            <p className={cx('more-btn')}>See all</p>
        </div>
    );
}

FollowingAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
};

export default FollowingAccounts;
