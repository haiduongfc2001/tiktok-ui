import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';
import styles from './SuggestedAccounts.module.scss';
import React from 'react';

const cx = classNames.bind(styles);

// Add the ref parameter as the second argument
function AccountContent({ data }, ref) {
    return (
        <div ref={ref} className={cx('account-item')}>
            <Image
                className={cx('avatar')}
                src={data.avatar}
                alt={data.nickname}
            />
            <div className={cx('item-info')}>
                <p className={cx('nickname')}>
                    <strong>{data.nickname}</strong>
                    {data.tick && (
                        <FontAwesomeIcon
                            className={cx('check')}
                            icon={faCheckCircle}
                        />
                    )}
                </p>
                <p
                    className={cx('name')}
                >{`${data.first_name} ${data.last_name}`}</p>
            </div>
        </div>
    );
}

// Use React.forwardRef to wrap the component
const ForwardedAccountContent = React.forwardRef(AccountContent);

export default ForwardedAccountContent;
