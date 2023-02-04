import { ReactNode } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Spin } from "antd";

const cx = classNames.bind(styles);

type ButtonPropsType = {
    children: ReactNode;
    loading?: boolean;
    to?: string;
    href?: string;
    type?: "primary" | "secondary" | "outline" | "rounded";
    size?: "small" | "medium" | "large";
    secondary?: boolean;
    disabled?: boolean;
    className?: any;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    onClick?: () => void;
};

function Button({
    children,
    loading = false,
    to,
    href,
    type,
    size,
    disabled,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}: ButtonPropsType) {
    let Comp: any = "button";
    const props = {
        onClick,
        ...passProps,
    } as any;

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = "a";
    }

    // Remove all event listener when button is disabled:
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith("on") && typeof props[key] === "function")
                delete props[key];
        });
    }

    const classes = cx("wrapper", type, size, {
        [className]: className,
        disabled,
        loading,
    });
    return (
        <Comp className={classes} {...props}>
            {loading && <Spin size="small" className={cx("loading")} />}
            {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
            <span className={cx("title")}>{children}</span>
            {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
