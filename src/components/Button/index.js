import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    disabled = false,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    small = false,
    large = false,
    children,
    onClick,
    leftIcon,
    className,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (disabled) {
        delete props.onClick;
    }

    // // Cách khác: Remove event listener when button is disabled
    // if (disabled) {
    //     Object.keys(props).forEach((key) => {
    //         if (
    //             key.startsWith('on') &&
    //             typeof props[key] !== 'function'
    //         ) {
    //             delete props[key];
    //         }
    //     });
    // }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        disabled,
        primary,
        outline,
        text,
        rounded,
        small,
        large,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && (
                <span className={cx('icon')}>
                    {leftIcon}
                </span>
            )}
            <span className={cx('title')}>{children}</span>
        </Comp>
    );
}

export default Button;
