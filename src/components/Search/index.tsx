import classNames from "classnames/bind";
import { SearchIcon } from "../Icons";
import styles from "./Search.module.scss";
const cx = classNames.bind(styles);

type SearchProps = {
    className?: string;
    value?: string;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

function Search({
    className,
    value = "",
    type = "text",
    placeholder = "",
    onChange,
    ...props
}: SearchProps) {
    return (
        <div className={cx("wrapper", className)}>
            <input
                spellCheck={false}
                className={cx("text-box")}
                type={type}
                placeholder={placeholder}
                defaultValue={value}
                onChange={onChange}
                {...props}
            />
            <SearchIcon className={cx("icon")} />
        </div>
    );
}

export default Search;
