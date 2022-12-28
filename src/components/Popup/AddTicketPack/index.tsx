import { Col, DatePicker, Input, Row, Select, TimePicker } from "antd";
import classNames from "classnames/bind";
import Button from "~/components/Button";
import { Checkbox } from "~/components/Checkbox";
import { ArrowDownIcon } from "~/components/Icons";
import styles from "./AddTicketPack.module.scss";

type OptionType = {
    label: string;
    value: string;
};

interface AddTicketPackProps {
    onCancel: () => void;
}

const options: OptionType[] = [
    {
        label: "Đang áp dụng",
        value: "Đang áp dụng",
    },
    {
        label: "Tắt",
        value: "Tắt",
    },
];

const cx = classNames.bind(styles);
const AddTicketPack = ({ onCancel }: AddTicketPackProps) => {
    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("heading")}>Thêm gói vé</h1>
            <div className={cx("row")}>
                <p className={cx("label")}>
                    Tên gói vé <span className="required">*</span>
                </p>
                <Input placeholder="Nhập tên gói vé" className={cx("name")} />
            </div>
            <Row className={cx("row")}>
                <Col span={12}>
                    <p className={cx("label")}>Ngày áp dụng</p>
                    <DatePicker
                        className={cx("date-picker")}
                        placeholder={"dd/mm/yy"}
                        format={"DD/MM/YY"}
                    />
                    <TimePicker
                        className={cx("time-picker")}
                        placeholder={"hh:mm:ss"}
                    />
                </Col>
                <Col span={12}>
                    <p className={cx("label")}>Ngày hết hạn</p>
                    <DatePicker
                        className={cx("date-picker")}
                        placeholder={"dd/mm/yy"}
                        format={"DD/MM/YY"}
                    />
                    <TimePicker
                        className={cx("time-picker")}
                        placeholder={"hh:mm:ss"}
                    />
                </Col>
            </Row>
            <div className={cx("row")}>
                <p className={cx("label")}>Giá vé áp dụng</p>
                <div className={cx("d-flex")}>
                    <Checkbox value={"Vé lẻ (vnđ/vé) với giá"} />
                    <Input
                        type="number"
                        placeholder="Giá vé"
                        className={cx("input")}
                    />{" "}
                    <span>/ vé</span>
                </div>
                <div className={cx("d-flex")}>
                    <Checkbox value={"Combo vé với giá"} />
                    <Input
                        type="number"
                        placeholder="Giá vé"
                        className={cx("input")}
                    />{" "}
                    <span>/</span>{" "}
                    <Input
                        type="number"
                        placeholder="Số vé"
                        className={cx("input", "quantity")}
                    />{" "}
                    <span>vé</span>
                </div>
            </div>
            <div className={cx("row")}>
                <p className={cx("label")}>Tình trạng</p>
                <Select
                    options={options}
                    className={cx("select")}
                    defaultValue={options[0].label}
                    // onChange={onChange}
                    suffixIcon={<ArrowDownIcon />}
                />
            </div>
            <p>
                <span className="required">* </span>
                <span style={{ opacity: 0.4 }}>là thông tin bắt buộc</span>
            </p>
            <div className={cx("wrap-button")}>
                <Button
                    className={cx("button")}
                    type="outline"
                    size="large"
                    onClick={onCancel}
                >
                    Huỷ
                </Button>
                <Button className={cx("button")} type="primary" size="large">
                    Lưu
                </Button>
            </div>
        </div>
    );
};

export default AddTicketPack;
