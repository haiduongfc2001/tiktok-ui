import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';
import { useState } from 'react';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({
    children,
    items = [],
    placement,
    shareMoreButton,
    hideOnClick = false,
    onChange = defaultFn,
}) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const remainingShareVideo = items && items.slice(5, items.length);

    // console.log(remainingShareVideo);

    const [clickedShareMore, setClickedShareMore] = useState(false);

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const handleMoreShare = () => {
        setHistory((prev) => [...prev, { data: remainingShareVideo }]);
        setClickedShareMore(true);
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && !shareMoreButton && (
                    <Header title={current.title} onBack={handleBack} />
                )}
                <div className={cx('menu-body')}>{renderItems()}</div>
                {shareMoreButton && !clickedShareMore && (
                    <button
                        className={cx('share-more')}
                        onClick={handleMoreShare}
                    >
                        <img src={images.shareMore} alt="share more" />
                    </button>
                )}
            </PopperWrapper>
        </div>
    );

    // Reset to first page
    const handleReset = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    return (
        <div>
            <Tippy
                interactive
                delay={[0, 700]}
                offset={[12, 8]}
                hideOnClick={hideOnClick}
                placement={placement}
                // shareMoreButton={shareMoreButton}
                render={renderResult}
                onHide={handleReset}
            >
                {children}
            </Tippy>
        </div>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    placement: PropTypes.string,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
