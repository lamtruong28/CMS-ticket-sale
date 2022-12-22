import classNames from "classnames/bind";
import { Image } from "antd";
import images from "~/assets/images";
import Navbar from "~/components/Navbar";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

const Menu: React.FC = () => {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("logo")}>
                <Image srcSet={`${images.logo} 2x`} preview={false} />
            </div>

            <div className={cx("navbar")}>
                <Navbar />
            </div>

            <p className={cx("copyright")}>
                Copyright &copy; 2020 Alta Software
            </p>
        </div>
    );
};

export default Menu;
