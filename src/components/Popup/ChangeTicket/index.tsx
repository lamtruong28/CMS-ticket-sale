import { Col, DatePicker, DatePickerProps, Row } from "antd";
import classNames from "classnames/bind";
import Button from "~/components/Button";
import styles from "./ChangeTicket.module.scss";

interface ChangeTicketProps {
    onCancel: () => void;
}

const cx = classNames.bind(styles);
const ChangeTicket = ({ onCancel }: ChangeTicketProps) => {
    const handleChooseDate: DatePickerProps["onChange"] = (
        value,
        dateString
    ) => {
        // setFrom(dateString);
    };

    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("heading")}>Đổi ngày sử dụng vé</h1>
            <Row className={cx("row")}>
                <Col span={6}>
                    <span className={cx("label")}>Booking code:</span>
                </Col>
                <Col span={18}>
                    <span className={cx("value")}>{"PKG20210502"}</span>
                </Col>
            </Row>
            <Row className={cx("row")}>
                <Col span={6}>
                    <span className={cx("label")}>Số vé:</span>
                </Col>
                <Col span={18}>
                    <span className={cx("value")}>{"236784631642"}</span>
                </Col>
            </Row>
            <Row className={cx("row")}>
                <Col span={6}>
                    <span className={cx("label")}>Tên sự kiện:</span>
                </Col>
                <Col span={18}>
                    <span className={cx("value")}>
                        {"Hội trợ triển lãm hàng tiêu dùng 2021"}
                    </span>
                </Col>
            </Row>
            <Row className={cx("row")}>
                <Col span={6}>
                    <span className={cx("label")}>Hạn sử dụng:</span>
                </Col>
                <Col span={18}>
                    <DatePicker
                        className={cx("date-picker")}
                        format={"DD/MM/YYYY"}
                        placeholder={"Chọn ngày"}
                        onChange={handleChooseDate}
                    />
                </Col>
            </Row>
            <div className={cx("wrap-button")}>
                <Button
                    className={cx("button")}
                    type="outline"
                    size="large"
                    onClick={onCancel}
                >
                    Hủy
                </Button>
                <Button className={cx("button")} type="primary" size="large">
                    Lưu
                </Button>
            </div>
        </div>
    );
};

export default ChangeTicket;
