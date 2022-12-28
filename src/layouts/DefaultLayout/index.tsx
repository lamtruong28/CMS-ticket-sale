import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Menu from "../components/Menu";
import { IChildren } from "~/interface";
import Search from "~/components/Search";
import Actions from "../components/Actions";

const cx = classNames.bind(styles);
function DefaultLayout({ children }: IChildren) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("left")}>
                <Menu />
            </div>
            <div className={cx("right")}>
                <div className={cx("top")}>
                    <Search className={cx("search-box")} placeholder="Search" />
                    <Actions />
                </div>
                <div className={cx("children")}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
