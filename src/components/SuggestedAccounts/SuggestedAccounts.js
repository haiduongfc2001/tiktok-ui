import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({
    label,
    isSeeAll = false,
    data = [],
    onViewChange,
}) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {data.map((account, index) => (
                <AccountItem key={index} data={account} />
            ))}

            <p
                className={cx('more-btn')}
                onClick={() => onViewChange(isSeeAll)}
            >
                {isSeeAll ? 'See less' : 'See all'}
            </p>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
};

export default SuggestedAccounts;
