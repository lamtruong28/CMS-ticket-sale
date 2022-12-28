import classNames from "classnames/bind";
import React, { useEffect, useId, useState } from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string | number;
}

const cx = classNames.bind(styles);
const Checkbox = ({
    value,
    checked = false,
    onChange = () => {},
}: CheckboxProps) => {
    const id = useId();
    const [check, setCheck] = useState<boolean>(checked);

    useEffect(() => {
        setCheck(checked);
    }, [checked]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        setCheck(e.target.checked);
    };

    return (
        <div className={cx("item")}>
            <input
                type="checkbox"
                value={value}
                id={id}
                checked={check}
                onChange={handleOnChange}
            />
            <label htmlFor={id} className={cx("box")}></label>
            <label htmlFor={id}>{value}</label>
        </div>
    );
};

export default Checkbox;
