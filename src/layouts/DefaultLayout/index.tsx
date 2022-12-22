import classNames from "classnames/bind";
import { Row, Col } from "antd";
import styles from "./DefaultLayout.module.scss";
import Menu from "../components/Menu";
import { IChildren } from "~/interface";

const cx = classNames.bind(styles);
function DefaultLayout({ children }: IChildren) {
    return (
        <Row className={cx("wrapper")}>
            <Col span={5} className={cx("left")}>
                <Menu />
            </Col>
            <Col span={19}>{children}</Col>
        </Row>
    );
}

export default DefaultLayout;
